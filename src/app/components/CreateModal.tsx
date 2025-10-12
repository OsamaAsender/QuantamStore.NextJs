"use client";
import { useState } from "react";
import { Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import type { CreateModalProps } from "../types/createModal";
import { DefaultValues } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

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
    watch,
  } = useForm<T>({ resolver: zodResolver(schema), defaultValues });

  const onSubmit = async (data: T) => {
    setLoading(true);
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value instanceof FileList && value.length > 0) {
          formData.append(key, value[0]);
        } else if (Array.isArray(value) && value[0] instanceof File) {
          formData.append(key, value[0]);
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      // Debug: check what’s being sent
      for (const [k, v] of formData.entries()) {
        console.log(k, v);
      }

      const res = await fetch(`https://localhost:7227${endpoint}`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Creation failed");

      toast.success(json.message || "Created successfully");
      reset();
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
          {fields.map((f) => {
            const fieldName = f.name as Path<T>;
            const errorMessage = errors[fieldName]?.message as
              | string
              | undefined;
            const file = (watch(fieldName) as FileList)?.[0];

            return (
              <div key={String(fieldName)} className="flex flex-col gap-1">
                <label className="font-medium text-sm">{f.label}</label>

                {f.type === "select" && f.options ? (
                  <select
                    {...register(fieldName)}
                    className="w-full border p-2 rounded"
                    defaultValue={f.options[0]}
                  >
                    {f.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : f.type === "textarea" ? (
                  <textarea
                    {...register(fieldName)}
                    className="w-full border p-2 rounded"
                    placeholder={f.label}
                  />
                ) : f.type === "password" ? (
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register(fieldName)}
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
                        alt="Toggle password visibility"
                      />
                    </button>
                  </div>
                ) : f.type === "file" ? (
                  <>
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
                        {...register(fieldName)}
                        className="hidden"
                      />
                    </label>
                    {file && (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded mt-2 "
                      />
                    )}
                  </>
                ) : (
                  <input
                    type={f.type}
                    {...register(fieldName)}
                    className="w-full border p-2 rounded"
                    placeholder={f.label}
                  />
                )}

                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}
              </div>
            );
          })}

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
