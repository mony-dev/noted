import { prisma } from "@/lib/prisma";
import { TaskDTO } from "./task.types";
import { TaskForm } from "./task.schema";

export const taskRepository = {
  create: async (data: TaskDTO) => {
    return await prisma.task.create({
      data,
    });
  },

  findByCategoryId: async (categoryId: string) => {
    return await prisma.task.findMany({
      where: { categoryId },
      orderBy: { createdAt: "desc" },
    });
  },

  update: async (id: string, data: Partial<TaskForm>) => {
    return await prisma.task.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string) => {
    await prisma.task.delete({
      where: { id },
    });
  },
  findByID: async (id: string) => {
    return await prisma.task.findUnique({
      where: { id},
    });
  },
  findPaginated: async (categoryId: string, page: number, pageSize: number, isComplete: boolean) => {
    return await prisma.task.findMany({
      where: {
        categoryId,
        isComplete,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    });
  },  
};
