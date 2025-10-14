// src/utils/fetchCamel.ts
export async function fetchCamel<T>(url: string): Promise<T> {
  const res = await fetch(url);
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
