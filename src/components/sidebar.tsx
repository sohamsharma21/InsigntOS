"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Lightbulb,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/insights", label: "Insights", icon: Lightbulb },
  { href: "/query", label: "AI Query", icon: MessageSquare },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[200px] border-r border-[#1c1c1c] bg-[#0A0A0A] flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-12 border-b border-[#1c1c1c]">
        <div className="w-[6px] h-[6px] rounded-full bg-cyan-500" />
        <span className="text-[11px] font-medium text-cyan-400/80 tracking-[0.15em] uppercase">
          InsightOS
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-2.5 py-[7px] text-[12px] transition-colors duration-100 relative",
                isActive
                  ? "text-cyan-400 bg-cyan-500/5"
                  : "text-[#555] hover:text-[#999] hover:bg-[#111]"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-[14px] bg-cyan-500" />
              )}
              <item.icon className="w-[14px] h-[14px]" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* System status */}
      <div className="px-3 py-3 border-t border-[#1c1c1c]">
        <div className="flex items-center gap-1.5">
          <div className="w-[5px] h-[5px] rounded-full bg-emerald-500 animate-pulseDot" />
          <span className="text-[10px] text-[#444] font-mono">SYSTEM ONLINE</span>
        </div>
      </div>
    </aside>
  );
}
