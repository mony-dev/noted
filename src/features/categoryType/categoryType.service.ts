import { CategoryTypeDTO } from "./categoryType.types";
import { categoryTypeRepository } from "./categoryType.repository";
import { CategoryTypeForm } from "./categoryType.schema";

export const categoryTypeService = {
  createCategoryType: async (data: CategoryTypeDTO) => {
    const exists = await categoryTypeRepository.findByName(data.name);
    if (exists) {
      throw new Error("CategoryType name already exists");
    }
    return await categoryTypeRepository.create(data);
  },

  getAllCategoryTypes: async () => {
    return await categoryTypeRepository.findAll();
  },

  deleteCategoryType: async (id: string) => {
    return await categoryTypeRepository.delete(id);
  },

  updateCategoryType: async (id: string, data: CategoryTypeForm) => {
    return await categoryTypeRepository.update(id, data);
  
  }
};
