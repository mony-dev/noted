import { TaskDTO } from "./task.types";
import { taskRepository } from "./task.repository";
import { CompleteTaskForm, TaskForm } from "./task.schema";

export const taskService = {
  createTask: async (data: TaskDTO) => {
    return await taskRepository.create(data);
  },
  getTasksByCategory: async (categoryId: string): Promise<TaskForm[]> => {
    const tasks = await taskRepository.findByCategoryId(categoryId);
    return tasks.map((task) => ({
      ...task,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
      startTime: task.startTime ?? undefined,
      endTime: task.endTime ?? undefined,
      description: task.description ?? undefined,
    }));
  },
  updateTask: async (id: string, data: TaskForm) => {
    return await taskRepository.update(id, data);
  },
  completeTask: async (id: string, data: CompleteTaskForm) => {
    return await taskRepository.update(id, data);
  },
  deleteTask: async (id: string) => {
    return await taskRepository.delete(id);
  },
  getTasksPaginated: async (categoryId: string, page: number, pageSize: number, isComplete: boolean) => {
    const tasks = await taskRepository.findPaginated(categoryId, page, pageSize, isComplete);
  
    return tasks.map((task) => ({
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
    }));
  },
};
