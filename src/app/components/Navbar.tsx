"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faChevronDown,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import CartSidebar from "./CartSidebar";
import { apiRequest } from "@/utils/api";
import { API_ENDPOINTS } from "@/config/api";
import SearchInput from "./SearchInput";
import SelectFilter from "./SelectFilter";
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

const categories = [
  {
    name: "Console",
    subcategories: ["PlayStation", "Xbox", "Nintendo", "Consoles"],
  },
  {
    name: "Gaming Accessories",
    subcategories: [
      "Headset",
      "Keyboards",
      "Mouse",
      "Mousepad",
      "Controllers",
      "Earphone",
      "Speakers",
    ],
  },
  {
    name: "Streaming",
    subcategories: ["Microphones", "Webcams", "Capture Cards", "Lighting"],
  },
  {
    name: "PC & Laptop Zone",
    subcategories: ["Laptops", "PCs", "Components", "Monitors"],
  },
  {
    name: "Simulators",
    subcategories: ["Racing", "Flight", "Farming"],
  },
  {
    name: "Gaming Chairs & Desk",
    subcategories: ["Chairs", "Desks", "Accessories"],
  },
  {
    name: "Lights",
    subcategories: ["LED Strips", "Lamps", "Smart Lighting"],
  },
  {
    name: "Collectables",
    subcategories: ["Figures", "Posters", "Apparel"],
  },
];

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { count } = useCart();
  const [search, setSearch] = useState("");

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hasScrolled = window.scrollY > 50;
      setScrolled(hasScrolled);
      if (hasScrolled) setShowSubMenu(false);
      else setShowSubMenu(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      await apiRequest(API_ENDPOINTS.AUTH_LOGOUT, { method: "POST" });
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
      <nav className="bg-white font-mono px-4 py-3">
        <div className=" mx-auto flex items-center justify-between container">
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
                    <Link
                      href="/register"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

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
              <Link href="/about" className="hover:text-indigo-600 transition">
                About Us
              </Link>
            </li>
          </ul>

          <p className="text-sm text-gray-500">
            Free Shipping for Orders above 100jds
          </p>

          {/* Socials Section */}
          <div className="hidden md:flex gap-4 items-center text-indigo-700 text-lg">
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                className="hover:text-pink-500 transition"
              />
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faFacebook}
                className="hover:text-blue-600 transition"
              />
            </Link>
            <Link
              href="https://wa.me/123456789"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faWhatsapp}
                className="hover:text-green-500 transition"
              />
            </Link>
          </div>

          {/* Hamburger Icon - Mobile */}
          <button
            className="md:hidden text-indigo-700 text-xl"
            onClick={() => setIsMobileOpen(true)}
          >
            ☰
          </button>
        </div>
      </nav>
      <div className="sticky top-0 z-50">
        <header className="bg-white shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
          <div className="container mx-auto grid grid-cols-12 items-center">
          {/* Logo - 20% */}
          <div className="col-span-2 flex items-center gap-2 text-xl">
            <button
              type="button"
              onClick={() => setShowSubMenu((prev) => !prev)}
              className={`hidden md:flex items-center justify-center w-8 h-8 rounded text-gray-600 hover:text-gray-800 hover:bg-gray-100 cursor-pointer transition-all duration-300 ${
                pathname === "/"
                  ? scrolled
                    ? "opacity-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 -translate-x-4 pointer-events-none"
                  : "opacity-100 translate-x-0"
              }`}
              aria-label="Toggle categories"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <Link href="/" className="flex items-center gap-2 text-xl">
              <img
                src="/images/quantamLogo2.png"
                alt="Logo"
                className="w-8 h-8 object-contain"
              />
              Quantam
            </Link>
          </div>

          {/* Search Input - 60% */}
          <div className="col-span-8 mb-5">
            <SearchInput value={search} onChange={(val) => setSearch(val)} />
          </div>

          {/* Auth Links / Profile + Cart - 20% */}
          <div className="col-span-2 flex justify-end">
            <ul className="hidden md:flex gap-5 items-center text-gray-500">
              {isAuthenticated ? (
                <>
                  {/* Profile Dropdown */}
                  <div
                    className="relative"
                    onClick={() => setProfileOpen((prev) => !prev)}
                  >
                    <button
                      className="flex items-center gap-1 hover:text-indigo-600 transition cursor-pointer"
                      aria-expanded={profileOpen}
                      aria-controls="profile-dropdown"
                    >
                      <FontAwesomeIcon icon={faUser} />
                      {user?.username}
                    </button>

                    <div
                      id="profile-dropdown"
                      className={`absolute top-full right-0 mt-2 bg-white shadow rounded text-sm font-mono z-50 min-w-[150px] transition-all duration-300 ${
                        profileOpen
                          ? "opacity-100 visible"
                          : "opacity-0 invisible"
                      }`}
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
                    <Link
                      href="/login"
                      className="hover:text-indigo-600 transition"
                    >
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
                </ul>
              )}
            </ul>
          </div>
        </div>
      </header>
      {/* Category dropdown menu */}
      <div
        className={`relative transition-all duration-300 bg-indigo-500 text-white ${
          showSubMenu
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <ul className="container mx-auto flex justify-center gap-1 py-0">
          {categories.map((cat) => (
            <li
              key={cat.name}
              className="relative z-10 group"
              onMouseEnter={() => setActiveCategory(cat.name)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <button
                type="button"
                className="flex items-center gap-1 px-4 py-2 hover:bg-indigo-600 transition cursor-pointer"
                onClick={() =>
                  setActiveCategory(activeCategory === cat.name ? null : cat.name)
                }
              >
                {cat.name}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="text-xs transition-transform group-hover:rotate-180"
                />
              </button>

              {activeCategory === cat.name && (
                <ul className="absolute left-0 top-full bg-white text-gray-800 shadow-lg min-w-[220px] py-2 z-50 border-t-2 border-indigo-500">
                  {cat.subcategories.map((sub) => (
                    <li key={sub}>
                      <Link
                        href={`/store?category=${encodeURIComponent(sub)}`}
                        className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700 transition"
                      >
                        {sub}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      </div>
      {/* Sidebar itself */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
      {/* Cart Sidebar (hidden by default) */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-gradient-to-l from-black/70 to-transparent z-[60] transition-opacity duration-300 ease-in-out"
          onClick={() => setIsCartOpen(false)}
        />
      )}
    </>
  );
}
