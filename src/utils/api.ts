import { buildUrl } from "@/config/api";

interface ApiRequestOptions extends RequestInit {
  credentials?: RequestCredentials;
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const url = buildUrl(endpoint);
  
  const defaultOptions: ApiRequestOptions = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, defaultOptions);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(errorData.message || `HTTP ${response.status}`);
  }

  return response.json();
}

export async function apiRequestFormData(
  endpoint: string,
  formData: FormData
): Promise<any> {
  const url = buildUrl(endpoint);
  
  const response = await fetch(url, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(errorData.message || `HTTP ${response.status}`);
  }

  return response.json();
}
