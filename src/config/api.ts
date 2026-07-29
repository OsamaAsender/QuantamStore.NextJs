// Centralized API configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://localhost:7227";

// API endpoint paths
export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: "/api/auth/login",
  AUTH_REGISTER: "/api/auth/register",
  AUTH_LOGOUT: "/api/auth/logout",
  AUTH_ME: "/api/auth/me",
  AUTH_FORGOT_PASSWORD: "/api/auth/forgot-password",
  AUTH_RESET_PASSWORD: "/api/auth/reset-password",

  // Products
  PRODUCTS: "/api/products",
  PRODUCT_BY_ID: (id: number) => `/api/products/${id}`,

  // Categories
  CATEGORIES: "/api/categories",
  CATEGORIES_DROPDOWN: "/api/categories/dropdown",
  CATEGORY_BY_ID: (id: number) => `/api/categories/${id}`,

  // Users
  USERS: "/api/users",
  USER_BY_ID: (id: number) => `/api/users/${id}`,

  // Cart
  CART: "/api/cart",
  CART_ADD: "/api/cart/add",
  CART_ITEM: (itemId: number) => `/api/cart/item/${itemId}`,
  CART_CHECKOUT: "/api/cart/checkout",
} as const;

// Helper function to build full URLs
export function buildUrl(path: string): string {
  return `${API_BASE_URL}${path}`;
}
