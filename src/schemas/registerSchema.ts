import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username must be alphanumeric",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/(?=.*[A-Z])(?=.*\d)/, {
      message: "Must include an uppercase letter and a number",
    }),
});
