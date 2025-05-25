import { z } from "zod";

export const priorityEnum = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: priorityEnum,
  isComplete: z.boolean(),
  startTime: z.string().optional(), 
  endTime: z.string().optional(),
  categoryId: z.string().uuid("Invalid category ID"),
});

export type TaskForm = z.infer<typeof taskSchema>;

export const taskWithIdSchema = taskSchema.extend({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type TaskWithId = z.infer<typeof taskWithIdSchema>;

export const completeTaskSchema = z.object({
  isComplete: z.boolean()
});

export type CompleteTaskForm = z.infer<typeof completeTaskSchema>;