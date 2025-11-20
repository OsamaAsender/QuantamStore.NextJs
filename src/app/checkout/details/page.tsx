"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/app/components/BreadCrumb";

export default function CheckoutDetails() {
  const router = useRouter();
  const [shipping, setShipping] = useState({});
  const [billing, setBilling] = useState({});
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [loading, setLoading] = useState(false);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const storedSubtotal = localStorage.getItem("subtotal");
    if (storedSubtotal) {
      setSubtotal(parseFloat(storedSubtotal));
    } else {
      setSubtotal(460); // fallback mock value
    }
  }, []);

  const handleNext = () => {
    setLoading(true);
    localStorage.setItem("shipping", JSON.stringify(shipping));
    if (!sameAsShipping) {
      localStorage.setItem("billing", JSON.stringify(billing));
    }
    localStorage.setItem("subtotal", subtotal.toString());
    router.push("/checkout/payment");
  };

  return (
    <div className="w-full fade-in my-7 px-4 ">
      <div className="max-w-4xl mx-auto bg-white p-6  sm:p-8 md:p-10 rounded shadow">
        <Breadcrumb current="Details" />

        <h1 className="text-center text-3xl sm:text-4xl font-bold font-mono mb-6">
          Checkout Details
        </h1>
        <hr className="text-slate-100" />

        <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* 🧾 Shipping Form */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold font-mono">Shipping Address</h2>
            <input
              placeholder="Full Name"
              className="w-full p-3 shadow rounded border border-gray-300 focus:border-indigo-600 focus:outline-none font-mono"
              onChange={(e) =>
                setShipping({ ...shipping, fullName: e.target.value })
              }
            />
            <input
              placeholder="Email"
              className="w-full p-3 shadow rounded border border-gray-300 focus:border-indigo-600 focus:outline-none font-mono"
              onChange={(e) =>
                setShipping({ ...shipping, email: e.target.value })
              }
            />
            <input
              placeholder="Address 1"
              className="w-full p-3 shadow rounded border border-gray-300 focus:border-indigo-600 focus:outline-none font-mono"
              onChange={(e) =>
                setShipping({ ...shipping, address1: e.target.value })
              }
            />
            <input
              placeholder="Phone"
              className="w-full p-3 shadow rounded border border-gray-300 focus:border-indigo-600 focus:outline-none font-mono"
              onChange={(e) =>
                setShipping({ ...shipping, phone: e.target.value })
              }
            />
            <input
              placeholder="Zip Code"
              className="w-full p-3 shadow rounded border border-gray-300 focus:border-indigo-600 focus:outline-none font-mono"
              onChange={(e) =>
                setShipping({ ...shipping, zipCode: e.target.value })
              }
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
        </form>

        {/* ✅ Responsive Buttons */}
        <div className="mt-15 flex flex-col md:flex-row gap-4">
          {/* Back to Cart */}
          <button
            type="button"
            onClick={() => router.push("/cart")}
            className="w-full md:w-1/2 bg-gray-200 text-gray-700 rounded p-2 font-mono transition-colors duration-300 ease-in-out hover:bg-gray-300 cursor-pointer"
          >
            Back to Cart
          </button>

          {/* Proceed to Payment */}
          <button
            type="button"
            disabled={loading}
            onClick={handleNext}
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
      </div>

      {/* Tailwind shortcut for inputs */}
      <style jsx>{`
        .input {
          @apply w-full p-3 shadow rounded border border-gray-300 focus:border-indigo-600 focus:outline-none font-mono;
        }
      `}</style>
    </div>
  );
}
