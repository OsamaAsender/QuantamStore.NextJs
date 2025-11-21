"use client";

import { createContext, useContext, useEffect, useState } from "react";

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
      const res = await fetch("https://localhost:7227/api/cart", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();

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
    const url = `https://localhost:7227/api/cart/item/${id}`;
    console.log("➡️ PUT URL:", url);

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
        credentials: "include",
      });
      if (!res.ok) {
        console.error("❌ updateQuantity failed:", res.status, res.statusText);
      }
      await refreshCart();
    } catch (err) {
      console.error("❌ updateQuantity error:", err);
    }
  };

  const removeItem = async (id: number) => {
    console.log("🗑️ removeItem called:", { id });
    const url = `https://localhost:7227/api/cart/item/${id}`;
    console.log("➡️ DELETE URL:", url);

    try {
      const res = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        console.error("❌ removeItem failed:", res.status, res.statusText);
      }
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
