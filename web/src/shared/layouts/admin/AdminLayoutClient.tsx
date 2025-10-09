"use client";

import { useSidebar } from "@/context/SidebarContext";
import { useEffect, useState } from "react";

interface AdminLayoutClientProps {
  children: React.ReactNode;
}

export default function AdminLayoutClient({
  children,
}: AdminLayoutClientProps) {
  const { isCollapsed } = useSidebar();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="lg:pl-64 transition-all duration-300 ease-in-out">
        {children}
      </div>
    );
  }

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        isCollapsed ? "lg:pl-16" : "lg:pl-64"
      }`}
    >
      {children}
    </div>
  );
}
