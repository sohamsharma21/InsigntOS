"use client";

import { useState } from "react";
import { useData } from "@/context/data-context";
import { InsightCard } from "@/components/insight-card";
import Link from "next/link";

const categoryFilters = [
  { key: "all", label: "ALL" },
  { key: "trend", label: "TREND" },
  { key: "anomaly", label: "ANOMALY" },
  { key: "prediction", label: "PREDICT" },
  { key: "optimization", label: "OPTIMIZE" },
  { key: "risk", label: "RISK" },
  { key: "opportunity", label: "OPPORT" },
];

export default function InsightsPage() {
  const {
    isDataLoaded,
    dataSummary,
    insights,
    setInsights,
    isLoadingInsights,
    setIsLoadingInsights,
  } = useData();
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const handleGenerateInsights = async () => {
    if (!dataSummary) return;
    setError("");
    setIsLoadingInsights(true);

    try {
      const response = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataSummary: JSON.stringify(dataSummary) }),
      });

      const data = await response.json();
      if (data.insights) {
        setInsights(data.insights);
      } else {
        setError("Failed to generate insights.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setIsLoadingInsights(false);
    }
  };

  const handleExport = () => {
    if (insights.length === 0) return;

    const lines = insights.map(
      (ins, i) =>
        `[${(i + 1).toString().padStart(2, "0")}] [${ins.category?.toUpperCase() || "—"}] [${ins.riskLevel.toUpperCase()}]\n    ${ins.insight}\n    → ${ins.action}`
    );

    const header = `INSIGHTOS DECISION INTELLIGENCE REPORT\n${"─".repeat(50)}\nTimestamp: ${new Date().toISOString()}\nInsights: ${insights.length}\nHigh Risk: ${insights.filter((i) => i.riskLevel === "High").length}\n${"─".repeat(50)}\n`;

    const blob = new Blob([header + "\n" + lines.join("\n\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `insightos-report-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredInsights =
    activeFilter === "all"
      ? insights
      : insights.filter((i) => i.category === activeFilter);

  const riskCounts = {
    H: insights.filter((i) => i.riskLevel === "High").length,
    M: insights.filter((i) => i.riskLevel === "Medium").length,
    L: insights.filter((i) => i.riskLevel === "Low").length,
  };

  if (!isDataLoaded) {
    return (
      <div className="p-5">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[12px] text-[#888]">Insights</span>
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[12px] text-[#888]">Insights</span>
          <span className="text-[10px] text-[#333] font-mono">|</span>
          <span className="text-[10px] text-[#444] font-mono">AI decision intelligence</span>
        </div>
        <div className="flex items-center gap-3">
          {insights.length > 0 && (
            <button
              onClick={handleExport}
              className="text-[10px] text-[#444] hover:text-[#888] font-mono transition-colors"
            >
              [EXPORT]
            </button>
          )}
          <button
            onClick={handleGenerateInsights}
            disabled={isLoadingInsights}
            className="text-[10px] text-cyan-400 hover:text-cyan-300 disabled:text-[#333] font-mono transition-all border border-cyan-500/30 bg-cyan-500/5 px-3 py-1.5 hover:border-cyan-500/60 hover:shadow-[0_0_10px_rgba(6,182,212,0.2)] disabled:border-[#1c1c1c] disabled:bg-transparent"
          >
            {isLoadingInsights ? "ANALYZING…" : "[GENERATE]"}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-[10px] text-[#a44] font-mono">ERROR: {error}</p>
      )}

      {/* Risk summary + filters */}
      {insights.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[9px] font-mono">
            <div className="flex items-center gap-1">
              <div className="w-[5px] h-[5px] rounded-full bg-[#a33]" />
              <span className="text-[#555]">{riskCounts.H} HIGH</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-[5px] h-[5px] rounded-full bg-[#a83]" />
              <span className="text-[#555]">{riskCounts.M} MED</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-[5px] h-[5px] rounded-full bg-[#3a3]" />
              <span className="text-[#555]">{riskCounts.L} LOW</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {categoryFilters.map((filter) => {
              const count = filter.key === "all" ? insights.length : insights.filter((i) => i.category === filter.key).length;
              if (filter.key !== "all" && count === 0) return null;
              return (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`text-[9px] font-mono px-2 py-0.5 transition-all ${
                    activeFilter === filter.key
                      ? "text-cyan-400 bg-cyan-500/10 border border-cyan-500/30"
                      : "text-[#555] hover:text-[#999] border border-transparent hover:border-[#222]"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Loading skeleton */}
      {isLoadingInsights && insights.length === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="border border-[#222] bg-[#111] animate-pulse">
              <div className="px-3 py-1.5 border-b border-[#1c1c1c]">
                <div className="h-2 bg-[#1a1a1a] w-16" />
              </div>
              <div className="px-3 py-3 space-y-2">
                <div className="h-2 bg-[#1a1a1a] w-full" />
                <div className="h-2 bg-[#1a1a1a] w-4/5" />
              </div>
              <div className="px-3 py-2 border-t border-[#1c1c1c]">
                <div className="h-2 bg-[#1a1a1a] w-3/4" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Insights grid */}
      {filteredInsights.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {filteredInsights.map((insight, i) => (
            <InsightCard key={i} insight={insight} index={i} />
          ))}
        </div>
      )}

      {insights.length > 0 && filteredInsights.length === 0 && (
        <p className="text-[10px] text-[#333] font-mono text-center py-8">
          No insights in this category
        </p>
      )}

      {!isLoadingInsights && insights.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[11px] text-[#444] font-mono">
            Click [GENERATE] to analyze data
          </p>
        </div>
      )}
    </div>
  );
}
