import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  typeId: z.string().optional(),
});

export type CategoryForm = z.infer<typeof categorySchema>;

export const categoryWithIdSchema = categorySchema.extend({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type CategoryWithId = z.infer<typeof categoryWithIdSchema>;