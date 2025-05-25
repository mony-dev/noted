import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const work = await prisma.categoryType.upsert({
    where: { name: "Work" },
    update: {},
    create: {
      name: "Work",
      emoji: "💼",
      categories: {
        create: [
          {
            name: "Frontend",
            tasks: {
              create: [
                {
                  title: "Fix button bug",
                  priority: "HIGH",
                  startTime: "09:00",
                  endTime: "11:00",
                },
              ],
            },
          },
          {
            name: "Backtend",
            tasks: {
              create: [
                {
                  title: "Fix API bug",
                  priority: "URGENT",
                  startTime: "10:00",
                  endTime: "11:00",
                },
              ],
            },
          },
        ],
      },
    },
  });
  const personal = await prisma.categoryType.upsert({
    where: { name: "Personal" },
    update: {},
    create: {
        name: "Personal",
        emoji: "🏠",
        categories: {
          create: [
            {
              name: "Home",
              tasks: {
                create: [
                  {
                    title: "Sweep the house",
                    priority: "LOW",
                    startTime: "09:00",
                    endTime: "11:00",
                  },
                ],
              },
            },
            {
              name: "Shopping",
              tasks: {
                create: [
                  {
                    title: "Buy groceries",
                    priority: "HIGH",
                    startTime: "10:00",
                    endTime: "11:00",
                  },
                ],
              },
            },
          ],
        },
      },
  });
  console.log("Seed completed:", { work, personal });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
