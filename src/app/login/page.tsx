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
    <div className="w-screen h-screen fade-in">
      <div className="w-130 mx-auto shadow mt-10 py-20 bg-white rounded">
        <h1 className="text-center text-4xl font-bold font-mono mb-5">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="w-100 p-10 mx-auto flex flex-col gap-4"
        >
          <input
            type="Email"
            className="form-control p-3 shadow rounded border border-gray-300 focus:border-teal-600 focus:outline-none focus:transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control p-3 shadow rounded border border-gray-300 focus:border-teal-600 focus:outline-none focus:transition w-full"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3 text-sm text-gray-600 hover:text-teal-600 cursor-pointer transition"
            >
              {showPassword ? "Hide" : "Show"}
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
              "Login"
            )}
          </button>

          <h5 className="font-mono font-bold">
            Don't have an Account?{" "}
            <span>
              <Link
                href="../register"
                className="hover:text-teal-600 transition"
              >
                Register
              </Link>
            </span>
          </h5>
          <h5 className="font-mono font-bold">
            Forgot Password?
            <span>
              <Link
                href="../forgot-password"
                className=" ms-2 hover:text-teal-600 transition"
              >
                Reset
              </Link>
            </span>
          </h5>
        </form>
      </div>
    </div>
  );
}
