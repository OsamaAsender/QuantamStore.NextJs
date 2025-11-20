import Link from "next/link";
import { Product } from "@/types/Product";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useCartActions } from "@/hooks/useCartActions";
import { toast } from "react-hot-toast"; // ✅ Add this

export default function ProductCard({ product }: { product: Product }) {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCartActions();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      toast.error("Please log in to add items to your cart."); // ✅ Replace alert
      return;
    }

    setLoading(true);
    try {
      await addToCart(product.id, 1);
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error("Error adding product to cart."); // ✅ Replace alert
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className=" fade-in rounded-lg p-4 bg-slate shadow hover:shadow-md transition cursor-pointer bg-white h-[650px] flex flex-col justify-between">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-70 object-contain rounded shadow"
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
        <div className="space-x-3">
          <button
            onClick={handleAddToCart}
            disabled={loading || product.stockQuantity <= 0}
            className="bg-indigo-600 w-full text-white p-2 mt-2 rounded hover:bg-indigo-700 transition cursor-pointer"
          >
            {loading ? "Adding..." : "Add To Cart"}
          </button>
        </div>
      </div>
    </Link>
  );
}
