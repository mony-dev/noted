import { prisma } from "@/lib/prisma";
import { CategoryDTO } from "./category.types";
import { CategoryForm } from "./category.schema";

export const categoryRepository = {
  create: async (data: CategoryDTO) => {
    return await prisma.category.create({ data });
  },
  findAll: async () => {
    return await prisma.category.findMany({
      include: { tasks: true },
    });
  },
  findByName: async (name: string) => {
    return await prisma.category.findUnique({
      where: { name },
    });
  },
  delete: async (id: string) => {
    return await prisma.category.delete({
      where: { id },
    });
  },
  update: async (id: string, data: CategoryForm) => {
    return await prisma.category.update({
      where: { id },
      data,
    });
  },
  findById: async (id: string) => {
    return await prisma.category.findUnique({
      where: { id },
      include: {
        type: {
          include: {
            categories: true,
          },
        },
        tasks: true,
      },
    });
  },
};
