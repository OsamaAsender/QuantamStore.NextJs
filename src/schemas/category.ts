import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  image: z.any().optional(), // File or null
});

export const editCategorySchema = createCategorySchema;
export type EditCategoryInput = z.infer<typeof editCategorySchema>;
