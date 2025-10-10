// app/(admin)/layout.tsx
import AdminSidebar from "@/app/components/AdminSidebar"; // adjust path if needed
import AdminNavbar from "../components/AdminNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen font-sans bg-gray-100">
      {/* Sidebar stays fixed */}
      <AdminSidebar />

      {/* Main content scrolls, including navbar */}
      <div className="flex flex-col flex-1">
  
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
