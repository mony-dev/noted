import { prisma } from "@/lib/prisma";
import { CategoryTypeDTO } from "./categoryType.types";
import { CategoryTypeForm } from "./categoryType.schema";

export const categoryTypeRepository = {
  create: async (data: CategoryTypeDTO) => {
    return await prisma.categoryType.create({ data });
  },
  findAll: async () => {
    return await prisma.categoryType.findMany({
      include: { categories: true },
    });
  },
  findByName: async (name: string) => {
    return await prisma.categoryType.findUnique({
      where: { name },
    });
  },
  delete: async (id: string) => {
    return await prisma.categoryType.delete({
      where: { id },
    });
  },
  update: async (id: string, data: CategoryTypeForm) => {
    return await prisma.categoryType.update({
      where: { id },
      data,
    });
  },
};
