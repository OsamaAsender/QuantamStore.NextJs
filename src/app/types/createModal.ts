import { ZodSchema } from "zod";
import { FieldValues } from "react-hook-form";

export type CreateModalProps<T extends FieldValues> = {
  endpoint: string; // POST url e.g. "/api/users"
  schema: ZodSchema<T>; // your Zod schema (register, product …)
  fields: Array<{
    name: keyof T;
    label: string;
    type: "text" | "email" | "password" | "select" | "textarea" | "file" | "number";
    options?: string[]; // for selects
     default?: T[keyof T];
  }>;
  onClose: () => void;
  onSuccess?: () => void; // optional parent refresh
};