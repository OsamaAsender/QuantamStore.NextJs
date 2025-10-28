"use client";

import { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  id: number;
  quantity: number;
  product: {
    name: string;
    price: number;
    imageUrl: string;
    stockQuantity: number;
  };
};

type CartContextType = {
  count: number;
  refreshCart: () => void;
};

const CartContext = createContext<CartContextType>({
  count: 0,
  refreshCart: () => {},
});

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);

 const refreshCart = async () => {
  try {
    const res = await fetch("https://localhost:7227/api/cart", {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch cart");
    const data = await res.json();
    const totalItems = Array.isArray(data.items)
      ? data.items.reduce((sum, item) => sum + item.quantity, 0)
      : 0;

    console.log("🔄 refreshCart triggered, totalItems:", totalItems);
    setCount(totalItems);
  } catch {
    setCount(0);
  }
};


  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{ count, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}
