"use client";

import { useEffect, useState } from "react";
import { Product } from "../types/product";
import SelectFilter from "../components/SelectFilter";
import SearchInput from "../components/SearchInput";
import { handleAddToCart } from "@/utils/Cart";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "next/navigation";

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
    { value: "12", label: "12" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
  ];
  const [pageSizeOption, setPageSizeOption] = useState(pageSizeOptions[0]);
  const pageSize = parseInt(pageSizeOption.value);

  const searchParams = useSearchParams();
  const initialCategorySlug = searchParams.get("category");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://localhost:7227/api/categories/dropdown"
        );
        const data: { label: string; value: number | string }[] =
          await res.json();

        const options = data.map((c) => ({
          label: c.label,
          value: typeof c.value === "string" ? parseInt(c.value) : c.value,
        }));

        const allOptions = [{ value: "", label: "All Categories" }, ...options];
        setCategories(allOptions);

        // Match query param to category label
        if (initialCategorySlug) {
          const matched = allOptions.find((opt) =>
            opt.label.toLowerCase().includes(initialCategorySlug.toLowerCase())
          );
          if (matched) {
            setCategory(matched);
          }
        }
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

  const categoryTree = [
    {
      label: "Monitors",
      subcategories: [
        "Gaming Monitors",
        "Professional Monitors",
        "Curved Monitors",
        "Ultrawide Monitors",
        "4K Monitors",
        "144Hz+ Refresh Rate",
        "G-SYNC / FreeSync",
      ],
    },
    {
      label: "Prebuilt PCs",
      subcategories: [
        "Entry-Level PCs",
        "Mid-Range Gaming PCs",
        "High-End Gaming PCs",
        "Streaming PCs",
        "Mini PCs",
        "Intel-Based",
        "AMD-Based",
      ],
    },
    {
      label: "Gaming Headsets",
      subcategories: [
        "Wired",
        "Wireless",
        "Surround Sound",
        "Noise-Canceling Mics",
        "Console-Compatible",
        "RGB Headsets",
      ],
    },
    {
      label: "Storage Devices",
      subcategories: [
        "Internal SSDs",
        "External SSDs",
        "Internal HDDs",
        "External HDDs",
        "NVMe Drives",
        "USB Flash Drives",
      ],
    },
    {
      label: "Processors",
      subcategories: [
        "Intel Core",
        "AMD Ryzen",
        "Intel Xeon",
        "Threadripper",
        "Overclockable",
        "Integrated Graphics",
      ],
    },
    {
      label: "Graphics Cards",
      subcategories: [
        "NVIDIA RTX",
        "AMD Radeon RX",
        "Entry-Level GPUs",
        "Mid-Range GPUs",
        "High-End GPUs",
        "Workstation GPUs",
      ],
    },
  ];

  return (
    <div className="container mx-auto p-5 fade-in">
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        {/* Sidebar Filter */}
        <aside className="bg-white p-4 rounded shadow w-64">
          <h2 className="text-lg font-bold mb-4">Filters</h2>

          <div className="space-y-4">
            {categoryTree.map((cat) => (
              <div key={cat.label}>
                <h3 className="font-semibold text-sm mb-1">{cat.label}</h3>
                <ul className="ml-4 space-y-1">
                  {cat.subcategories.map((sub) => (
                    <li
                      key={sub}
                      className="text-sm text-gray-700 cursor-pointer hover:underline"
                      onClick={() => {
                        setCategory({ value: sub, label: sub });
                        setPage(1); // Reset pagination
                      }}
                    >
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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
