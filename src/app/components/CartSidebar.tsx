"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { toast } from "react-hot-toast"; 

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { items, updateQuantity, removeItem } = useCart();
  const router = useRouter();

  const total = items.reduce(
    (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
    0
  );

  return (
    <aside
      className={`fixed font-mono top-0 right-0 h-full w-80 bg-white shadow-lg z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
        isOpen
          ? "translate-x-0 pointer-events-auto"
          : "translate-x-full pointer-events-none"
      }`}
    >
      {/* Header */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
      </div>
      <hr className="text-gray-300" />

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <p className="text-gray-500 text-sm">Your cart is empty.</p>
        ) : (
          items.map(({ id, quantity, product }) => {
            const disableDecrease = quantity <= 1;
            const disableIncrease =
              product && quantity >= product.stockQuantity;

            return (
              <div
                key={id}
                className="flex items-center gap-4 py-4 border-b border-gray-300"
              >
                {/* Product Image */}
                <div className="w-16 h-16 relative">
                  {product?.imageUrl && (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-contain rounded"
                      unoptimized
                    />
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {product?.name}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-indigo-600 font-bold">
                      ${product?.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1 text-sm font-mono">
                      {/* Decrease */}
                      <button
                        disabled={disableDecrease}
                        onClick={() => {
                          updateQuantity(id, quantity - 1);
                          toast.success(`Decreased ${product?.name} quantity`);
                        }}
                        className={`w-6 h-6 flex items-center justify-center border rounded transition ${
                          disableDecrease
                            ? "border-gray-300 bg-gray-100 cursor-not-allowed"
                            : "border-gray-300 hover:bg-gray-100 cursor-pointer"
                        }`}
                      >
                        −
                      </button>

                      <span className="px-2">{quantity}</span>

                      {/* Increase */}
                      <button
                        disabled={disableIncrease}
                         onClick={() => {
                          updateQuantity(id, quantity + 1);
                          toast.success(`Increased ${product?.name} quantity`);
                        }}
                        className={`w-6 h-6 flex items-center justify-center border rounded transition ${
                          disableIncrease
                            ? "border-gray-300 bg-gray-100 cursor-not-allowed"
                            : "border-gray-300 hover:bg-gray-100 cursor-pointer"
                        }`}
                      >
                        +
                      </button>

                      {/* Remove */}
                      <button
                        onClick={() => {
                          removeItem(id);
                          toast.error(`${product?.name} removed from cart`);
                        }}
                        className="ml-2 text-gray-500 hover:text-red-500 transition"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <hr className="text-gray-300" />

      {/* Footer */}
      <div className="p-6">
        <div className="flex justify-between text-sm font-semibold mb-4">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              onClose();
              router.push("/cart");
            }}
            className="bg-gray-100 text-gray-800 py-2 px-4 rounded text-center hover:bg-gray-200 cursor-pointer"
          >
            View Cart
          </button>

          <button
            onClick={() => {
              onClose();
              router.push("/checkout/details");
            }}
            className="bg-indigo-600 text-white py-2 px-4 rounded text-center hover:bg-indigo-800 cursor-pointer"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default CartSidebar;
