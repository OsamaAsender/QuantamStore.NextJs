"use client";

import { useEffect, useMemo, useState } from "react";
import { EditModalProps } from "../types/editModal";
import { toast } from "react-hot-toast";
import { fetchCamel } from "@/utils/fetchCamel";

export default function EditModal<T extends Record<string, unknown>>({
  itemId,
  initialData,
  fields,
  endpoint,
  onClose,
  onSuccess,
}: EditModalProps<T>) {
  /* ---------- local state ---------- */
  const [loading, setLoading] = useState(!initialData);
  const [initial, setInitial] = useState<T | null>(initialData);
  const [data, setData] = useState<T | null>(initialData);
  const [saving, setSaving] = useState(false);

  /* ---------- fetch if we did not get initialData ---------- */
  useEffect(() => {
    if (initialData) return; // nothing to do
    setLoading(true);
    fetchCamel<T>(`${endpoint}/${itemId}`)
      .then((json) => {
        setInitial(json);
        setData(json);
      })
      .catch(() => toast.error("Could not load item"))
      .finally(() => setLoading(false));
  }, [itemId, endpoint, initialData]);

  /* ---------- diff ---------- */
  const changed = useMemo(() => {
    if (!initial || !data) return false;
    return JSON.stringify(initial) !== JSON.stringify(data);
  }, [initial, data]);

  /* ---------- field change ---------- */
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    if (!data) return;
    setData({ ...data, [e.target.name]: e.target.value });
  }

  /* ---------- submit ---------- */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data || !changed) return;
    setSaving(true);

    // camel → Pascal for .NET DTO
    const pascal = (k: string) =>
      k.replace(/^([a-z])/, (_, c) => c.toUpperCase());
    const body = Object.keys(data).reduce((acc, key) => {
      acc[pascal(key)] = data[key];
      return acc;
    }, {} as any);

    try {
      const res = await fetch(`${endpoint}/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Update failed");

      setTimeout(() => {
        toast.success("Updated successfully");
        onSuccess?.();
        onClose();
      }, 500);
    } catch (err: any) {
      setTimeout(() => toast.error(err.message || "Update failed"), 500);
    } finally {
      setSaving(false);
    }
  }

  /* ---------- render ---------- */
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 fade-in">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Edit</h2>

        {loading && <p>Loading…</p>}

        {!loading && !data && (
          <p className="text-red-600">Could not load item</p>
        )}

        {!loading && data && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={String(field.name)}>
                <label className="block font-medium">{field.label}</label>

                {field.type === "select" ? (
                  <select
                    name={String(field.name)}
                    value={(data as any)[field.name]}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                  >
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={String(field.name)}
                    value={(data as any)[field.name]}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                  />
                )}
              </div>
            ))}

            <div className="flex justify-end gap-2">
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
                className={`px-4 py-2 rounded  cursor-pointer transition text-white ${
                  changed && !saving
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {saving ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
                    Saving…
                  </div>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
