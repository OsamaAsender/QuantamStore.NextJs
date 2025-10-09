"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { registerSchema } from "@/schemas/registerSchema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const { login } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);

    try {
      const res = await fetch("https://localhost:7227/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Registration failed.");

      setTimeout(async () => {
        toast.success("Welcome, " + result.user.username + "!");
        await login(); // updates auth context AFTER toast
        router.push("/");
        setLoading(false);
      }, 500);
    } catch (err: any) {
      setTimeout(() => {
        toast.error(err.message || "Registration failed.");
        setLoading(false);
      }, 500);
    }
  };

  return (
    <div className="w-full fade-in px-4 py-10">
      <div className="max-w-md mx-auto bg-white p-6 sm:p-8 md:p-10 rounded shadow">
        <h1 className="text-center text-3xl sm:text-4xl font-bold font-mono mb-6">
          Create an account
        </h1>
<hr className="text-slate-100"/>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-15"
        >
          <input
            type="email"
            {...register("email")}
            className="w-full p-3 shadow rounded border border-gray-300 focus:border-indigo-600 focus:outline-none font-mono"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            type="text"
            {...register("username")}
            className="w-full p-3 shadow rounded border border-gray-300 focus:border-indigo-600 focus:outline-none font-mono"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
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
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

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
              "Register"
            )}
          </button>

          <h5 className="text-sm sm:text-base font-mono font-bold text-center">
            Already have an Account?{" "}
            <Link href="../login" className="hover:text-indigo-600 transition">
              Login
            </Link>
          </h5>
        </form>
      </div>
    </div>
  );
}
