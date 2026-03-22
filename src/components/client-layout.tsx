"use client";

import { DataProvider } from "@/context/data-context";
import { Sidebar } from "@/components/sidebar";
import { usePathname } from "next/navigation";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  return (
    <DataProvider>
      {isLandingPage ? (
        <main className="grid-bg min-h-screen relative">{children}</main>
      ) : (
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-[200px] grid-bg">
            {children}
          </main>
        </div>
      )}
    </DataProvider>
  );
}
