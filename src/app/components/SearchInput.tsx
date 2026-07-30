"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { SearchInputProps } from "../types/inputs";

export default function SearchInput({
  value,
  onChange,
  placeholder = "What are you looking for?",
}: SearchInputProps) {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch categories from your API
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories"); // adjust endpoint
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        // fallback example data
        setCategories([
          { id: 1, name: "All Categories" },
          { id: 2, name: "Electronics" },
          { id: 3, name: "Fashion" },
          { id: 4, name: "Books" },
          { id: 5, name: "Home" },
        ]);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div className="flex items-center w-full bg-white rounded-full border border-gray-300 shadow-sm overflow-hidden mt-5 py-2">
      {/* Category Select */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="appearance-none bg-transparent text-gray-700 font-semibold pl-4 pr-6 py-2 focus:outline-none cursor-pointer"
      >
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Divider */}
      <div className="h-6 w-px bg-gray-300 " />

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
  );
}
