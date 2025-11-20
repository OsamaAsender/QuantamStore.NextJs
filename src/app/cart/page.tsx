"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCartActions } from "@/hooks/useCartActions";
import Link from "next/link";
import Breadcrumb from "../components/BreadCrumb";

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
  const { updateItem, removeItem, checkout, loadCart } = useCartActions();

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  useEffect(() => {
    loadCart()
      .then((data) => setItems(data.items))
      .catch(() => {});
  }, []);

  const updateQuantity = async (itemId: number, quantity: number) => {
    if (quantity < 1) return;
    try {
      const data = await updateItem(itemId, quantity);
      setItems(data.items);
    } catch {}
  };

  const removeItemHandler = async (itemId: number) => {
    try {
      const data = await removeItem(itemId);
      setItems(data.items);
    } catch {}
  };

  return (
    <div className="container mx-auto max-w-6xl my-10 px-4 fade-in">
      <Breadcrumb current="Cart" />

      {items.length === 0 ? (
        <div className="text-center py-20">
          <FontAwesomeIcon
            icon={faTrash}
            className="text-gray-400 p-3 rounded-full text-4xl mb-4"
          />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven’t added anything yet.
          </p>
          <Link
            href="/store"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition font-mono"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10">
          {/* 🛍️ Cart Items */}
          <div>
            <h1 className="text-2xl font-bold text-gray-700 font-mono mb-6">
              Shopping Cart
              <FontAwesomeIcon
                icon={faCartShopping}
                className="ml-3 text-indigo-600"
              />
            </h1>
            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[80px_1fr_100px_180px_40px] items-center bg-white my-4 p-4 rounded shadow gap-4"
              >
                <img
                  src={item.product.imageUrl || "/placeholder.png"}
                  alt={item.product.name}
                  className="w-20 h-20 object-contain rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.product.name}</h3>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>
                <div className="grid grid-cols-[40px_40px_40px_1fr] items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className={`p-1 rounded text-center ${
                      item.quantity <= 1
                        ? "bg-gray-200 cursor-not-allowed"
                        : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                    }`}
                  >
                    −
                  </button>
                  <span className="text-center font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.product.stockQuantity}
                    className="p-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer transition text-center"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItemHandler(item.id)}
                    className="text-red-500 text-sm justify-self-end hover:bg-gray-200 p-1 rounded-full transition cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 📦 Summary Sidebar */}
          <div className="flex flex-col gap-6 bg-gray-50 p-6 rounded shadow-sm font-mono text-sm h-fit">
            {/* 💰 Order Summary */}
            <section className="space-y-2">
              <h2 className="text-base font-semibold text-gray-700 mb-2">
                Order Summary
              </h2>
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>-</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>-</span>
              </div>
              <div className="flex justify-between">
                <span>Discount:</span>
                <span>-</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </section>

            {/* ✉️ Note */}
            <section>
              <label
                htmlFor="note"
                className="block font-semibold text-gray-700 mb-2"
              >
                Additional Comments
              </label>
              <textarea
                id="note"
                rows={3}
                placeholder="Leave a note..."
                className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:border-indigo-600"
              />
            </section>

            {/* 🎟️ Voucher */}
            <section>
              <label
                htmlFor="voucher"
                className="block font-semibold text-gray-700 mb-2"
              >
                Voucher
              </label>
              <div className="flex gap-2">
                <input
                  id="voucher"
                  type="text"
                  placeholder="Enter code"
                  className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-600"
                />
                <button
                  type="button"
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                >
                  Apply
                </button>
              </div>
            </section>

            {/* ✅ Actions */}
            <section className="flex flex-col gap-3">
              <Link
                href="/checkout/details"
                onClick={() =>
                  localStorage.setItem("subtotal", total.toString())
                }
                className="w-full bg-indigo-600 text-white p-2 rounded transition text-center hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
