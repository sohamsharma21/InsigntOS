"use client";

import { DataProvider } from "@/context/data-context";
import { Sidebar } from "@/components/sidebar";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <DataProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 ml-[200px] grid-bg">
          {children}
        </main>
      </div>
    </DataProvider>
  );
}
