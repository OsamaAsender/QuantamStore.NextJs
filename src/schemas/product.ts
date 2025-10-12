import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  price: z.number().min(0),
  category: z.string().min(2),
  stock: z.number().int().min(0),
   image: z.any().optional(), 
});

export const editProductSchema = createProductSchema; // or .omit({ stock: true }) if needed
export type EditProductInput = z.infer<typeof editProductSchema>;
