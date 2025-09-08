"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useShopStore } from "@/store/useShopStore";
import Header from "./Header";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useShopStore();

  useEffect(() => {
    // Allow access to login and signup pages without authentication
    if (pathname === "/login" || pathname === "/signup") {
      return;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, pathname, router]);

  // Show login/signup pages if not authenticated
  if (!isAuthenticated && pathname !== "/login" && pathname !== "/signup") {
    return null;
  }

  // Show login and signup pages directly without header
  if (pathname === "/login" || pathname === "/signup") {
    return <>{children}</>;
  }

  // Show authenticated layout
  return (
    <>
      <Header />
      <div className="mx-auto max-w-6xl px-4 py-6">{children}</div>
    </>
  );
}
