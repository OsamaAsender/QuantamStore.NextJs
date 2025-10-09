"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [strength, setStrength] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const score = getPasswordStrength(newPassword);
    setStrength(score);
  }, [newPassword]);

  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return "Weak";
    if (
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    )
      return "Strong";
    return "Medium";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setTimeout(() => {
        toast.error("Passwords do not match");
        setLoading(false);
      }, 500);
      return;
    }

    try {
      const res = await fetch(
        "https://localhost:7227/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword }),
        }
      );

      if (!res.ok) throw new Error("Something went wrong. Please try again.");

      setTimeout(() => {
        toast.success("Password reset successful! Redirecting...");
        router.push("/login");
        setLoading(false);
      }, 500);
    } catch (err: any) {
      setTimeout(() => {
        toast.error(err.message || "Something went wrong. Please try again.");
        setLoading(false);
      }, 500);
    }
  };

  return (
    <div className="w-screen h-screen fade-in">
      <div className="w-130 mx-auto shadow mt-10 py-20 bg-white rounded">
        <h1 className="text-center text-4xl font-bold font-mono mb-5">
          Reset Your Password
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-100 p-10 mx-auto flex flex-col gap-4"
        >
          {/* New Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control p-3 shadow rounded border border-gray-300 focus:border-teal-600 focus:outline-none focus:transition w-full"
              placeholder="New password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3 text-sm text-gray-600 hover:text-teal-600 cursor-pointer transition"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Strength Meter */}
          <p
            className={`text-sm font-mono ${
              strength === "Strong"
                ? "text-green-600"
                : strength === "Medium"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            Strength: {strength}
          </p>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control p-3 shadow rounded border border-gray-300 focus:border-teal-600 focus:outline-none focus:transition w-full"
              placeholder="Confirm password"
              required
            />
            <p
              className={`text-sm font-mono mt-2 ${
                confirmPassword.length === 0
                  ? "text-gray-400"
                  : newPassword === confirmPassword
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {confirmPassword.length === 0
                ? "Waiting for confirmation..."
                : newPassword === confirmPassword
                ? "✅ Passwords match"
                : "❌ Passwords do not match"}
            </p>

            <button
              type="button"
              onClick={() => setShowConfirm((prev) => !prev)}
              className="absolute right-3 top-3 text-sm text-gray-600 hover:text-teal-600 cursor-pointer transition"
            >
              {showConfirm ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-teal-600 text-white rounded p-2 font-mono transition cursor-pointer w-full ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-teal-700"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></span>
              </div>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
