import { toast } from "react-hot-toast";

export type AddToCartDto = {
  productId: number;
  quantity: number;
};

export async function handleAddToCart(productId: number, quantity = 1) {
  const payload: AddToCartDto = { productId, quantity };

  try {
    const res = await fetch("https://localhost:7227/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add Authorization header if needed
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }

    const data = await res.json();
    toast.success("Added to cart!");
    return data;
  } catch (err: any) {
    toast.error(err.message || "Failed to add to cart");
    throw err;
  }
}
