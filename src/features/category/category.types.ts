import { TaskWithId } from "@/features/task/task.schema";

export type CategoryId = string;

export type CategoryDTO = {
  name: string;
  typeId: string;
};

export type CategoryWithIdAndType = {
  id: string;
  name: string;
  typeId?: string;
  createdAt: string;
  updatedAt: string;
  tasks: TaskWithId[];
  type: {
    id: string;
    name: string;
    emoji: string;
    categories: {
      id: string;
      name: string;
    }[];
    createdAt: string;
    updatedAt: string;
  };
};
