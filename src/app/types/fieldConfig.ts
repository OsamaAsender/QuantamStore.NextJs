export type FieldConfig<T> = {
  name: keyof T;
  label: string;
  type: "text" | "email" | "password" | "select" | "textarea" | "file";
  options?: string[]; // for select fields
  default?: T[keyof T]; // optional default value
};
