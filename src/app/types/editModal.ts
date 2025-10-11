export interface EditModalProps<T> {
    itemId: number;
    initialData: T;
    fields: Array<{
    name: keyof T;
    label: string;
    type: "text" | "email" | "select";
    options?: string[]; // for select fields
  }>;
  endpoint: string;
  onClose: () => void;
  onSuccess?: () => void;
}
