"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CheckEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";
  const [cooldown, setCooldown] = useState(0);
  const [loading, setLoading] = useState(false);


useEffect(() => {
    setCooldown(30);
  }, []);
  
 
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);
  

  const handleResend = async () => {
    if (cooldown > 0 || loading) return;
    setLoading(true);

    try {
      const res = await fetch(
        "https://localhost:7227/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!res.ok) throw new Error("Failed to resend. Try again.");

      setTimeout(() => {
        toast.success("Reset link resent!");
        setCooldown(30);
        setLoading(false);
      }, 500);
    } catch (err: any) {
      setTimeout(() => {
        toast.error(err.message || "Failed to resend. Try again.");
        setLoading(false);
      }, 500);
    }
  };

  return (
    <div className="w-screen h-screen fade-in">
      <div className="max-w-md w-full mx-auto shadow mt-10 px-4 py-10 sm:px-6 md:px-10 bg-white rounded text-center">
        <h1 className="text-4xl font-bold font-mono mb-5 text-indigo-700">
          Check Your Email
        </h1>
        <hr className="text-slate-100 w-full mb-5" />
        <p className="text-lg font-mono text-gray-700 mb-4">
          If your email exists, a password reset link has been sent to:
        </p>
        <p className="text-indigo-600 font-bold text-lg mb-6">{email}</p>

        <div className="flex flex-col gap-4 items-center">
          <button
            onClick={handleResend}
            disabled={cooldown > 0 || loading}
            className={`bg-indigo-600 text-white rounded p-2 font-mono transition cursor-pointer w-full sm:w-60 ${
              cooldown > 0 || loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-indigo-700"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></span>
              </div>
            ) : cooldown > 0 ? (
              `Try again in ${cooldown}s`
            ) : (
              "Resend Link"
            )}
          </button>

          <button
            onClick={() => router.push("/forgot-password")}
            className="bg-slate-600 text-white rounded p-2 font-mono w-full sm:w-60 hover:bg-slate-700 transition cursor-pointer "
          >
            Edit Email
          </button>
        </div>
      </div>
    </div>
  );
}
