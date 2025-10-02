import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminProtection from "@/components/AdminProtection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FitMeal Admin Dashboard",
  description: "Admin panel for FitMeal fitness meal delivery app",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProtection>
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar />
        <div className="lg:pl-64">
          <AdminHeader />
          <main className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminProtection>
  );
}
