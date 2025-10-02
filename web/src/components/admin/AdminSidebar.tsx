"use client";

import { useSidebar } from "@/context/SidebarContext";
import {
  CalendarIcon,
  ChartBarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CogIcon,
  HomeIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: HomeIcon },
  { name: "Meals", href: "/admin/meals", icon: ShoppingBagIcon },
  { name: "Carousel", href: "/admin/carousel", icon: ChartBarIcon },
  { name: "Orders", href: "/admin/orders", icon: ChartBarIcon },
  { name: "Users", href: "/admin/users", icon: UserGroupIcon },
  { name: "Subscriptions", href: "/admin/subscriptions", icon: CalendarIcon },
  { name: "Settings", href: "/admin/settings", icon: CogIcon },
];

export default function AdminSidebar() {
  const { isOpen, isCollapsed, closeSidebar, toggleCollapse } = useSidebar();
  const pathname = usePathname();

  return (
    <>
      {/* Mobile sidebar overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Dark overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={closeSidebar}
        />

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-orange-600">FitMeal Admin</h1>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={closeSidebar}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeSidebar}
                  className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-orange-100 text-orange-700 border-r-2 border-orange-500"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${
                      isActive
                        ? "text-orange-500"
                        : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div
        className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col transition-all duration-300 ease-in-out ${
          isCollapsed ? "lg:w-16" : "lg:w-64"
        }`}
      >
        <div className="flex min-h-0 flex-1 flex-col bg-white border-r border-gray-200 shadow-sm">
          {/* Header with collapse button */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            {!isCollapsed && (
              <h1 className="text-xl font-bold text-orange-600 transition-opacity duration-200">
                FitMeal Admin
              </h1>
            )}
            <button
              type="button"
              className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors ml-auto"
              onClick={toggleCollapse}
            >
              {isCollapsed ? (
                <ChevronRightIcon className="h-5 w-5" />
              ) : (
                <ChevronLeftIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-orange-100 text-orange-700 border-r-2 border-orange-500"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  } ${isCollapsed ? "justify-center" : ""}`}
                  title={isCollapsed ? item.name : ""}
                >
                  <item.icon
                    className={`h-5 w-5 flex-shrink-0 transition-colors ${
                      isActive
                        ? "text-orange-500"
                        : "text-gray-400 group-hover:text-gray-500"
                    } ${isCollapsed ? "" : "mr-3"}`}
                  />
                  {!isCollapsed && (
                    <span className="transition-opacity duration-200">
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
