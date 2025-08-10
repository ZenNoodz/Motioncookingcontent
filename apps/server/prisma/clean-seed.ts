import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanSeed() {
  console.log('🌱 Erstelle saubere Test-Umgebung...');

  // Finde oder erstelle einen Test-User
  let user = await prisma.user.findUnique({
    where: { email: 'test@example.com' },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        passwordHash: 'dummy-hash', // In production würde hier ein echter Hash stehen
        role: 'owner',
      },
    });
  }

  // Erstelle ein leeres Projekt als Ausgangspunkt
  const project = await prisma.project.create({
    data: {
      name: 'Mein Test-Projekt',
      description: 'Ein leeres Projekt zum Testen der Funktionalität',
      createdById: user.id,
    },
  });

  // Erstelle die Standard-Kanban-Spalten
  const columns = [
    {
      name: 'Neues Video Aida',
      order: 1,
    },
    {
      name: 'In Arbeit',
      order: 2,
    },
    {
      name: 'Review',
      order: 3,
    },
    {
      name: 'Fertig',
      order: 4,
    },
  ];

  for (const column of columns) {
    await prisma.boardColumn.create({
      data: {
        name: column.name,
        order: column.order,
        projectId: project.id,
      },
    });
  }

  console.log('✅ Saubere Test-Umgebung erstellt!');
  console.log(`📁 Projekt: "${project.name}" (ID: ${project.id})`);
  console.log('📋 4 Kanban-Spalten erstellt');
  console.log('🎯 Bereit zum Testen!');
}

cleanSeed()
  .catch((e) => {
    console.error('❌ Fehler beim Erstellen der Test-Umgebung:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
