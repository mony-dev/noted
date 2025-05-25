import { z } from "zod";

export const categoryTypeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  emoji: z.string().min(1, "Emoji is required"),
});

export type CategoryTypeForm = z.infer<typeof categoryTypeSchema>;
