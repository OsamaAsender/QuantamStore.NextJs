// src/utils/fetchCamel.ts
import { buildUrl } from "@/config/api";

export async function fetchCamel<T>(url: string): Promise<T> {
  const res = await fetch(buildUrl(url), {
    credentials: "include",
  });
  if (!res.ok) throw new Error(String(res.status));
  const payload = await res.json();

  function toCamelCase(str: string) {
    return str.replace(/^[A-Z]/, (c) => c.toLowerCase());
  }

  return Object.keys(payload).reduce((acc, key) => {
    acc[toCamelCase(key)] = payload[key];
    return acc;
  }, {} as any);
}
