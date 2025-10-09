"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://localhost:7227/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed.");
      }

      // Delay everything together
      setTimeout(async () => {
        toast.success("Welcome back, " + data.user.username + "!");
        await login(); // updates auth context AFTER toast
        router.push("/");
        setLoading(false);
      }, 500);
    } catch (err: any) {
      setTimeout(() => {
        toast.error(err.message || "Login failed.");
        setLoading(false);
      }, 500);
    }
  };

  return (
    <div className="w-full fade-in my-15 px-4 py-10">
      <div className="max-w-md mx-auto bg-white p-6 sm:p-8 md:p-10 rounded shadow">
        <h1 className="text-center text-3xl sm:text-4xl font-bold font-mono mb-6">
          Login
        </h1>
        <hr className="text-slate-100"/>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-15">
          <input
            type="email"
            className="w-full p-3 shadow rounded border border-gray-300 focus:border-indigo-600 focus:outline-none font-mono"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 shadow rounded border border-gray-300 focus:border-indigo-600 focus:outline-none font-mono"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3 cursor-pointer transition"
            >
              <span
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <img
                  src={showPassword ? "/images/show.png" : "/images/hide.png"}
                  alt=""
                  className="w-5 h-5 text-center hover:scale-105 transition-transform"
                />
              </span>
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-600 text-white rounded p-2 font-mono transition-colors duration-300 ease-in-out cursor-pointer ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></span>
              </div>
            ) : (
              "Login"
            )}
          </button>

          <h5 className="text-sm sm:text-base font-mono font-bold text-center">
            Don't have an Account?{" "}
            <Link
              href="../register"
              className="hover:text-indigo-600 transition"
            >
              Register
            </Link>
          </h5>

          <h5 className="text-sm sm:text-base font-mono font-bold text-center">
            Forgot Password?{" "}
            <Link
              href="../forgot-password"
              className="hover:text-indigo-600 transition"
            >
              Reset
            </Link>
          </h5>
        </form>
      </div>
    </div>
  );
}
