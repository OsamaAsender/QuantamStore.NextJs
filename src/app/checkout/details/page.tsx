"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/app/components/BreadCrumb";

export default function CheckoutDetails() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const storedSubtotal = localStorage.getItem("subtotal");
    setSubtotal(storedSubtotal ? parseFloat(storedSubtotal) : 460);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const shipping = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      address1: formData.get("address1"),
      phone: formData.get("phone"),
      zipCode: formData.get("zipCode"),
    };

    console.log("✅ Proceed button clicked");
    console.log("📦 Shipping data:", shipping);

    localStorage.setItem("shipping", JSON.stringify(shipping));
    localStorage.setItem("subtotal", subtotal.toString());

    router.push("/checkout/payment");
  };

  return (
    <div className="w-full fade-in my-7 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 md:p-10 rounded shadow">
        <Breadcrumb current="Details" />

        <h1 className="text-center text-3xl sm:text-4xl font-bold font-mono mb-6">
          Checkout Details
        </h1>
        <hr className="text-slate-100" />

        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* 🧾 Shipping Form */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold font-mono">Shipping Address</h2>
            <input
              name="fullName"
              required
              placeholder="Full Name"
              className="w-full p-3 shadow rounded border border-gray-300 focus:border-indigo-600 focus:outline-none font-mono"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="w-full p-3 shadow rounded border border-gray-300 focus:border-indigo-600 focus:outline-none font-mono"
            />
            <input
              name="address1"
              required
              placeholder="Address 1"
              className="w-full p-3 shadow rounded border border-gray-300 focus:border-indigo-600 focus:outline-none font-mono"
            />
            <input
              name="phone"
              type="tel"
              required
              placeholder="Phone"
              className="w-full p-3 shadow rounded border border-gray-300 focus:border-indigo-600 focus:outline-none font-mono"
            />
            <input
              name="zipCode"
              required
              placeholder="Zip Code"
              className="w-full p-3 shadow rounded border border-gray-300 focus:border-indigo-600 focus:outline-none font-mono"
            />
          </div>

          {/* 💰 Subtotal Summary */}
          <div className="mt-6 p-4 bg-gray-50 rounded shadow-sm font-mono text-sm h-fit">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping:</span>
              <span>-</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax:</span>
              <span>-</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount:</span>
              <span>-</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>

          {/* ✅ Responsive Buttons */}
          <div className="md:col-span-2 mt-10 flex flex-col md:flex-row gap-4">
            <button
              type="button"
              onClick={() => router.push("/cart")}
              className="w-full md:w-1/2 bg-gray-200 text-gray-700 rounded p-2 font-mono transition-colors duration-300 ease-in-out hover:bg-gray-300 cursor-pointer"
            >
              Back to Cart
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`w-full md:w-1/2 bg-indigo-600 text-white rounded p-2 font-mono transition-colors duration-300 ease-in-out cursor-pointer ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></span>
                </div>
              ) : (
                "Proceed to Payment"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
