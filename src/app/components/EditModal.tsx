"use client";

import { useEffect, useMemo, useState } from "react";
import { EditModalProps } from "../types/editModal";
import {
  useForm,
  Path,
  SubmitHandler,
  useWatch,
  DefaultValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { fetchCamel } from "@/utils/fetchCamel";
import { useAuth } from "@/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

export default function EditModal<T extends Record<string, unknown>>({
  itemId,
  initialData,
  fields,
  endpoint,
  schema,
  onClose,
  onSuccess,
}: EditModalProps<T>) {
  const [loading, setLoading] = useState(!initialData);
  const [initial, setInitial] = useState<T | null>(initialData ?? null);
  const [saving, setSaving] = useState(false);
  const { refreshUser } = useAuth();

  const defaultValues: DefaultValues<T> = fields.reduce((acc, f) => {
    const key = f.name as keyof DefaultValues<T>;
    acc[key] = (f.default ??
      (f.type === "select"
        ? f.options?.[0] ?? ""
        : "")) as DefaultValues<T>[typeof key];
    return acc;
  }, {} as DefaultValues<T>);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: (initialData as DefaultValues<T>) ?? defaultValues,
  });

  // Fetch data if not passed in
  useEffect(() => {
    if (initialData) return;
    setLoading(true);
    fetchCamel<T>(`${endpoint}/${itemId}`)
      .then((json) => {
        setInitial(json);
        reset(json);
      })
      .catch(() => toast.error("Could not load item"))
      .finally(() => setLoading(false));
  }, [itemId, endpoint, initialData, reset]);

  // Watch form changes
  const watched = useWatch({ control });
  const changed = useMemo(() => {
    if (!initial) return false;
    return JSON.stringify(initial) !== JSON.stringify(watched);
  }, [initial, watched]);

  const onSubmit: SubmitHandler<T> = async (formData) => {
    if (!changed) return;
    setSaving(true);

    try {
      // check if any field is a file
      const hasFile = Object.values(formData).some(
        (v) => v instanceof File || v instanceof FileList
      );

      let res: Response;

      if (hasFile) {
        // build FormData
        const fd = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (value instanceof File) {
            fd.append(key, value);
          } else if (value instanceof FileList && value.length > 0) {
            fd.append(key, value[0]);
          } else if (value !== undefined && value !== null) {
            fd.append(key, String(value));
          }
        });

        res = await fetch(`${endpoint}/${itemId}`, {
          method: "PUT",
          body: fd, // no headers, browser sets multipart boundary
        });
      } else {
        // fallback to JSON for non-file updates
        const pascal = (k: string) =>
          k.replace(/^([a-z])/, (_, c) => c.toUpperCase());
        const body = Object.keys(formData).reduce((acc, key) => {
          acc[pascal(key)] = formData[key];
          return acc;
        }, {} as any);

        res = await fetch(`${endpoint}/${itemId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }

      const updated = await res.json();
      if (!res.ok) throw new Error(updated.message || "Update failed");

      // normalize keys back to camelCase
      const camel = (k: string) =>
        k.replace(/^([A-Z])/, (_, c) => c.toLowerCase());
      const camelObj = Object.keys(updated).reduce<Record<string, unknown>>(
        (acc, key) => {
          acc[camel(key)] = updated[key];
          return acc;
        },
        {}
      ) as T;

      onSuccess?.(camelObj);
      toast.success("Updated successfully");
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };
console.log("Initial data in EditModal:", initial);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 fade-in">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Edit</h2>

        {loading && <p className="text-sm text-gray-500">Loading…</p>}

        {!loading && initial && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field) => (
              <div key={String(field.name)}>
                <label className="block font-medium">{field.label}</label>

                {field.type === "select" ? (
                  <select
                    {...register(field.name as Path<T>)}
                    className="w-full border p-2 rounded"
                  >
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    {...register(field.name as Path<T>)}
                    className="w-full border p-2 rounded"
                    placeholder={field.label}
                  />
                ) : field.type === "file" ? (
                  <div className="space-y-2">
                    {/* Existing image preview */}
                    {initial && (initial as any).imageurl && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          Current Image:
                        </p>
                        <img
                          src={(initial as any).imageurl}
                          alt="Current"
                          className="h-20 w-20 object-cover rounded "
                        />
                      </div>
                    )}

                    {/* File input with paperclip */}
                    <label className="flex items-center gap-2 border p-2 rounded cursor-pointer hover:bg-gray-100 w-full">
                      <FontAwesomeIcon
                        icon={faPaperclip}
                        className="text-gray-500"
                      />
                      <span className="text-sm text-gray-700">
                        Upload Image
                      </span>
                      <input
                        type="file"
                        {...register(field.name as Path<T>)}
                        className="hidden"
                      />
                    </label>

                    {/* Live preview of newly selected file */}
                    {watch(field.name as Path<T>) &&
                      (watch(field.name as Path<T>) as FileList).length > 0 && (
                        <div>
                          <p className="text-xs text-gray-500 mt-2">
                            New Image Preview:
                          </p>
                          <img
                            src={URL.createObjectURL(
                              (watch(field.name as Path<T>) as FileList)[0]
                            )}
                            alt="Preview"
                            className="h-20 w-20 object-cover rounded "
                          />
                        </div>
                      )}
                  </div>
                ) : (
                  <input
                    type={field.type}
                    {...register(field.name as Path<T>)}
                    className="w-full border p-2 rounded"
                    placeholder={field.label}
                  />
                )}

                {errors[field.name as Path<T>] && (
                  <p className="text-red-500 text-sm">
                    {errors[field.name]?.message as string}
                  </p>
                )}
              </div>
            ))}

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!changed || saving}
                className={`px-4 py-2 rounded text-white hover:cursor-pointer transition ${
                  changed && !saving
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {saving ? (
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white inline-block mr-2" />
                ) : null}
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
