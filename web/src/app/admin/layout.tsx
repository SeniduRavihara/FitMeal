import AdminHeader from "@/components/admin/AdminHeader";
import AdminLayoutClient from "@/components/admin/AdminLayoutClient";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminProtection from "@/components/AdminProtection";
import { SidebarProvider } from "@/context/SidebarContext";
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
      <SidebarProvider>
        <div className="min-h-screen bg-gray-50">
          <AdminSidebar />
          <AdminLayoutClient>
            <AdminHeader />
            <main className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </AdminLayoutClient>
        </div>
      </SidebarProvider>
    </AdminProtection>
  );
}
