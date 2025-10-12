"use client";
import { useEffect, useState } from "react";
import SearchInput from "../../../components/SearchInput";
import SelectFilter from "../../../components/SelectFilter";
import Pagination from "../../../components/Pagination";
import CreateModal from "../../../components/CreateModal";
import EditModal from "../../../components/EditModal";
import SoftDeleteModal from "../../../components/SoftDeleteModal";
import BackButton from "../../../components/BackButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  createCategorySchema,
  editCategorySchema,
  EditCategoryInput,
} from "@/schemas/category";
import { Category } from "@/app/types/category";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState({ value: "active", label: "Active" });
  const [showCreate, setShowCreate] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  const pageSizeOptions = [
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
  ];
  const [pageSizeOption, setPageSizeOption] = useState(pageSizeOptions[0]);
  const pageSize = parseInt(pageSizeOption.value);

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "deleted", label: "Deleted" },
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetch(
        `https://localhost:7227/api/categories?page=${page}&pageSize=10&search=${search}&status=${status.value}`
      )
        .then((res) => res.json())
        .then((data) => {
          setCategories(data.categories as Category[]);
          setTotal(data.total);
        });
    }, 300);
    return () => clearTimeout(timeout);
  }, [page, search, status]);

  const handleEditSuccess = async () => {
    fetch(
      `https://localhost:7227/api/categories?page=${page}&pageSize=10&search=${search}&status=${status.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories);
        setTotal(data.total);
      });
  };

  return (
    <div className="p-6 fade-in">
      <BackButton />
      <div className="bg-white rounded shadow p-6 flex flex-col gap-6 my-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-6 mb-6">
          {/* Status Filter */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-700">Status Filter</h2>
            <SelectFilter
              label="Status"
              options={statusOptions}
              value={status}
              onChange={setStatus}
            />
          </div>
          {/* Category Search */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-700">
              Search Categories
            </h2>
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search categories"
            />
          </div>
          {/* Actions */}
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
              + Create Category
            </button>
          </div>
        </div>

        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="p-3 text-left">Id</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{cat.id}</td>
                <td className="p-3">{cat.name}</td>
                <td className="p-3">
                  {cat.description || (
                    <span className="text-gray-400">No description</span>
                  )}
                </td>
                <td className="p-3 hover:cursor-pointer">
                  {cat.imageUrl ? (
                    <img
                      src={cat.imageUrl}
                      alt={cat.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </td>
                <td className="p-3 text-center space-x-4">
                  <button
                    onClick={() => {
                      setEditCategoryId(cat.id);
                      setShowEditModal(true);
                    }}
                    className="p-1 hover:bg-gray-300 rounded-full cursor-pointer transition"
                    title="Edit Category"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategoryId(cat.id);
                      setShowModal(true);
                    }}
                    className="p-1 hover:text-red-600 hover:bg-red-300 rounded-full cursor-pointer transition"
                    title="Delete Category"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination page={page} total={total} pageSize={10} setPage={setPage} />
      </div>

      <SoftDeleteModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedCategoryId(null);
        }}
        onConfirm={async () => {
          if (!selectedCategoryId) return;
          const res = await fetch(
            `https://localhost:7227/api/categories/${selectedCategoryId}`,
            { method: "DELETE" }
          );
          if (!res.ok) throw new Error("Delete failed");

          setCategories((prev) =>
            prev.filter((c) => c.id !== selectedCategoryId)
          );
          setTotal((prev) => prev - 1);
        }}
        entityName="category"
        displayName={
          categories.find((c) => c.id === selectedCategoryId)?.name ?? ""
        }
      />

      {showEditModal && editCategoryId !== null && (
        <EditModal<EditCategoryInput>
          itemId={String(editCategoryId)}
          endpoint="https://localhost:7227/api/categories"
          schema={editCategorySchema}
          fields={[
            { name: "name", label: "Name", type: "text" },
            { name: "description", label: "Description", type: "textarea" },
            { name: "image", label: "Category Image", type: "file" },
          ]}
          onClose={() => {
            setShowEditModal(false);
            setEditCategoryId(null);
          }}
          onSuccess={handleEditSuccess}
        />
      )}

      {showCreate && (
        <CreateModal
          endpoint="/api/categories"
          schema={createCategorySchema}
          fields={[
            { name: "name", label: "Name", type: "text" },
            { name: "description", label: "Description", type: "textarea" },
            { name: "image", label: "Category Image", type: "file" },
          ]}
          onClose={() => setShowCreate(false)}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
}
