// app/components/AdminSidebar.tsx
"use client";

import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="min-w-64 bg-white shadow-md px-6 py-8 fade-in">
      <h2 className="text-xl font-bold text-indigo-600 mb-6">
        Admin Dashboard
      </h2>
      <nav className="flex flex-col gap-4 text-gray-700 font-mono">
        <Link href="/admin/dashboard" className="hover:text-indigo-600 transition">
          Dashboard
        </Link>
        <Link href="/admin/users" className="hover:text-indigo-600 transition">
          Users
        </Link>
        <Link href="/admin/products" className="hover:text-indigo-600 transition">
          Products
        </Link>
        <Link href="/admin/categories" className="hover:text-indigo-600 transition">
          Categories
        </Link>
        <Link href="/admin/orders" className="hover:text-indigo-600 transition">
          Orders
        </Link>
        <Link href="/admin/Settings" className="hover:text-indigo-600 transition">
          Settings
        </Link>
      </nav>
    </aside>
  );
}
