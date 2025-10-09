"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  return (
    <nav className="flex justify-around p-3 bg-slate-100 shadow font-mono">
      <ul className="flex gap-5">
        <li>
          <Link href="/" className="hover:text-teal-600 transition">
            Home
          </Link>
        </li>
        <li>
          <Link href="/store" className="hover:text-teal-600 transition">
            Store
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-teal-600 transition">
            About Us
          </Link>
        </li>
      </ul>

      <ul className="flex gap-5 items-center">
        {isAuthenticated ? (
          <>
            <li className="flex items-center gap-2 hover:text-teal-600 cursor-pointer transition">
              <FontAwesomeIcon icon={faUser} />
              {user?.username}
            </li>

            <li>
              <button
                type="button"
                onClick={async () => {
                  console.log("Logout button clicked");

                  try {
                    const res = await fetch(
                      "https://localhost:7227/api/auth/logout",
                      {
                        method: "POST",
                        credentials: "include",
                      }
                    );

                    if (!res.ok) {
                      const errorText = await res.text();
                      throw new Error(errorText || "Logout failed");
                    }

                    await logout(); 
                    toast.success("Logged out successfully!"); 
                    router.push("/"); 
                  } catch (err: any) {
                    console.error("Logout error:", err);
                    toast.error(err.message || "Logout failed."); 
                  }
                }}
                className="px-4 text-red-600 hover:text-red-800 cursor-pointer transition"
              >
                Logout
              </button>
            </li>

            <li>
              <Link
                href="/cart"
                className="hover:text-teal-600 transition flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faCartShopping} className="text-dark" />
                Cart
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                href="/login"
                className="hover:text-teal-600 transition flex items-center gap-2"
              >
                Login
              </Link>
            </li>
            <span className="text-teal-600">|</span>
            <li>
              <Link href="/register" className="hover:text-teal-600 transition">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
