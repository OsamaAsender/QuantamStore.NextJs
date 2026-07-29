import { toast } from "react-hot-toast";
import { apiRequest } from "@/utils/api";
import { API_ENDPOINTS } from "@/config/api";

export type AddToCartDto = {
  productId: number;
  quantity: number;
};

export async function handleAddToCart(productId: number, quantity = 1) {
  const payload: AddToCartDto = { productId, quantity };

  try {
    const data = await apiRequest(API_ENDPOINTS.CART_ADD, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    toast.success("Added to cart!");
    return data;
  } catch (err: any) {
    toast.error(err.message || "Failed to add to cart");
    throw err;
  }
}

export async function fetchCart() {
  try {
    return await apiRequest(API_ENDPOINTS.CART);
  } catch (err: any) {
    toast.error("Could not load cart.");
    throw err;
  }
}

export async function updateCartItem(itemId: number, quantity: number) {
  try {
    const data = await apiRequest(API_ENDPOINTS.CART_ITEM(itemId), {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    });
    toast.success("Quantity updated");
    return data;
  } catch (err: any) {
    toast.error("Could not update quantity.");
    throw err;
  }
}

export async function removeCartItem(itemId: number) {
  try {
    const data = await apiRequest(API_ENDPOINTS.CART_ITEM(itemId), {
      method: "DELETE",
    });
    toast.success("Item removed");
    return data;
  } catch (err: any) {
    toast.error("Could not remove item.");
    throw err;
  }
}

export async function checkoutCart() {
  try {
    const data = await apiRequest<{ total: number }>(API_ENDPOINTS.CART_CHECKOUT, {
      method: "POST",
    });
    toast.success(`Order placed! Total: $${data.total}`);
    return data;
  } catch (err: any) {
    toast.error("Checkout failed.");
    throw err;
  }
}
