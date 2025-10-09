'use client';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 py-6 mt-10 shadow-inner font-mono">
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-4 sm:gap-6 md:flex-row md:items-center md:justify-between">
        {/* Copyright */}
        <p className="text-xs sm:text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} <span className="font-semibold">QuantumStore</span>. All rights reserved.
        </p>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-end gap-3 sm:gap-5 text-xs sm:text-sm">
          <a href="/about" className="hover:text-indigo-600 transition">About</a>
          <a href="/store" className="hover:text-indigo-600 transition">Store</a>
          <a href="/contact" className="hover:text-indigo-600 transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
