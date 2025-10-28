"use client";

import { useEffect, useState } from "react";
import { Product } from "../types/product";
import SelectFilter from "../components/SelectFilter";
import SearchInput from "../components/SearchInput";
import { handleAddToCart } from "@/utils/Cart";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";

type CategoryOption = { value: string; label: string };

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [category, setCategory] = useState<CategoryOption>({
    value: "",
    label: "All Categories",
  });

  const pageSizeOptions = [
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
  ];
  const [pageSizeOption, setPageSizeOption] = useState(pageSizeOptions[0]);
  const pageSize = parseInt(pageSizeOption.value);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://localhost:7227/api/categories/dropdown"
        );
        const data: { label: string; value: number | string }[] =
          await res.json();
        console.log("Fetched categories:", data);
        const options = data.map((c) => ({
          label: c.label,
          value: typeof c.value === "string" ? parseInt(c.value) : c.value,
        }));

        setCategories([{ value: "", label: "All Categories" }, ...options]);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fetchProducts = async () => {
        try {
          const res = await fetch(
            `https://localhost:7227/api/products?page=${page}&pageSize=${pageSize}&search=${search}&categoryId=${category.value}`
          );
          const data = await res.json();
          setProducts(data.products);
          setTotal(data.total);
        } catch (err) {
          console.error("Failed to fetch products", err);
        }
      };

      fetchProducts();
    }, 300);

    return () => clearTimeout(timeout);
  }, [page, pageSize, search, category]);

  return (
    <div className="container mx-auto bg-white p-10 my-5 fade-in">
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        {/* Sidebar Filter */}
        <aside className="bg-gray-50 p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Filters</h2>

          <SelectFilter
            label="Category"
            options={categories}
            value={category}
            onChange={(selected) => {
              setCategory(selected || { value: "", label: "All Categories" });
              setPage(1); // Reset pagination on filter change
            }}
          />

          {/* Add more filters here */}
        </aside>

        {/* Main Content */}
        <main>
          <div className="mb-6 grid grid-cols-1 md:grid-cols-[80%_20%] gap-4 items-center ">
            {/* Search Input */}
            <SearchInput
              value={search}
              onChange={(val) => {
                setSearch(val);
                setPage(1);
              }}
              placeholder="Search products..."
            />

            {/* Page Size Filter */}
            <SelectFilter
              label="Page Size"
              options={pageSizeOptions}
              value={pageSizeOption}
              onChange={(selected) => {
                if (selected) setPageSizeOption(selected);
              }}
              hideLabel={false}
            />
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination
            page={page}
            total={total}
            pageSize={pageSize}
            setPage={setPage}
          />
        </main>
      </div>
    </div>
  );
}
