"use client";
import { useEffect, useState } from "react";
import SelectFilter from "../../../components/SelectFilter";
import { Option } from "../../../types/filters";
import SearchInput from "../../../components/SearchInput";
import SoftDeleteModal from "../../../components/SoftDeleteModal";
import Pagination from "../../../components/Pagination";
import { registerSchema } from "@/schemas/registerSchema"; // reuse your existing Zod schema
import CreateModal from "../../../components/CreateModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faTrash,
  faPlus,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import BackButton from "../../../components/BackButton";
import EditModal from "@/app/components/EditModal";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/app/types/user";
import {
  createUserSchema,
  EditUserInput,
  editUserSchema,
} from "@/schemas/user";

export default function UsersPage() {
  const [users, setUsers] = useState<
    { id: number; username: string; email: string; role: string }[]
  >([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [showCreate, setShowCreate] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const roleOptions = [
    { value: "", label: "All Roles" },
    { value: "Admin", label: "Admin" },
    { value: "Customer", label: "Customer" },
  ];
  const [role, setRole] = useState<Option | null>(roleOptions[0]);

  const pageSizeOptions: Option[] = [
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
    { value: "100", label: "100" },
  ];
  const [pageSizeOption, setPageSizeOption] = useState<Option | null>(
    pageSizeOptions[0]
  );
  const pageSize = parseInt(pageSizeOption?.value || "10");

  const [showEditModal, setShowEditModal] = useState(false);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  // Fetch users with debounce on search
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetch(
        `https://localhost:7227/api/users?page=${page}&pageSize=${pageSize}&search=${search}&role=${
          role?.value || ""
        }
`
      )
        .then((res) => res.json())
        .then((data) => {
          setUsers(data.users);
          setTotal(data.total);
        });
    }, 300);
    return () => clearTimeout(timeout);
  }, [page, pageSize, search, role]);

  // Initial fetch (redundant with search, but kept for clarity)
  useEffect(() => {
    fetch(`https://localhost:7227/api/users?page=${page}&pageSize=${pageSize}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setTotal(data.total);
      });
  }, [page, pageSize]);

  const handleEditSuccess = async (updated: EditUserInput) => {
    // Re-fetch the full user by ID after update
    const res = await fetch(`https://localhost:7227/api/users/${editUserId}`);
    const fresh: User = await res.json();

    refreshUser(fresh); // navbar updates instantly

    // Re-fetch the full list to update the table
    fetch(
      `https://localhost:7227/api/users?page=${page}&pageSize=${pageSize}&search=${search}&role=${
        role?.value || ""
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setTotal(data.total);
      });
  };

  return (
    <div className="p-6 fade-in">
      <BackButton />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
        {/* Sessions */}
        <div className="bg-white shadow rounded p-4 hover:shadow-lg transition">
          <h2 className="text-sm font-medium text-gray-500">Sessions</h2>
          <p className="text-2xl font-bold text-gray-800">21,459</p>
          <p className="text-green-600 text-sm mt-1">+3.2% from last week</p>
        </div>

        {/* Paid Users */}
        <div className="bg-white shadow rounded p-4 hover:shadow-lg transition">
          <h2 className="text-sm font-medium text-gray-500">Paid Users</h2>
          <p className="text-2xl font-bold text-gray-800">4,567</p>
          <p className="text-green-600 text-sm mt-1">+6.8% from last week</p>
        </div>

        {/* Active Users */}
        <div className="bg-white shadow rounded p-4 hover:shadow-lg transition">
          <h2 className="text-sm font-medium text-gray-500">Active Users</h2>
          <p className="text-2xl font-bold text-gray-800">19,680</p>
          <p className="text-red-600 text-sm mt-1">-1.0% from last week</p>
        </div>

        {/* Pending Users */}
        <div className="bg-white shadow rounded p-4 hover:shadow-lg transition">
          <h2 className="text-sm font-medium text-gray-500">Pending Users</h2>
          <p className="text-2xl font-bold text-gray-800">237</p>
          <p className="text-green-600 text-sm mt-1">+4.2% from last week</p>
        </div>
      </div>

      <div className="bg-white flex flex-col rounded shadow p-6">
        <div className=" grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-6 rounded p-6 mb-6">
          {/* Filter Section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-700">Search Filter</h2>
            <SelectFilter
              label="Role"
              options={roleOptions}
              value={role}
              onChange={setRole}
            />
          </div>

          {/* Search Section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-700">User Management</h2>
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search by username, email, or role"
            />
          </div>

          {/* Action Section */}
          <div className="flex flex-col gap-4">            <h2 className="text-xl font-bold text-gray-700">Actions</h2>

            <SelectFilter
              label="Show entries"
              options={pageSizeOptions}
              value={pageSizeOption}
              onChange={(selected) => {
                if (selected) setPageSizeOption(selected);
              }}
            />

            <button
              onClick={() => setShowCreate(true)} // open modal
              className="bg-indigo-600 text-white text-sm px-4 py-2 rounded hover:bg-indigo-700 cursor-pointer transition"
            >
              + Create Product
            </button>
          </div>
        </div>
        <hr className="text-slate-300" />
        {/* Table Section */}
        <div className="overflow-x-auto rounded my-6 ">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Username</th>
                <th className="p-3 text-left hidden sm:table-cell">Email</th>
                <th className="p-3 text-left hidden md:table-cell">Role</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50 fade-in">
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.username}</td>
                  <td className="p-3 hidden sm:table-cell">{user.email}</td>
                  <td className="p-3 hidden md:table-cell">{user.role}</td>
                  <td className="p-3 text-center space-x-4">
                    <a
                      href={`/admin/users/${user.id}`}
                      className="p-1 hover:bg-gray-300 rounded-full transition"
                      title="View Details"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </a>
                    <button
                      onClick={() => {
                        setEditUserId(user.id);
                        setShowEditModal(true);
                      }}
                      className="p-1 hover:bg-gray-300 rounded-full cursor-pointer transition"
                      title="Edit User"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedUserId(user.id);
                        setShowModal(true);
                      }}
                      className="p-1 hover:text-red-600 hover:bg-red-300 rounded-full transition cursor-pointer"
                      title="Delete User"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr className="text-slate-300" />
          <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
            {/* Page Numbers */}
            <Pagination
              page={page}
              total={total}
              pageSize={pageSize}
              setPage={setPage}
            />
          </div>
        </div>
      </div>

      <SoftDeleteModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedUserId(null);
        }}
        onConfirm={async () => {
          if (!selectedUserId) return;
          const res = await fetch(
            `https://localhost:7227/api/users/${selectedUserId}`,
            { method: "DELETE" }
          );
          if (!res.ok) throw new Error("Delete failed");

          // optimistic UI update
          setUsers((prev) => prev.filter((u) => u.id !== selectedUserId));
          setTotal((prev) => prev - 1);
        }}
        entityName="user"
        displayName={users.find((u) => u.id === selectedUserId)?.username ?? ""}
      />
      {showEditModal && editUserId !== null && (
        <EditModal<EditUserInput>
          itemId={String(editUserId)}
          endpoint="https://localhost:7227/api/users"
          schema={editUserSchema} // still fine — it validates only the editable fields
          fields={[
            { name: "username", label: "Username", type: "text" },
            { name: "email", label: "Email", type: "email" },
            {
              name: "role",
              label: "Role",
              type: "select",
              options: ["Admin", "Customer"],
            },
          ]}
          onClose={() => {
            setShowEditModal(false);
            setEditUserId(null);
          }}
          onSuccess={handleEditSuccess}
        />
      )}

      {showCreate && (
        <CreateModal
          endpoint="/api/users"
          schema={registerSchema}
          fields={[
            { name: "username", label: "Username", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "password", label: "Password", type: "password" },
            {
              name: "role",
              label: "Role",
              type: "select",
              options: ["Admin", "Customer"],
              default: "Customer",
            },
          ]}
          onClose={() => setShowCreate(false)}
          onSuccess={() => {
            /* re-fetch list after creation */
            fetch(
              `https://localhost:7227/api/users?page=${page}&pageSize=${pageSize}&search=${search}&role=${
                role?.value || ""
              }`
            )
              .then((res) => res.json())
              .then((data) => {
                setUsers(data.users);
                setTotal(data.total);
              });
          }}
        />
      )}
    </div>
  );
}
