import { CategoryDTO, CategoryWithIdAndType } from "@/features/category/category.types";
import { categoryRepository } from "@/features/category/category.repository";
import { CategoryForm } from "@/features/category/category.schema";
import { TaskWithId } from "@/features/task/task.schema";

export const categoryService = {
  createCategory: async (data: CategoryDTO) => {
    const exists = await categoryRepository.findByName(data.name);
    if (exists) {
      throw new Error("Category name already exists");
    }
    return await categoryRepository.create(data);
  },

  getAllCategories: async () => {
    return await categoryRepository.findAll();
  },

  deleteCategory: async (id: string) => {
    return await categoryRepository.delete(id);
  },

  updateCategory: async (id: string, data: CategoryForm) => {
    return await categoryRepository.update(id, data);
  },

  getCategoryById: async (id: string): Promise<(CategoryWithIdAndType  & { tasks: TaskWithId[] }) | null> => {
    const category = await categoryRepository.findById(id);
    console.log("categoryRepository", category)
    if (!category) return null;

    return {
      id: category.id,
      name: category.name,
      typeId: category.typeId,
      createdAt: category.createdAt.toISOString(),
      updatedAt: category.updatedAt.toISOString(),
      tasks: category.tasks.map((task): TaskWithId => ({
        id: task.id,
        title: task.title,
        description: task.description ?? undefined,
        priority: task.priority,
        isComplete: task.isComplete,
        startTime: task.startTime ?? undefined,
        endTime: task.endTime ?? undefined,
        categoryId: task.categoryId,
        createdAt: task.createdAt.toISOString(),
        updatedAt: task.updatedAt.toISOString(),
      })),
      type: {
        id: category.type.id,
        name: category.type.name,
        emoji: category.type.emoji,
        categories: category.type.categories.map((cat) => ({
          id: cat.id,
          name: cat.name,
        })),
        createdAt: category.type.createdAt.toISOString(),
        updatedAt: category.type.updatedAt.toISOString(),
      },
    };
  },
};
