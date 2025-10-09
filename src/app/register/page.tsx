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
    <div className="w-screen h-screen fade-in">
      <div className="w-130 mx-auto shadow mt-10 py-20 bg-white rounded">
        <h1 className="text-center text-4xl font-bold font-mono mb-5">
          Create an account
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-100 p-10 mx-auto flex flex-col gap-4"
        >
          <input
            type="email"
            {...register("email")}
            className="form-control p-3 shadow rounded border border-gray-300 focus:border-teal-600 focus:outline-none focus:transition"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            type="text"
            {...register("username")}
            className="form-control p-3 shadow rounded border border-gray-300 focus:border-teal-600 focus:outline-none focus:transition"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
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
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

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
              "Register"
            )}
          </button>

          <h5 className="font-mono font-bold">
            Already have an Account?{" "}
            <Link href="../login" className="hover:text-teal-600 transition">
              Login
            </Link>
          </h5>
        </form>
      </div>
    </div>
  );
}
