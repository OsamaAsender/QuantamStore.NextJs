"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://localhost:7227/api/products/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      setProduct(data);
    };

    if (id) fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-10 fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left: Product Image */}
        <div className="bg-white p-4 rounded shadow">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto object-contain rounded"
          />
        </div>

        {/* Right: Product Info */}
        <div className="bg-white p-4 rounded shadow space-y-4">
          <h1 className="text-2xl font-bold text-indigo-700">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>

          <div className="text-sm text-gray-500">
            <span className="font-semibold">Category:</span>{" "}
            {product.categoryName}
          </div>

          <div className="text-sm text-gray-500">
            <span className="font-semibold">Stock:</span>{" "}
            {product.stockQuantity > 0 ? (
              <span className="text-green-600">
                {product.stockQuantity} available
              </span>
            ) : (
              <span className="text-red-600">Out of stock</span>
            )}
          </div>

          <div className="text-xl font-bold text-indigo-600">
            ${product.price}
          </div>

          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            disabled={product.stockQuantity <= 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
