"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

      if (!res.ok) throw new Error("Something went wrong. Try again.");

      setTimeout(() => {
        toast.success("Reset link sent! Check your inbox.");
        router.push(`/check-email?email=${encodeURIComponent(email)}`);
        setLoading(false);
      }, 500);
    } catch (err: any) {
      setTimeout(() => {
        toast.error(err.message || "Something went wrong. Try again.");
        setLoading(false);
      }, 500);
    }
  };

  return (
    <div className="w-screen h-screen fade-in">
      <div className="max-w-md w-full mx-auto shadow mt-10 px-4 py-10 sm:px-6 md:px-10 bg-white rounded">
        <h1 className="text-center text-4xl font-bold font-mono mb-5">
          Forgot Password
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-100 p-10 mx-auto flex flex-col gap-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control p-3 shadow rounded border border-gray-300 focus:border-indigo-600 focus:outline-none focus:transition"
            placeholder="Enter your email"
            required
          />
          <div className="mt-10 flex flex-col gap-3">
            <button
              type="submit"
              disabled={loading}
              className={`bg-indigo-600 text-white rounded p-2 font-mono transition cursor-pointer w-full ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-indigo-700"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></span>
                </div>
              ) : (
                "Send Reset Link"
              )}
            </button>

            <Link
              href="../login"
              className="bg-slate-600 text-white text-center rounded p-2 font-mono hover:bg-slate-700 transition cursor-pointer"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
