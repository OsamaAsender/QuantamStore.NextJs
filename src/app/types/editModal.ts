export interface EditModalProps<T> {
  itemId: number;
  initialData?: T;
  fields: Array<{
    name: keyof T;
    label: string;
    type: "text" | "email" | "select";
    options?: string[];
  }>;
  endpoint: string;
  onClose: () => void;
  onSuccess?: (updated: T) => void; // <-- accept the fresh object
}