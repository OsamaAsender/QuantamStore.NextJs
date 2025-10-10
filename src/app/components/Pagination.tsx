"use client";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { PaginationProps } from "../types/pagination";

function renderPageNumbers(current: number, totalPages: number): (number | string)[] {
  const pages: (number | string)[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 4) pages.push("...");

    const start = Math.max(2, current - 1);
    const end = Math.min(totalPages - 1, current + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (current < totalPages - 3) pages.push("...");
    pages.push(totalPages);
  }

  return pages;
}

export default function Pagination({ page, total, pageSize, setPage }: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
      {/* First Button */}
      <button
        onClick={() => setPage(1)}
        disabled={page === 1}
        className="px-3 py-1 rounded border bg-white text-gray-700 border-gray-300 hover:bg-gray-100 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FontAwesomeIcon icon={faAnglesLeft} />
      </button>

      {/* Page Numbers */}
      {renderPageNumbers(page, totalPages).map((item, index) =>
        typeof item === "number" ? (
          <button
            key={index}
            onClick={() => setPage(item)}
            className={`px-3 py-1 rounded border ${
              item === page
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 transition cursor-pointer"
            }`}
          >
            {item}
          </button>
        ) : (
          <span key={index} className="px-3 py-1 text-gray-500">
            {item}
          </span>
        )
      )}

      {/* Last Button */}
      <button
        onClick={() => setPage(totalPages)}
        disabled={page === totalPages}
        className="px-3 py-1 rounded border bg-white text-gray-700 border-gray-300 hover:bg-gray-100 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FontAwesomeIcon icon={faAnglesRight} />
      </button>
    </div>
  );
}
