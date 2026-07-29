"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "@/utils/api";
import { API_ENDPOINTS } from "@/config/api";

type CartItem = {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    stockQuantity: number;
  };
};

type CartContextType = {
  count: number;
  items: CartItem[];
  refreshCart: () => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
};

const CartContext = createContext<CartContextType>({
  count: 0,
  items: [],
  refreshCart: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
});

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<CartItem[]>([]);

  const refreshCart = async () => {
    try {
      const data = await apiRequest<{ items: CartItem[] }>(API_ENDPOINTS.CART);

      const list = Array.isArray(data.items) ? data.items : [];
      const totalItems = list.reduce((sum, item) => sum + item.quantity, 0);

      console.log("🔄 refreshCart triggered, items:", list);
      setItems(list);
      setCount(totalItems);
    } catch (err) {
      console.error("❌ refreshCart failed:", err);
      setItems([]);
      setCount(0);
    }
  };

  const updateQuantity = async (id: number, quantity: number) => {
    console.log("📦 updateQuantity called:", { id, quantity });
    const url = API_ENDPOINTS.CART_ITEM(id);
    console.log("➡️ PUT URL:", url);

    try {
      await apiRequest(url, {
        method: "PUT",
        body: JSON.stringify({ quantity }),
      });
      await refreshCart();
    } catch (err) {
      console.error("❌ updateQuantity error:", err);
    }
  };

  const removeItem = async (id: number) => {
    console.log("🗑️ removeItem called:", { id });
    const url = API_ENDPOINTS.CART_ITEM(id);
    console.log("➡️ DELETE URL:", url);

    try {
      await apiRequest(url, {
        method: "DELETE",
      });
      await refreshCart();
    } catch (err) {
      console.error("❌ removeItem error:", err);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ count, items, refreshCart, updateQuantity, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
}
