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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
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
  
      await login(); // updates auth context
      toast.success("Welcome back, " + data.user.username + "!");
      router.push("/");
    } catch (err: any) {
      toast.error(err.message || "Login failed.");
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
            className="bg-teal-600 text-white rounded p-2 font-mono hover:bg-teal-700 transition cursor-pointer"
          >
            Login
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
        </form>
      </div>
    </div>
  );
}
