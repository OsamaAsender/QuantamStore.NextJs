"use client";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faBars, faGear, faGift, faLayerGroup, faTimes , faTruckFast, faUser } from "@fortawesome/free-solid-svg-icons";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded shadow-md"
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-md px-6 py-8 z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:static sm:h-auto sm:min-w-64`}
      >
        <Link
          href="/admin"
          className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent"
        >
          Admin Panel
        </Link>

        <nav className="flex flex-col gap-4 text-gray-700 font-mono mt-6">
          <Link
            href="/admin/users"
            className="flex items-center gap-2 p-2 font-bold rounded hover:bg-gray-100 transition"
          >
            <FontAwesomeIcon icon={faUser} className="" />
            <span>Users</span>
          </Link>

          <Link
            href="/admin/products"
            className="p-2 font-bold rounded hover:bg-gray-100 transition"
          >
           <FontAwesomeIcon icon={faGift} className="mr-2" />
            Products
          </Link>
          <Link
            href="/admin/categories"
            className="p-2 font-bold rounded hover:bg-gray-100 transition"
          >
             <FontAwesomeIcon icon={faLayerGroup} className="mr-2" />
            Categories
          </Link>
          <Link
            href="/admin/orders"
            className="p-2 font-bold rounded hover:bg-gray-100 transition"
          >
            <FontAwesomeIcon icon={faTruckFast} className="mr-2" />
            Orders
          </Link>
          <Link
            href="/admin/settings"
            className="p-2 font-bold rounded hover:bg-gray-100 transition"
          >
           <FontAwesomeIcon icon={faGear} className="mr-2" />
            Settings
          </Link>
          <hr className="my-4 text-slate-300" />

          <Link
            href="/"
            className="p-2 font-bold rounded hover:bg-gray-100 transition"
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-2" />
            To Client Side 
          </Link>
        </nav>
      </aside>
    </>
  );
}
