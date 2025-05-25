import { z } from "zod";
import { priorityEnum } from "./task.schema"; 

export type TaskDTO = {
  title: string;
  description?: string;
  priority: z.infer<typeof priorityEnum>;  
  isComplete?: boolean;
  startTime?: string;
  endTime?: string;
  categoryId: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string | null;
  priority: z.infer<typeof priorityEnum>;  
  isComplete: boolean;
  startTime?: string | null;
  endTime?: string | null;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
};