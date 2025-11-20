"use client";

import { useRouter } from "next/navigation";

export default function CheckoutPayment() {
  const router = useRouter();

  const handlePlaceOrder = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shipping: {/* collected shipping data */},
        billing: {/* collected billing data */},
        sameAsShipping: true
      })
    });

    if (res.ok) {
      router.push("/checkout/confirmation");
    }
  };

  return (
    <div>
      <h2>Payment</h2>
      <p>Order Summary...</p>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
}
