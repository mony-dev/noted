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
        ],
      },
    },
  });

  console.log("Seed completed:", work);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
