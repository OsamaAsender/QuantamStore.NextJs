"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import CartSidebar from "./CartSidebar";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { count } = useCart();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Logout handler
  const handleLogout = async () => {
    try {
      const res = await fetch("https://localhost:7227/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error((await res.text()) || "Logout failed");

      await logout();
      toast.success("Logged out successfully!");
      router.push("/");
    } catch (err: any) {
      console.error("Logout error:", err);
      toast.error(err.message || "Logout failed.");
    }
  };

  // Close profile dropdown on route change
  useEffect(() => {
    setProfileOpen(false);
  }, [pathname]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const dropdown = document.getElementById("profile-dropdown");
      if (dropdown && !dropdown.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="bg-white shadow font-mono px-4 py-3 flex items-center justify-between md:justify-around">
        {/* Mobile Overlay */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-5 z-40 transition-opacity duration-300"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 p-6 transform transition-transform duration-300 ${
            isMobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            className="text-indigo-700 mb-4 text-xl"
            onClick={() => setIsMobileOpen(false)}
          >
            ✕
          </button>

          <ul className="flex flex-col gap-4 font-mono text-sm text-gray-700">
            <li>
              <Link href="/" onClick={() => setIsMobileOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/store" onClick={() => setIsMobileOpen(false)}>
                Store
              </Link>
            </li>
            <li>
              <Link href="/store" onClick={() => setIsMobileOpen(false)}>
                Categories
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setIsMobileOpen(false)}>
                About Us
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                <li className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faUser} />
                  {user?.username}
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileOpen(false);
                      handleLogout();
                    }}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    Logout
                  </button>
                </li>
                <li className="relative">
                  <button
                    type="button"
                    onClick={() => setIsCartOpen((prev) => !prev)}
                    className="flex items-center gap-2 hover:text-indigo-600 transition relative"
                  >
                    <FontAwesomeIcon icon={faCartShopping} />
                    {count > 0 && (
                      <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {count}
                      </span>
                    )}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login" onClick={() => setIsMobileOpen(false)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" onClick={() => setIsMobileOpen(false)}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl">
          <img
            src="/images/quantamLogo2.png"
            alt="Logo"
            className="w-8 h-8 object-contain"
          />
          Quantam
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-7 items-center text-gray-500">
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
        <ul className="hidden md:flex gap-5 items-center text-gray-500">
          {isAuthenticated ? (
            <>
              {/* Profile Dropdown */}
              <div
                className="relative group"
                onClick={() => setProfileOpen((prev) => !prev)}
              >
                <button
                  className="flex items-center gap-1 hover:text-indigo-600 transition"
                  aria-expanded={profileOpen}
                  aria-controls="profile-dropdown"
                >
                  <FontAwesomeIcon icon={faUser} />
                  {user?.username}
                </button>

                <div
                  id="profile-dropdown"
                  className={`absolute top-full right-0 mt-2 bg-white shadow rounded text-sm font-mono z-50 min-w-[150px] transition-all duration-300
                    ${
                      profileOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }
                  `}
                >
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                    onClick={() => setProfileOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/admin"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                    onClick={() => setProfileOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      handleLogout();
                    }}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* Cart Icon */}
              <li className="relative">
                <button
                  type="button"
                  onClick={() => setIsCartOpen((prev) => !prev)}
                  className="flex items-center gap-2 hover:text-indigo-600 transition relative cursor-pointer"
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                  {count > 0 && (
                    <span className="absolute -top-4 -right-3 bg-indigo-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {count}
                    </span>
                  )}
                </button>
              </li>
            </>
          ) : (
            <ul className="flex space-x-2">
              <li>
                <Link href="/login">Login</Link>
              </li>
              <span className="text-indigo-600">|</span>
              <li>
                <Link href="/register">Register</Link>
              </li>
            </ul>
          )}
        </ul>

        {/* Hamburger Icon - Mobile */}
        <button
          className="md:hidden text-indigo-700 text-xl"
          onClick={() => setIsMobileOpen(true)}
        >
          ☰
        </button>
      </nav>

      {/* Sidebar itself */}
      <CartSidebar
        isOpen={isCartOpen}
        items={[
          {
            id: 1,
            name: "ASUS TUF Gaming VG259Q3A Monitor",
            imageUrl: "/images/ASUS TUF VG259Q3A Full HD 24.5.jpg",
            price: 299,
          },
          {
            id: 2,
            name: "Intel Core i5-14400 Processor",
            imageUrl: "/images/Intel Core i5-14400F.jpg",
            price: 220,
          },
          {
            id: 3,
            name: "CyberPowerPC Gamer Master Desktop",
            imageUrl: "/images/CyberPowerPC Gamer Master Gaming PC.jpg",
            price: 1200,
          },
          {
            id: 4,
            name: "GIGABYTE GeForce RTX 5060",
            imageUrl: "/images/GIGABYTE GeForce RTX 5060.jpg",
            price: 450,
          },
        ]}
        onRemove={(id) => console.log("Remove item", id)}
        onClose={() => setIsCartOpen(false)}
      />

      {/* Cart Sidebar (hidden by default) */}
      {isCartOpen && (
        <>
          {/* Overlay behind cart sidebar */}
          <div
            className="fixed inset-0 bg-gradient-to-l from-black/70 to-transparent z-40 transition-opacity duration-300 ease-in-out"
            onClick={() => setIsCartOpen(false)}
          />
        </>
      )}
    </>
  );
}
