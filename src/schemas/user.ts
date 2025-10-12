// schemas/user.ts
import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(3, '≥ 3 chars').max(30, '≤ 30 chars'),
  email:    z.string().email('Invalid e-mail'),
  password: z.string().min(6, '≥ 6 chars').optional(),
  role:     z.enum(['Admin', 'Customer'], {
              errorMap: () => ({ message: 'Pick a role' }),
            }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;


export const editUserSchema = createUserSchema.omit({ password: true });
export type EditUserInput = z.infer<typeof editUserSchema>;
