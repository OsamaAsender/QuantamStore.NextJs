import Link from "next/link";
import { Product } from "@/types/Product";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      alert("Please log in to add items to your cart.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://localhost:7227/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });

      const text = await res.text(); // 👈 capture raw response
      console.log("Response status:", res.status);
      console.log("Response body:", text);

      if (!res.ok) throw new Error(text);
      alert("Product added to cart!");
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Error adding product to cart.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="rounded-lg p-4 shadow hover:shadow-md transition cursor-pointer bg-white">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-70 object-cover rounded"
        />
        <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
        <div className="mt-2 text-sm text-gray-500">
          <span>Category: </span>
          <span className="font-medium">{product.categoryName}</span>
        </div>
        <div className="mt-1 text-sm text-gray-500">
          <span>Stock: </span>
          <span
            className={
              product.stockQuantity > 0 ? "text-green-600" : "text-red-600"
            }
          >
            {product.stockQuantity > 0
              ? `${product.stockQuantity} available`
              : "Out of stock"}
          </span>
        </div>
        <span className="text-primary font-bold mt-2 block">
          ${product.price}
        </span>
        <hr />
        <button
          onClick={handleAddToCart}
          disabled={loading || product.stockQuantity <= 0}
          className="bg-indigo-500 text-white p-2 mt-2 rounded hover:bg-indigo-600 transition cursor-pointer"
        >
          {loading ? "Adding..." : "Add To Cart"}
        </button>
      </div>
    </Link>
  );
}
