"use client";
import { ZodSchema } from "zod";
import { FieldConfig } from "./fieldConfig";

export interface EditModalProps<T> {
  itemId: string;
  initialData?: T;
  fields: FieldConfig<T>[];
  endpoint: string;
  schema: ZodSchema<T>; 
  onClose: () => void;
  onSuccess?: (updated: T) => void;
}
