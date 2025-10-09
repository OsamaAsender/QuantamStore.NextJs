'use client';

export default function Footer() {
  return (
    <footer className="bg-slate-100 text-gray-700 py-6 mt-10 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} QuantumStore. All rights reserved.</p>
        <div className="flex gap-4 text-sm">
          <a href="/about" className="hover:text-teal-600 transition">About</a>
          <a href="/store" className="hover:text-teal-600 transition">Store</a>
          <a href="/contact" className="hover:text-teal-600 transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
