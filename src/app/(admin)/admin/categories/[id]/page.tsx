"use client";

import { useState, useEffect } from "react";
import BackButton from "@/components/BackButton";
import SelectFilter from "@/components/SelectFilter";
import SearchInput from "@/components/SearchInput";
import Pagination from "@/components/Pagination";
import SoftDeleteModal from "@/components/SoftDeleteModal";
import CreateModal from "@/components/CreateModal";
import EditModal from "@/components/EditModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  createProductSchema,
  editProductSchema,
  EditProductInput,
} from "@/schemas/product";
import { Product } from "@/types/product";

export default function CategoryDetails({
  params,
}: {
  params: { id: string };
}) {
  const categoryId = params.id; // from route /categories/[id]
  const [category, setCategory] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const pageSizeOptions = [
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
  ];
  const [pageSizeOption, setPageSizeOption] = useState(pageSizeOptions[0]);
  const pageSize = parseInt(pageSizeOption.value);

  // Fetch category details
  useEffect(() => {
    fetch(`https://localhost:7227/api/categories/${categoryId}`)
      .then((res) => res.json())
      .then((data) => setCategory(data));
  }, [categoryId]);

  // Fetch products scoped to this category
  const fetchProducts = () => {
    fetch(
      `https://localhost:7227/api/products?page=${page}&pageSize=${pageSize}&search=${search}&categoryId=${categoryId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotal(data.total);
      });
  };

  useEffect(() => {
    const timeout = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timeout);
  }, [page, pageSize, search, categoryId]);

  const handleEditSuccess = async () => {
    fetchProducts();
  };

  return (
    <div className="p-6 fade-in">
      <BackButton />

      {category && (
        <div className="bg-white rounded shadow p-6 my-6">
          <h1 className="text-2xl font-bold">{category.name}</h1>
          <p className="text-gray-600">
            {category.description ?? "No description"}
          </p>
          {category.imageUrl && (
            <img
              src={category.imageUrl}
              alt={category.name}
              className="w-48 mt-4"
            />
          )}
        </div>
      )}

      <div className="bg-white flex flex-col rounded shadow p-6 my-6">
        {/* Filters + Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 mb-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-700">Search Products</h2>
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search by name"
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

        {/* Products Table */}
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
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
                <td className="p-3">{product.stockQuantity}</td>
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

      {/* Delete Modal */}
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

      {/* Edit Modal */}
      {showEditModal && editProductId !== null && (
        <EditModal<EditProductInput>
          itemId={String(editProductId)}
          endpoint="https://localhost:7227/api/products"
          schema={editProductSchema}
          fields={[
            { name: "name", label: "Name", type: "text" },
            { name: "description", label: "Description", type: "textarea" },
            { name: "price", label: "Price", type: "number" },
            { name: "stockQuantity", label: "Stock", type: "number" },
            { name: "image", label: "Product Image", type: "file" },
          ]}
          onClose={() => {
            setShowEditModal(false);
            setEditProductId(null);
          }}
          onSuccess={handleEditSuccess}
        />
      )}

      {/* Create Modal */}
      {showCreate && (
        <CreateModal
          endpoint="https://localhost:7227/api/products"
          schema={createProductSchema}
          fields={[
            { name: "name", label: "Name", type: "text" },
            { name: "description", label: "Description", type: "textarea" },
            { name: "price", label: "Price", type: "number" },
            {
              name: "stockQuantity",
              label: "Stock",
              type: "number",
              default: 0,
            },
            { name: "image", label: "Product Image", type: "file" },
            {
              name: "categoryId",
              label: "Category",
              type: "hidden",
              default: categoryId,
            },
          ]}
          onClose={() => setShowCreate(false)}
          onSuccess={fetchProducts}
        />
      )}
    </div>
  );
} 
