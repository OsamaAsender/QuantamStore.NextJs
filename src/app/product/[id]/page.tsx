"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCartActions } from "@/hooks/useCartActions";
import { handleAddToCart } from "@/utils/Cart";
import { useAuth } from "@/context/AuthContext";
import { Product } from "../../types/product";
import toast from "react-hot-toast";
import ProductTabs from "@/app/components/ProductTabs";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCartActions();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      toast.error("You Must Be Signed In To Add To Cart");
      return;
    }

    setLoading(true);
    try {
      await addToCart(product.id, 1);
    } catch (err) {
      toast.error("Error adding product to cart");
    } finally {
      setLoading(false);
    }
  };

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow items-start">
        <div className="p-4 rounded flex justify-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="
      w-full max-w-[500px] 
      h-auto md:h-[500px] 
      object-contain rounded 
    "
          />
        </div>

        {/* Right: Product Info */}
        <div className=" p-4 rounded h-full flex flex-col justify-center space-y-10">
          <div className="div">
            <h1 className="text-3xl font-bold text-indigo-700">
              {product.name}
            </h1>
            {/* <p className="text-gray-600">{product.description}</p> */}
          </div>
          <div className="space-y-5">
            <div className="text-sm text-gray-500">
              <span className="font-semibold">Category:</span>{" "}
              {product.categoryName}
            </div>

            <div className="text-sm text-gray-500">
              <span className="font-semibold">Status:</span>{" "}
              {product.stockQuantity > 0 ? (
                <span className="text-green-600">In Stock</span>
              ) : (
                <span className="text-red-600">Out of stock</span>
              )}
            </div>

            <div className="text-xl font-bold text-indigo-600">
              ${product.price}
            </div>
            <div className="space-x-4">
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition cursor-pointer"
                onClick={handleAddToCart}
                disabled={product.stockQuantity <= 0}
              >
                Add to Cart
              </button>
              <button
                className="bg-white border border-indigo-600 text-indigo-600 px-4 py-2 rounded hover:bg-indigo-50 transition cursor-pointer"
                onClick={router.back}
              >
                back
              </button>
            </div>
          </div>
        </div>
      </div>
      <ProductTabs
        description={product.description}
        specifications={{
          brand: "Quantum",
          model: "Pulse X",
          type: "Wireless Gaming Headset",
          frequencyResponse: "20Hz – 20kHz",
          connectivity: "Bluetooth 5.2 / USB-C",
          batteryLife: "Up to 18 hours",
          microphone: "Detachable, noise-canceling",
          compatibility: "PC, PS5, Xbox Series X, Switch",
          origin: "Taiwan",
        }}
        reviews={[
          {
            name: "Sarah M.",
            text: "Absolutely love this headset! The sound quality is insane and the mic is crystal clear.",
            role: "Verified Buyer",
          },
          {
            name: "Jamal R.",
            text: "Battery lasts all day and it’s super comfortable. Great for long gaming sessions.",
            role: "Competitive Gamer",
          },
          {
            name: "Lina K.",
            text: "Works flawlessly with my PS5 and PC. Worth every penny.",
            role: "Tech Enthusiast",
          },
        ]}
      />
    </div>
  );
}
