"use client";

import { DataUpload } from "@/components/data-upload";
import { DataTablePreview } from "@/components/data-table-preview";
import { useData } from "@/context/data-context";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { dataSummary, isDataLoaded, rawData, analysis, isLoadingAnalysis } = useData();
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimestamp(
        now.toISOString().slice(0, 19).replace("T", " ") + " UTC"
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-5 space-y-4">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[12px] text-cyan-400">Dashboard</span>
          <span className="text-[10px] text-[#333] font-mono">|</span>
          <span className="text-[10px] text-[#444] font-mono">{timestamp}</span>
        </div>
        <DataUpload />
      </div>

      {/* Empty state */}
      {!isDataLoaded && (
        <div className="pt-16">
          <div className="text-center space-y-4">
            <p className="text-[12px] text-[#555]">No data loaded</p>
            <p className="text-[10px] text-[#333] font-mono">
              Select a data source to begin analysis
            </p>
            <div className="pt-4">
              <DataUpload />
            </div>
          </div>
        </div>
      )}

      {/* Data loaded view */}
      {isDataLoaded && dataSummary && (
        <>
          {/* Top metrics row */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-[1px] bg-[#1c1c1c] p-[1px] rounded-sm">
            <div className="bg-[#0A0A0A] px-3 py-3 border-t-2 border-cyan-500/40 hover-glow-cyan panel-glow transition-all">
              <p className="text-[9px] text-[#555] font-mono uppercase tracking-wider">Rows</p>
              <p className="text-[18px] text-cyan-400 font-mono mt-1">
                {dataSummary.totalRows.toLocaleString()}
              </p>
            </div>
            <div className="bg-[#0A0A0A] px-3 py-3 border-t-2 border-purple-500/40 hover-glow-purple panel-glow transition-all">
              <p className="text-[9px] text-[#555] font-mono uppercase tracking-wider">Columns</p>
              <p className="text-[18px] text-purple-400 font-mono mt-1">
                {dataSummary.totalColumns}
              </p>
            </div>
            <div className="bg-[#0A0A0A] px-3 py-3 border-t-2 border-emerald-500/40 hover-glow-emerald panel-glow transition-all">
              <p className="text-[9px] text-[#555] font-mono uppercase tracking-wider">Date Range</p>
              <p className="text-[11px] text-emerald-400 font-mono mt-2 w-full truncate">
                {dataSummary.dateRange
                  ? `${dataSummary.dateRange.start} → ${dataSummary.dateRange.end}`
                  : "—"}
              </p>
            </div>
            <div className="bg-[#0A0A0A] px-3 py-3 border-t-2 border-amber-500/40 hover-glow-amber panel-glow transition-all">
              <p className="text-[9px] text-[#555] font-mono uppercase tracking-wider">Numeric</p>
              <p className="text-[18px] text-amber-400 font-mono mt-1">
                {dataSummary.columns.filter((c) => c.type === "numeric").length}
              </p>
            </div>
            <div className="bg-[#0A0A0A] px-3 py-3 border-t-2 border-pink-500/40 hover-glow-pink panel-glow transition-all">
              <p className="text-[9px] text-[#555] font-mono uppercase tracking-wider">Categorical</p>
              <p className="text-[18px] text-pink-400 font-mono mt-1">
                {dataSummary.columns.filter((c) => c.type === "categorical").length}
              </p>
            </div>
          </div>

          <div className="border border-cyan-500/20 bg-[#111] border-l-2 border-l-cyan-500/70 hover-glow-cyan panel-glow transition-all backdrop-blur-sm">
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#1c1c1c]">
              <span className="text-[10px] text-cyan-500/70 font-mono uppercase">AI Analysis</span>
              <div className="flex items-center gap-1.5">
                {isLoadingAnalysis ? (
                  <span className="text-[9px] text-[#444] font-mono animate-pulse">Processing data…</span>
                ) : analysis ? (
                  <>
                    <div className={`w-[5px] h-[5px] rounded-full ${
                      analysis.healthScore >= 70 ? "bg-emerald-500" : analysis.healthScore >= 40 ? "bg-amber-500" : "bg-red-500"
                    }`} />
                    <span className="text-[9px] text-[#555] font-mono">
                      HEALTH {analysis.healthScore}/100
                    </span>
                    <span className="text-[9px] text-[#333] font-mono mx-1">|</span>
                    <span className={`text-[9px] font-mono uppercase ${
                      analysis.trendDirection === "up" ? "text-emerald-400" :
                      analysis.trendDirection === "down" ? "text-red-400" :
                      "text-[#555]"
                    }`}>
                      TREND {analysis.trendDirection}
                    </span>
                  </>
                ) : null}
              </div>
            </div>

            {isLoadingAnalysis && (
              <div className="px-3 py-4 space-y-2">
                <div className="h-3 bg-[#1a1a1a] w-full animate-pulse" />
                <div className="h-3 bg-[#1a1a1a] w-4/5 animate-pulse" />
              </div>
            )}

            {analysis && !isLoadingAnalysis && (
              <div className="px-3 py-3 space-y-3">
                <p className="text-[11px] text-[#888] leading-[1.6]">
                  {analysis.overview}
                </p>
                <div className="space-y-1">
                  {analysis.keyFindings.map((finding, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[9px] text-cyan-600 font-mono mt-0.5">
                        {(i + 1).toString().padStart(2, "0")}
                      </span>
                      <p className="text-[10px] text-[#999] leading-[1.5]">{finding}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Numeric summaries */}
          {Object.keys(dataSummary.numericSummary).length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-[1px] bg-[#1c1c1c]">
              {Object.entries(dataSummary.numericSummary).slice(0, 3).map(([key, stats]) => (
                <div key={key} className="bg-[#0A0A0A] px-3 py-2.5">
                  <p className="text-[9px] text-cyan-500/70 font-mono uppercase tracking-wider mb-2">{key}</p>
                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <p className="text-[8px] text-[#444] font-mono">SUM</p>
                      <p className="text-[11px] text-[#ccc] font-mono">
                        {stats.sum >= 1000 ? `${(stats.sum / 1000).toFixed(1)}k` : stats.sum.toFixed(0)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[8px] text-[#444] font-mono">AVG</p>
                      <p className="text-[11px] text-[#ccc] font-mono">
                        {stats.mean >= 1000 ? `${(stats.mean / 1000).toFixed(1)}k` : stats.mean.toFixed(0)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[8px] text-[#444] font-mono">MIN</p>
                      <p className="text-[11px] text-[#ccc] font-mono">{stats.min.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-[#444] font-mono">MAX</p>
                      <p className="text-[11px] text-[#ccc] font-mono">{stats.max.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Column types */}
          <div className="border border-[#222] bg-[#111]">
            <div className="px-3 py-1.5 border-b border-[#1c1c1c]">
              <span className="text-[10px] text-cyan-500/70 font-mono uppercase">Schema</span>
            </div>
            <div className="flex flex-wrap gap-0 border-t border-[#1c1c1c]">
              {dataSummary.columns.map((col, i) => (
                <div
                  key={col.name}
                  className={`flex items-center gap-2 px-3 py-1.5 text-[10px] font-mono ${
                    i < dataSummary.columns.length - 1 ? "border-r border-[#1c1c1c]" : ""
                  }`}
                >
                  <span className="text-[#999]">{col.name}</span>
                  <span className={`text-[9px] ${
                    col.type === "date" ? "text-emerald-400" : col.type === "numeric" ? "text-cyan-400" : "text-purple-400"
                  }`}>
                    {col.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Data preview */}
          {rawData.length > 0 && <DataTablePreview />}
        </>
      )}
    </div>
  );
}
