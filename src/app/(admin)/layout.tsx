// app/(admin)/layout.tsx
import AdminSidebar from "@/app/components/AdminSidebar"; // adjust path if needed
import AdminNavbar from "../components/AdminNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex font-sans bg-gray-100">
      <AdminSidebar />
      <div className="flex flex-col h-screen w-screen">
        <AdminNavbar />
        <main className="flex-grow p-6">{children}</main>
      </div>
    </div>
  );
}
