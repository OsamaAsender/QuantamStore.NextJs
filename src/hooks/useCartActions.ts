"use client";

import { useCart } from "@/context/CartContext";
import {
  handleAddToCart,
  updateCartItem,
  removeCartItem,
  checkoutCart,
  fetchCart,
} from "@/utils/Cart";

export function useCartActions() {
  const { refreshCart } = useCart();

  const addToCart = async (productId: number, quantity = 1) => {
    const data = await handleAddToCart(productId, quantity);
    await refreshCart();
    return data;
  };

  const updateItem = async (itemId: number, quantity: number) => {
    const data = await updateCartItem(itemId, quantity);
    await refreshCart();
    return data;
  };

  const removeItem = async (itemId: number) => {
    const data = await removeCartItem(itemId);
    await refreshCart();
    return data;
  };

  const checkout = async () => {
    const data = await checkoutCart();
    await refreshCart();
    return data;
  };

  const loadCart = async () => {
    const data = await fetchCart();
    return data;
  };

  return {
    addToCart,
    updateItem,
    removeItem,
    checkout,
    loadCart,
  };
}
