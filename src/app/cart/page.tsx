"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

type Product = {
  name: string;
  imageUrl: string;
  price: number;
  stockQuantity: number;
};

type CartItem = {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
};

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("https://localhost:7227/api/cart", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch cart");
        const data = await res.json();
        setItems(Array.isArray(data.items) ? data.items : []);
      } catch {
        toast.error("Could not load cart.");
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = async (itemId: number, quantity: number) => {
    if (quantity < 1) return;

    try {
      const res = await fetch(
        `https://localhost:7227/api/cart/item/${itemId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity }),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      const data = await res.json(); // ✅ backend returns CartResponseDto
      setItems(Array.isArray(data.items) ? data.items : []);
      toast.success("Quantity updated");
    } catch {
      toast.error("Could not update quantity.");
    }
  };

  const removeItem = async (itemId: number) => {
    try {
      const res = await fetch(
        `https://localhost:7227/api/cart/item/${itemId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Remove failed");

      const data = await res.json(); // ✅ backend returns CartResponseDto
      setItems(Array.isArray(data.items) ? data.items : []);
      toast.success("Item removed");
    } catch {
      toast.error("Could not remove item.");
    }
  };

  const checkout = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://localhost:7227/api/cart/checkout", {
        method: "POST",
      });

      if (!res.ok) throw new Error("Checkout failed");

      const data = await res.json();
      toast.success(`Order placed! Total: $${data.total}`);
      setItems([]);
    } catch {
      toast.error("Checkout failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 fade-in">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-20 fade-in">
          <FontAwesomeIcon
            icon={faTrash}
            className="text-gray-400 bg-white p-3 rounded-full text-4xl mb-4"
          />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven’t added anything to your cart yet.
          </p>
          <a
            href="/store"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition"
          >
            Start Shopping
          </a>
        </div>
      ) : (
        <>
          <div className="grid gap-4 mb-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border p-4 rounded shadow"
              >
                <img
                  src={item.product.imageUrl || "/placeholder.png"}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-sm text-gray-600">
                    ${item.product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stockQuantity}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
            <button
              onClick={checkout}
              disabled={loading}
              className={`btn bg-green-600 text-white p-2 rounded hover:bg-green-700 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Processing..." : "Checkout Now"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
