import { FastifyInstance } from 'fastify';
import prisma from '../lib/prisma';

export async function boardRoutes(fastify: FastifyInstance) {
  // GET /api/board - Kanban Board Daten laden
  fastify.get('/api/board', async (request, reply) => {
    try {
      // Simplified query first
      const columns = await prisma.boardColumn.findMany({
        orderBy: {
          order: 'asc',
        },
      });

      // Transform data to match frontend expectations
      const transformedColumns = columns.map((column) => ({
        id: column.name.toLowerCase().replace(/\s+/g, '-'),
        name: column.name,
        count: 0, // Will be updated with real card count later
        color: getColumnColor(column.name),
        cards: [], // Simplified for now
      }));

      return { data: transformedColumns };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Fehler beim Laden des Boards' });
    }
  });

  // PUT /api/board/move - Karte zwischen Spalten verschieben
  fastify.put('/api/board/move', async (request, reply) => {
    try {
      const { cardId, fromColumnId, toColumnId } = request.body as {
        cardId: string;
        fromColumnId: string;
        toColumnId: string;
      };

      // Get the target column
      const targetColumn = await prisma.boardColumn.findFirst({
        where: {
          name: getColumnNameFromId(toColumnId),
        },
      });

      if (!targetColumn) {
        return reply.status(404).send({ error: 'Ziel-Spalte nicht gefunden' });
      }

      // Find the existing board card
      const existingCard = await prisma.boardCard.findFirst({
        where: {
          contentItemId: cardId,
        },
      });

      if (existingCard) {
        // Update existing card
        await prisma.boardCard.update({
          where: { id: existingCard.id },
          data: {
            columnId: targetColumn.id,
            order: Date.now(), // Simple ordering
          },
        });
      } else {
        // Create new card if it doesn't exist
        await prisma.boardCard.create({
          data: {
            columnId: targetColumn.id,
            contentItemId: cardId,
            order: Date.now(),
          },
        });
      }

      // Update content item status based on column
      const newStatus = getStatusFromColumnId(toColumnId);
      await prisma.contentItem.update({
        where: { id: cardId },
        data: { status: newStatus },
      });

      return { success: true };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Fehler beim Verschieben der Karte' });
    }
  });

  // POST /api/board/card - Neue Karte erstellen
  fastify.post('/api/board/card', async (request, reply) => {
    try {
      const { title, description, columnId, dueDate } = request.body as {
        title: string;
        description?: string;
        columnId: string;
        dueDate?: string;
      };

      // Get the first project (for MVP)
      const project = await prisma.project.findFirst();
      if (!project) {
        return reply.status(400).send({ error: 'Kein Projekt gefunden' });
      }

      // Get the target column
      const targetColumn = await prisma.boardColumn.findFirst({
        where: {
          name: getColumnNameFromId(columnId),
          projectId: project.id,
        },
      });

      if (!targetColumn) {
        return reply.status(404).send({ error: 'Spalte nicht gefunden' });
      }

      // Create content item
      const contentItem = await prisma.contentItem.create({
        data: {
          title,
          brief: description || '',
          status: getStatusFromColumnId(columnId),
          platformTargets: 'instagram',
          plannedDate: dueDate ? new Date(dueDate) : null,
          projectId: project.id,
        },
      });

      // Create board card
      await prisma.boardCard.create({
        data: {
          columnId: targetColumn.id,
          contentItemId: contentItem.id,
          order: Date.now(),
        },
      });

      return { success: true, data: contentItem };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Fehler beim Erstellen der Karte' });
    }
  });
}

// Helper functions
function getColumnColor(columnName: string): string {
  switch (columnName) {
    case 'Neues Video Aida':
      return 'from-purple-400 to-purple-600';
    case 'In Arbeit':
      return 'from-blue-400 to-blue-600';
    case 'Review':
      return 'from-orange-400 to-orange-600';
    case 'Fertig':
      return 'from-green-400 to-green-600';
    default:
      return 'from-gray-400 to-gray-600';
  }
}

function getColumnNameFromId(columnId: string): string {
  switch (columnId) {
    case 'neues-video-aida':
      return 'Neues Video Aida';
    case 'in-arbeit':
      return 'In Arbeit';
    case 'review':
      return 'Review';
    case 'fertig':
      return 'Fertig';
    default:
      return 'Neues Video Aida';
  }
}

function getStatusFromColumnId(columnId: string): string {
  switch (columnId) {
    case 'neues-video-aida':
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

function getPriority(dueDate: Date | null): 'low' | 'medium' | 'high' {
  if (!dueDate) return 'low';
  
  const now = new Date();
  const diffDays = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 2) return 'high';
  if (diffDays <= 7) return 'medium';
  return 'low';
}
