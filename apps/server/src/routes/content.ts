import { FastifyInstance } from 'fastify';
import prisma from '../lib/prisma';

export async function contentRoutes(fastify: FastifyInstance) {
  // GET /api/content - Alle Content Items laden
  fastify.get('/api/content', async (request, reply) => {
    try {
      // Simplified query first
      const contentItems = await prisma.contentItem.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });

      // Transform data to match frontend expectations
      const transformedItems = contentItems.map((item) => ({
        id: item.id,
        name: item.title,
        platform: item.platformTargets?.includes('instagram') ? 'instagram' : 'youtube',
        status: mapStatusToFrontend(item.status),
        dropboxLink: '#',
        frameioLink: '#',
        caption: '',
        dawidDeadline: item.plannedDate?.toISOString().split('T')[0] || '',
        postingDate: item.plannedDate?.toISOString().split('T')[0] || '',
        size: '15.2 MB',
        author: 'Dawid',
        date: item.createdAt.toISOString().split('T')[0],
      }));

      return { data: transformedItems };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Fehler beim Laden der Content Items' });
    }
  });

  // PUT /api/content/:id/status - Status eines Content Items ändern
  fastify.put('/api/content/:id/status', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const { status } = request.body as { status: string };

      const backendStatus = mapStatusToBackend(status);

      const updatedItem = await prisma.contentItem.update({
        where: { id },
        data: { status: backendStatus },
      });

      return { success: true, data: updatedItem };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Fehler beim Aktualisieren des Status' });
    }
  });

  // PUT /api/content/:id/caption - Caption eines Content Items ändern
  fastify.put('/api/content/:id/caption', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const { caption, platform = 'instagram' } = request.body as { caption: string; platform?: string };

      const updatedCaption = await prisma.captionDraft.upsert({
        where: {
          contentItemId_platform: {
            contentItemId: id,
            platform,
          },
        },
        update: {
          text: caption,
        },
        create: {
          contentItemId: id,
          platform,
          text: caption,
        },
      });

      return { success: true, data: updatedCaption };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Fehler beim Aktualisieren der Caption' });
    }
  });

  // PUT /api/content/:id/frameio - Frame.io Link ändern
  fastify.put('/api/content/:id/frameio', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const { url } = request.body as { url: string };

      // Find existing Frame.io link
      const existingLink = await prisma.link.findFirst({
        where: {
          contentItemId: id,
          title: 'Frame.io',
        },
      });

      let updatedLink;
      if (existingLink) {
        updatedLink = await prisma.link.update({
          where: { id: existingLink.id },
          data: { url },
        });
      } else {
        updatedLink = await prisma.link.create({
          data: {
            contentItemId: id,
            title: 'Frame.io',
            url,
          },
        });
      }

      return { success: true, data: updatedLink };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Fehler beim Aktualisieren des Frame.io Links' });
    }
  });

  // POST /api/content - Neues Content Item erstellen
  fastify.post('/api/content', async (request, reply) => {
    try {
      const { title, platform, brief, plannedDate } = request.body as {
        title: string;
        platform: string;
        brief?: string;
        plannedDate?: string;
      };

      // Get the first project (for MVP)
      const project = await prisma.project.findFirst();
      if (!project) {
        return reply.status(400).send({ error: 'Kein Projekt gefunden' });
      }

      const contentItem = await prisma.contentItem.create({
        data: {
          title,
          status: 'IN_PROGRESS',
          platformTargets: platform,
          brief: brief || '',
          plannedDate: plannedDate ? new Date(plannedDate) : null,
          projectId: project.id,
        },
      });

      // Add to first column (Neues Video Aida)
      const firstColumn = await prisma.boardColumn.findFirst({
        where: { projectId: project.id },
        orderBy: { order: 'asc' },
      });

      if (firstColumn) {
        await prisma.boardCard.create({
          data: {
            columnId: firstColumn.id,
            contentItemId: contentItem.id,
            order: Date.now(), // Simple ordering
          },
        });
      }

      return { success: true, data: contentItem };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Fehler beim Erstellen des Content Items' });
    }
  });
}

// Helper functions to map between frontend and backend status
function mapStatusToFrontend(backendStatus: string): string {
  switch (backendStatus) {
    case 'IN_PROGRESS':
      return 'neues-video-aida';
    case 'NEEDS_REVIEW':
      return 'review';
    case 'APPROVED':
      return 'fertig';
    default:
      return 'in-arbeit';
  }
}

function mapStatusToBackend(frontendStatus: string): string {
  switch (frontendStatus) {
    case 'neues-video-aida':
      return 'IN_PROGRESS';
    case 'in-arbeit':
      return 'IN_PROGRESS';
    case 'review':
      return 'NEEDS_REVIEW';
    case 'fertig':
      return 'APPROVED';
    default:
      return 'IN_PROGRESS';
  }
}
