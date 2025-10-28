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
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(await res.text());

    const data = await res.json();
    toast.success("Added to cart!");
    return data;
  } catch (err: any) {
    toast.error(err.message || "Failed to add to cart");
    throw err;
  }
}

export async function fetchCart() {
  try {
    const res = await fetch("https://localhost:7227/api/cart", {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch cart");
    return await res.json();
  } catch (err: any) {
    toast.error("Could not load cart.");
    throw err;
  }
}

export async function updateCartItem(itemId: number, quantity: number) {
  try {
    const res = await fetch(`https://localhost:7227/api/cart/item/${itemId}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });

    if (!res.ok) throw new Error("Update failed");

    const data = await res.json();
    toast.success("Quantity updated");
    return data;
  } catch (err: any) {
    toast.error("Could not update quantity.");
    throw err;
  }
}

export async function removeCartItem(itemId: number) {
  try {
    const res = await fetch(`https://localhost:7227/api/cart/item/${itemId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Remove failed");

    const data = await res.json();
    toast.success("Item removed");
    return data;
  } catch (err: any) {
    toast.error("Could not remove item.");
    throw err;
  }
}

export async function checkoutCart() {
  try {
    const res = await fetch("https://localhost:7227/api/cart/checkout", {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Checkout failed");

    const data = await res.json();
    toast.success(`Order placed! Total: $${data.total}`);
    return data;
  } catch (err: any) {
    toast.error("Checkout failed.");
    throw err;
  }
}
