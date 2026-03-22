"use client";

import { AIInsight } from "@/lib/ai";

const riskDot: Record<string, string> = {
  Low: "bg-emerald-500",
  Medium: "bg-amber-500",
  High: "bg-red-500",
};

const categoryConfig: Record<string, { label: string; color: string }> = {
  trend: { label: "TREND", color: "text-blue-400" },
  anomaly: { label: "ANOMALY", color: "text-orange-400" },
  prediction: { label: "PREDICT", color: "text-violet-400" },
  optimization: { label: "OPTIMIZE", color: "text-teal-400" },
  risk: { label: "RISK", color: "text-red-400" },
  opportunity: { label: "OPPORT", color: "text-emerald-400" },
};

export function InsightCard({ insight, index }: { insight: AIInsight; index: number }) {
  const dot = riskDot[insight.riskLevel] || riskDot.Medium;
  const cat = categoryConfig[insight.category] || { label: "INSIGHT", color: "text-[#555]" };

  return (
    <div
      className="relative overflow-hidden border border-[#222] bg-[#111]/80 backdrop-blur-md hover:bg-[#141414] hover:border-[#333] transition-all duration-300 animate-fadeIn panel-glow rounded-[1px]"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Top ambient glow bar */}
      <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-${cat.color.split('-')[1]}-500/50 to-transparent`} />
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#1c1c1c]">
        <span className={`text-[9px] font-mono tracking-wider ${cat.color}`}>
          {cat.label}
        </span>
        <div className="flex items-center gap-1.5">
          <div className={`w-[5px] h-[5px] rounded-full ${dot}`} />
          <span className="text-[9px] text-[#555] font-mono">
            {insight.riskLevel.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-3 py-2.5">
        <p className="text-[12px] text-[#bbb] leading-[1.5]">
          {insight.insight}
        </p>
      </div>

      {/* Action */}
      <div className="px-3 py-2 border-t border-[#1c1c1c]">
        <p className="text-[10px] text-[#555] leading-[1.5]">
          <span className="text-cyan-600">→</span> {insight.action}
        </p>
      </div>
    </div>
  );
}
