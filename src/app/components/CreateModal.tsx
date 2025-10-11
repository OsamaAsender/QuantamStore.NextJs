"use client";
import { useState } from "react";
import { Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import type { CreateModalProps } from "../types/createModal";
import { DefaultValues } from "react-hook-form";
import { createUserSchema, type CreateUserInput } from "@/schemas/user";

export default function CreateModal<T extends Record<string, unknown>>({
  endpoint,
  schema,
  fields,
  onClose,
  onSuccess,
}: CreateModalProps<T>) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
  } = useForm<T>({ resolver: zodResolver(schema), defaultValues });

  const onSubmit = async (data: T) => {
    setLoading(true);
    try {
      const res = await fetch(`https://localhost:7227${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Creation failed");

      toast.success(json.message || "Created successfully");
      reset(); // clear form
      onSuccess?.();
      setTimeout(() => onClose(), 500);
    } catch (err: any) {
      toast.error(err.message || "Creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 fade-in">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Create</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {fields.map((f) => (
            <div key={String(f.name)}>
              {f.type === "select" ? (
                <select
                  {...register(f.name as Path<T>)}
                  className="w-full border p-2 rounded"
                  defaultValue="Customer"
                >
                  {f.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : f.type === "textarea" ? (
                <textarea
                  {...register(f.name as Path<T>)}
                  className="w-full border p-2 rounded"
                  placeholder={f.label}
                />
              ) : f.type === "password" ? (
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register(f.name as Path<T>)}
                    className="w-full border p-2 rounded"
                    placeholder={f.label}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-2 hover:cursor-pointer"
                  >
                    <img
                      src={
                        showPassword ? "/images/show.png" : "/images/hide.png"
                      }
                      className="w-5 h-5"
                      alt=""
                    />
                  </button>
                </div>
              ) : (
                <input
                  type={f.type}
                  {...register(f.name as Path<T>)}
                  className="w-full border p-2 rounded"
                  placeholder={f.label}
                />
              )}
              {/* validation message */}
              {errors[f.name as Path<T>] && (
                <p className="text-red-500 text-sm">
                  {errors[f.name]?.message as string}
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
              disabled={loading}
              className={`px-4 py-2 rounded text-white hover:cursor-pointer transition ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white inline-block mr-2" />
              ) : null}
              {loading ? "Creating…" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
