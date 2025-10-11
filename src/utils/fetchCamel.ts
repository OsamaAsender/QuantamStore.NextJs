// src/utils/fetchCamel.ts
export async function fetchCamel<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(String(res.status));
  const payload = await res.json();

  // quick & dirty camel-case converter (works for the flat user object)
  const camel = (k: string) =>
    k.replace(/([A-Z])/g, (_, c) => c.toLowerCase());

  return Object.keys(payload).reduce((acc, key) => {
    acc[camel(key)] = payload[key];
    return acc;
  }, {} as any);
}