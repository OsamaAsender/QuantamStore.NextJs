"use client";

import Link from "next/link";
import { Product } from "@/types/Product";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useCartActions } from "@/hooks/useCartActions";
import { toast } from "react-hot-toast";

export default function ProductCard({ product }: { product: Product }) {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCartActions();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    setLoading(true);
    try {
      await addToCart(product.id, 1);
    } catch (err) {
      toast.error("Error adding product to cart.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group relative bg-white rounded-lg border border-slate-200 font-mono hover:transition flex flex-col cursor-default">
      {/* Product Image as Link */}
      <Link href={`/product/${product.id}`}>
        <div className="relative w-full h-70 rounded cursor-pointer">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain p-3 transform transition-transform duration-300 hover:scale-96"
          />
        </div>
      </Link>
      <div className="bg-gray-50 h-full w-full p-3 rounded-lg">
        {/* Product Info */}
        <div className="p-3 h-full flex flex-col justify-between gap-1">
          <div className="">
            <h3 className="text-sm font-semibold text-gray-800">
              {product.name}
            </h3>
          </div>
          <div>
            {/* Rating */}
            <div className="text-yellow-500 text-sm">
              {"★".repeat(product.rating ?? 4)}
              {"☆".repeat(5 - (product.rating ?? 4))}
            </div>

            {/* Price */}
            <div className="text-indigo-600 font-bold text-sm mt-1">
              ${product.price.toLocaleString()}
            </div>
            <div className="flex justify-between">
              {/* Stock */}
              <div className="text-sm text-gray-500">
                {product.stockQuantity > 0 ? (
                  <span className="text-green-600">In stock</span>
                ) : (
                  <span className="text-red-600">Out of stock</span>
                )}
              </div>
              {/* Add Button */}
              <button
                onClick={handleAddToCart}
                disabled={loading || product.stockQuantity <= 0}
                className="px-1.5 rounded border hover:bg-slate-50 cursor-pointer transition"
              >
                {loading ? "..." : "+"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
