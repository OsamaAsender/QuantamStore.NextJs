// app/components/AdminNavbar.tsx
"use client";

import Link from "next/link";

export default function AdminNavbar() {
  return (
   <header className="bg-white py-4 shadow-sm flex items-center w-full">
      <nav className="flex gap-10 text-sm font-medium text-gray-700">
        <div className="px-20">
          <Link href="/" className="hover:text-indigo-600 transition">
            To Client Side →
          </Link>
        </div>
      </nav>
   </header>
   
  );
}
