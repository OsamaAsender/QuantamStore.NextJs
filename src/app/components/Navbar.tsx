"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch("https://localhost:7227/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

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
  };

  return (
    <nav className="bg-white shadow font-mono px-4 py-3 flex items-center justify-between md:justify-around">
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-5 z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-50 bg-white shadow-lg z-50 p-6 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="text-indigo-700 mb-4 text-xl "
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>

        <ul className="flex flex-col gap-4 font-mono text-sm text-gray-700">
          <li>
            <Link
              href="/"
              className="hover:text-indigo-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/store"
              className="hover:text-indigo-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Store
            </Link>
          </li>
          <li>
            <Link
              href="/store"
              className="hover:text-indigo-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Categories
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-indigo-600 transition"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              <li className="flex items-center gap-2 hover:text-indigo-600 cursor-pointer transition">
                <FontAwesomeIcon icon={faUser} />
                {user?.username}
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  Logout
                </button>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="hover:text-indigo-600 transition flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                  Cart
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/login"
                  className="hover:text-indigo-600 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="hover:text-indigo-600 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 text-xl"
      >
        <img
          src="/images/monitor.png"
          alt="Logo"
          className="w-8 h-8 object-contain"
        />
        Quantam
      </Link>
      {/* Desktop Links */}
      <ul className="hidden md:flex gap-7 items-center">
        <li>
          <Link href="/" className="hover:text-indigo-600 transition">
            Home
          </Link>
        </li>
        <li>
          <Link href="/store" className="hover:text-indigo-600 transition">
            Store
          </Link>
        </li>
        <li>
          <Link href="/store" className="hover:text-indigo-600 transition">
            Categories
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-indigo-600 transition">
            About Us
          </Link>
        </li>
      </ul>

      {/* Auth Links - Desktop */}
      <ul className="hidden md:flex gap-2 items-center">
        {isAuthenticated ? (
          <>
            <li className="flex items-center gap-2 hover:text-indigo-600 cursor-pointer transition">
              <FontAwesomeIcon icon={faUser} />
              {user?.username}
            </li>
            <li>
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 text-red-600 hover:text-red-800 cursor-pointer transition"
              >
                Logout
              </button>
            </li>
            <li>
              <Link
                href="/cart"
                className="hover:text-indigo-600 transition flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faCartShopping} />
                Cart
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login" className="hover:text-indigo-600 transition">
                Login
              </Link>
            </li>
            <span className="text-indigo-600">|</span>
            <li>
              <Link
                href="/register"
                className="hover:text-indigo-600 transition"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* Hamburger Icon - Mobile */}
      <button
        className="md:hidden text-indigo-700 text-xl"
        onClick={() => setIsOpen(true)}
      >
        ☰
      </button>
    </nav>
  );
}
