import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  price: z.coerce.number().min(0),
  categoryId: z.coerce.number().int().min(1),
  stockQuantity: z.coerce.number().int().min(0),
  image: z.any().optional(),
});

export const editProductSchema = createProductSchema;

export type EditProductInput = z.infer<typeof editProductSchema>;
