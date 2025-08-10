import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create a test user
  const user = await prisma.user.create({
    data: {
      email: 'dawid@example.com',
      name: 'Dawid Adamus',
      passwordHash: 'hashed_password_placeholder',
      role: 'owner',
    },
  });

  console.log('✅ Created user:', user.name);

  // Create a main project
  const project = await prisma.project.create({
    data: {
      name: 'Instagram Food Content',
      description: 'Food-Blog Content für Instagram Reels',
      color: 'from-amber-500 to-orange-600',
      createdById: user.id,
    },
  });

  console.log('✅ Created project:', project.name);

  // Create board columns for Kanban
  const columns = await Promise.all([
    prisma.boardColumn.create({
      data: {
        name: 'Neues Video Aida',
        order: 1,
        projectId: project.id,
      },
    }),
    prisma.boardColumn.create({
      data: {
        name: 'In Arbeit',
        order: 2,
        projectId: project.id,
      },
    }),
    prisma.boardColumn.create({
      data: {
        name: 'Review',
        order: 3,
        projectId: project.id,
      },
    }),
    prisma.boardColumn.create({
      data: {
        name: 'Fertig',
        order: 4,
        projectId: project.id,
      },
    }),
  ]);

  console.log('✅ Created board columns');

  // Create sample content items (these will be our "assets" in the frontend)
  const contentItems = [
    {
      title: 'Food Styling Reel #1',
      status: 'IN_PROGRESS',
      plannedDate: new Date('2025-01-15'),
      platformTargets: 'instagram',
      brief: 'Leckeres Food Styling für Instagram Reels',
      columnIndex: 0, // Neues Video Aida
    },
    {
      title: 'Recipe Tutorial',
      status: 'IN_PROGRESS',
      plannedDate: new Date('2025-01-18'),
      platformTargets: 'instagram,youtube',
      brief: 'Schritt-für-Schritt Anleitung für ein beliebtes Rezept',
      columnIndex: 0,
    },
    {
      title: 'Quick Recipe Reel',
      status: 'IN_PROGRESS',
      plannedDate: new Date('2025-01-14'),
      platformTargets: 'instagram',
      brief: 'Schnelles Rezept in 60 Sekunden',
      columnIndex: 0,
    },
    {
      title: 'Behind the Scenes',
      status: 'IN_PROGRESS',
      plannedDate: new Date('2025-01-12'),
      platformTargets: 'instagram',
      brief: 'Blick hinter die Kulissen der Küche',
      columnIndex: 1, // In Arbeit
    },
    {
      title: 'Ingredient Showcase',
      status: 'IN_PROGRESS',
      plannedDate: new Date('2025-01-16'),
      platformTargets: 'instagram',
      brief: 'Die besten Zutaten präsentieren',
      columnIndex: 1,
    },
    {
      title: 'Kitchen Tour',
      status: 'NEEDS_REVIEW',
      plannedDate: new Date('2025-01-20'),
      platformTargets: 'instagram,youtube',
      brief: 'Tour durch die professionelle Küche',
      columnIndex: 2, // Review
    },
    {
      title: 'Cooking Tips Short',
      status: 'APPROVED',
      plannedDate: new Date('2025-01-10'),
      platformTargets: 'instagram',
      brief: '5 Profi-Tipps für besseres Kochen',
      columnIndex: 3, // Fertig
    },
    {
      title: 'Seasonal Menu',
      status: 'APPROVED',
      plannedDate: new Date('2025-01-22'),
      platformTargets: 'instagram,youtube',
      brief: 'Wintermenü mit saisonalen Zutaten',
      columnIndex: 3,
    },
  ];

  for (let i = 0; i < contentItems.length; i++) {
    const item = contentItems[i];
    const contentItem = await prisma.contentItem.create({
      data: {
        title: item.title,
        status: item.status,
        plannedDate: item.plannedDate,
        platformTargets: item.platformTargets,
        brief: item.brief,
        projectId: project.id,
      },
    });

    // Create board card
    await prisma.boardCard.create({
      data: {
        columnId: columns[item.columnIndex].id,
        contentItemId: contentItem.id,
        order: i + 1,
      },
    });

    // Create caption drafts
    if (item.platformTargets.includes('instagram')) {
      await prisma.captionDraft.create({
        data: {
          contentItemId: contentItem.id,
          platform: 'instagram',
          text: `${item.title} - Perfekt für deine Instagram Story! 🍽️✨`,
          hashtags: '#foodblogger,#recipe,#cooking,#foodie,#instafood',
        },
      });
    }

    if (item.platformTargets.includes('youtube')) {
      await prisma.captionDraft.create({
        data: {
          contentItemId: contentItem.id,
          platform: 'youtube',
          text: `${item.title} - Vollständiges Tutorial für YouTube`,
          hashtags: '#cooking,#recipe,#tutorial,#food',
        },
      });
    }

    console.log(`✅ Created content item: ${item.title}`);
  }

  // Create some sample assets (files)
  const sampleAssets = [
    {
      type: 'video',
      pathOriginal: '/uploads/food-styling-reel-1.mp4',
      pathPreview: '/uploads/previews/food-styling-reel-1-preview.mp4',
      thumbnail: '/uploads/thumbnails/food-styling-reel-1-thumb.jpg',
      durationMs: 60000,
      width: 1080,
      height: 1920,
      sizeBytes: 15000000,
    },
    {
      type: 'video',
      pathOriginal: '/uploads/recipe-tutorial.mp4',
      pathPreview: '/uploads/previews/recipe-tutorial-preview.mp4',
      thumbnail: '/uploads/thumbnails/recipe-tutorial-thumb.jpg',
      durationMs: 180000,
      width: 1920,
      height: 1080,
      sizeBytes: 45000000,
    },
    {
      type: 'image',
      pathOriginal: '/uploads/ingredient-photo.jpg',
      thumbnail: '/uploads/thumbnails/ingredient-photo-thumb.jpg',
      width: 1080,
      height: 1080,
      sizeBytes: 2500000,
    },
  ];

  for (const assetData of sampleAssets) {
    await prisma.asset.create({
      data: {
        ...assetData,
        projectId: project.id,
      },
    });
  }

  console.log('✅ Created sample assets');

  // Create some tags
  const tags = ['Food', 'Recipe', 'Tutorial', 'Quick', 'Healthy', 'Dessert'];
  for (const tagName of tags) {
    await prisma.tag.create({
      data: {
        name: tagName,
        color: '#f59e0b', // amber color
      },
    });
  }

  console.log('✅ Created tags');

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
