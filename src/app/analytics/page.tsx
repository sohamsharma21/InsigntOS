"use client";

import { useData } from "@/context/data-context";
import { TrendLineChart } from "@/components/charts/line-chart";
import { CategoryBarChart } from "@/components/charts/bar-chart";
import { DistributionPieChart } from "@/components/charts/pie-chart";
import { RegionalComparison } from "@/components/charts/regional-comparison";
import Link from "next/link";

export default function AnalyticsPage() {
  const { isDataLoaded } = useData();

  if (!isDataLoaded) {
    return (
      <div className="p-5">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[12px] text-[#888]">Analytics</span>
        </div>
        <div className="flex flex-col items-center justify-center py-24">
          <p className="text-[11px] text-[#444] font-mono">NO DATA LOADED</p>
          <Link href="/" className="text-[10px] text-[#555] hover:text-[#888] font-mono mt-2 transition-colors">
            [GO TO DASHBOARD]
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="text-[12px] text-[#888]">Analytics</span>
        <span className="text-[10px] text-[#333] font-mono">|</span>
        <span className="text-[10px] text-[#444] font-mono">Visual analysis</span>
      </div>

      {/* Trend - full width */}
      <div className="border border-[#222] bg-[#111]/80 backdrop-blur-sm hover-glow-cyan panel-glow transition-all rounded-[1px]">
        <div className="px-3 py-1.5 border-b border-[#1c1c1c]">
          <span className="text-[10px] text-[#555] font-mono uppercase">Trend · Time Series</span>
        </div>
        <div className="p-3">
          <TrendLineChart />
        </div>
      </div>

      {/* Two charts side by side */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="border border-[#222] bg-[#111]/80 backdrop-blur-sm hover-glow-purple panel-glow transition-all rounded-[1px]">
          <div className="px-3 py-1.5 border-b border-[#1c1c1c]">
            <span className="text-[10px] text-[#555] font-mono uppercase">Comparison · Categories</span>
          </div>
          <div className="p-3">
            <CategoryBarChart />
          </div>
        </div>

        <div className="border border-[#222] bg-[#111]/80 backdrop-blur-sm hover-glow-amber panel-glow transition-all rounded-[1px]">
          <div className="px-3 py-1.5 border-b border-[#1c1c1c]">
            <span className="text-[10px] text-[#555] font-mono uppercase">Distribution · Proportional</span>
          </div>
          <div className="p-3">
            <DistributionPieChart />
          </div>
        </div>
      </div>

      {/* Regional comparison */}
      <div className="border border-[#222] bg-[#111]/80 backdrop-blur-sm hover-glow-emerald panel-glow transition-all rounded-[1px]">
        <div className="px-3 py-1.5 border-b border-[#1c1c1c]">
          <span className="text-[10px] text-[#555] font-mono uppercase">Breakdown · Group Performance</span>
        </div>
        <div className="p-2">
          <RegionalComparison />
        </div>
      </div>
    </div>
  );
}
