"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { SearchInputProps } from "../types/inputs";
import { Product } from "../types/product";
import { apiRequest } from "@/utils/api";
import { API_ENDPOINTS, buildUrl } from "@/config/api";

export default function SearchInput({
  value,
  onChange,
  placeholder = "What are you looking for?",
}: SearchInputProps) {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(buildUrl(API_ENDPOINTS.CATEGORIES_DROPDOWN));
        const data = await res.json();
        setCategories([
          { id: 0, name: "All Categories" },
          ...data.map((c: { value: number; label: string }) => ({
            id: c.value,
            name: c.label,
          })),
        ]);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setCategories([{ id: 0, name: "All Categories" }]);
      }
    }
    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    if (!value.trim()) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const categoryParam = selectedCategory !== 0 ? `&categoryId=${selectedCategory}` : "";
        const data = await apiRequest<Product[]>(
          `${API_ENDPOINTS.PRODUCTS}/search?q=${value}${categoryParam}`
        );
        setResults(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [value, selectedCategory]);

  return (
    <div className="relative w-full">
      {/* Input container */}
      <div className="flex items-center w-full bg-white rounded-full border border-gray-300 shadow-sm overflow-hidden mt-5 py-1 focus-within:border-indigo-500">
        {/* Category Select */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(Number(e.target.value))}
          className="appearance-none bg-transparent text-gray-700 font-semibold px-6 py-2 focus:outline-none cursor-pointer"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-300" />

        {/* Search Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 py-2 px-4 focus:outline-none text-sm placeholder:text-center"
        />

        {/* Search Icon */}
        <button
          type="button"
          className="px-4 text-gray-500 hover:text-indigo-600 transition"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      {/* Results dropdown */}
      {value && (loading || results.length > 0) && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 w-full bg-white shadow-lg rounded mt-2 z-50 p-4 transition-opacity duration-200"
        >
          {loading ? (
            <p className="text-gray-500 text-center">Searching...</p>
          ) : (
            <>
              <p className="text-gray-500 text-sm mb-3">Related Products</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={() => setResults([])}
                    className="flex flex-col items-center text-center transition-transform duration-300 transform hover:scale-105 p-2 rounded cursor-pointer"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-50 h-50 object-contain mb-2 transition-transform duration-300 group-hover:scale-105"
                    />
                    <p className="text-sm font-medium group-hover:text-indigo-600 transition">
                      {product.name}
                    </p>
                    <p className="text-indigo-600 font-bold">{product.price} JD</p>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
