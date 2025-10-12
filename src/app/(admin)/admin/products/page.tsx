"use client";
import { useEffect, useState } from "react";
import SelectFilter from "../../../components/SelectFilter";
import SearchInput from "../../../components/SearchInput";
import SoftDeleteModal from "../../../components/SoftDeleteModal";
import Pagination from "../../../components/Pagination";
import CreateModal from "../../../components/CreateModal";
import EditModal from "../../../components/EditModal";
import BackButton from "../../../components/BackButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Product } from "../../../types/product";
import {
  createProductSchema,
  editProductSchema,
  EditProductInput,
} from "@/schemas/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const categoryOptions = [
    { value: "", label: "All Categories" },
    { value: "Electronics", label: "Electronics" },
    { value: "Books", label: "Books" },
    { value: "Clothing", label: "Clothing" },
  ];
  const [category, setCategory] = useState(categoryOptions[0]);

  const pageSizeOptions = [
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
  ];
  const [pageSizeOption, setPageSizeOption] = useState(pageSizeOptions[0]);
  const pageSize = parseInt(pageSizeOption.value);

  // ✅ reusable fetch function
  const fetchProducts = async () => {
    const res = await fetch(
      `https://localhost:7227/api/products?page=${page}&pageSize=${pageSize}&search=${search}&categoryId=${
        category?.value ?? ""
      }`
    );
    const data = await res.json();
    setProducts(data.products);
    setTotal(data.total);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timeout);
  }, [page, pageSize, search, category]);

  const handleEditSuccess = async (updated: EditProductInput) => {
    // Optionally re-fetch the single product if you want fresh data
    if (editProductId) {
      await fetch(`https://localhost:7227/api/products/${editProductId}`);
    }

    // ✅ just reuse the same fetch logic
    await fetchProducts();
  };

  return (
    <div className="p-6 fade-in">
      <BackButton />
      <div className="bg-white flex flex-col rounded shadow p-6 my-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-6 mb-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-700">Category Filter</h2>
            <SelectFilter
              label="Category"
              options={categoryOptions}
              value={category}
              onChange={setCategory}
            />
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-700">Search Products</h2>
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search by name or category"
            />
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-700">Actions</h2>
            <SelectFilter
              label="Show entries"
              options={pageSizeOptions}
              value={pageSizeOption}
              onChange={setPageSizeOption}
            />
            <button
              onClick={() => setShowCreate(true)}
              className="bg-indigo-600 text-white text-sm px-4 py-2 rounded hover:bg-indigo-700 cursor-pointer transition"
            >
              + Create Product
            </button>
          </div>
        </div>

        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{product.id}</td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">${product.price.toFixed(2)}</td>
                <td className="p-3">{product.categoryName}</td>
                <td className="p-3 hover:cursor-pointer">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </td>
                <td className="p-3 text-center space-x-4">
                  <button
                    onClick={() => {
                      setEditProductId(product.id);
                      setShowEditModal(true);
                    }}
                    className="p-1 hover:bg-gray-300 rounded-full transition"
                    title="Edit Product"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProductId(product.id);
                      setShowModal(true);
                    }}
                    className="p-1 hover:text-red-600 hover:bg-red-300 rounded-full transition"
                    title="Delete Product"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          page={page}
          total={total}
          pageSize={pageSize}
          setPage={setPage}
        />
      </div>

      <SoftDeleteModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedProductId(null);
        }}
        onConfirm={async () => {
          if (!selectedProductId) return;
          const res = await fetch(
            `https://localhost:7227/api/products/${selectedProductId}`,
            { method: "DELETE" }
          );
          if (!res.ok) throw new Error("Delete failed");

          setProducts((prev) => prev.filter((p) => p.id !== selectedProductId));
          setTotal((prev) => prev - 1);
        }}
        entityName="product"
        displayName={
          products.find((p) => p.id === selectedProductId)?.name ?? ""
        }
      />

      {showEditModal && editProductId !== null && (
        <EditModal<EditProductInput>
          itemId={String(editProductId)}
          endpoint="https://localhost:7227/api/products"
          schema={editProductSchema}
          fields={[
            { name: "name", label: "Name", type: "text" },
            { name: "description", label: "Description", type: "textarea" },
            { name: "price", label: "Price", type: "number" },
            { name: "category", label: "Category", type: "text" },
            { name: "stock", label: "Stock", type: "number" },
            { name: "image", label: "Product Image", type: "file" },
          ]}
          onClose={() => {
            setShowEditModal(false);
            setEditProductId(null);
          }}
          onSuccess={handleEditSuccess}
        />
      )}

      {showCreate && (
        <CreateModal
          endpoint="https://localhost:7227/api/products"
          schema={createProductSchema}
          fields={[
            { name: "name", label: "Name", type: "text" },
            { name: "description", label: "Description", type: "textarea" },
            { name: "price", label: "Price", type: "number" },
            { name: "category", label: "Category", type: "text" },
            { name: "image", label: "Product Image", type: "file" },
            {
              name: "stock",
              label: "Stock",
              type: "number",
              default: 0,
            },
          ]}
          onClose={() => setShowCreate(false)}
          onSuccess={() => {
            fetch(
              `https://localhost:7227/api/products?page=${page}&pageSize=${pageSize}&search=${search}&category=${category.value}`
            )
              .then((res) => res.json())
              .then((data) => {
                setProducts(data.products);
                setTotal(data.total);
              });
          }}
        />
      )}
    </div>
  );
}
