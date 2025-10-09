"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AuthProvider } from "../../context/AuthContext";
import { Toaster } from "react-hot-toast";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-slate-100">
        {!isAdminRoute && <Navbar />}
        <Toaster position="top-right" reverseOrder={false} />
        <main className="flex-grow">{children}</main>
        {!isAdminRoute && <Footer />}
      </div>
    </AuthProvider>
  );
}
