"use client";

import { useData } from "@/context/data-context";
import { useMemo } from "react";

const ROW_COLORS = ["#22d3ee", "#a78bfa", "#34d399", "#fb923c", "#f472b6", "#fbbf24"];

export function RegionalComparison() {
  const { rawData, dataSummary } = useData();

  const tableData = useMemo(() => {
    if (!dataSummary || rawData.length === 0) return [];

    const categoricalCols = dataSummary.columns.filter((c) => c.type === "categorical");
    const numericCols = dataSummary.columns.filter((c) => c.type === "numeric");
    const groupCol = categoricalCols[0];
    if (!groupCol || numericCols.length === 0) return [];

    const grouped: Record<string, Record<string, number[]>> = {};

    rawData.forEach((row) => {
      const group = String(row[groupCol.name]);
      if (!grouped[group]) {
        grouped[group] = {};
        numericCols.forEach((col) => { grouped[group][col.name] = []; });
      }
      numericCols.forEach((col) => {
        grouped[group][col.name].push(Number(row[col.name] || 0));
      });
    });

    const totals: Record<string, number> = {};
    numericCols.forEach((col) => {
      totals[col.name] = 0;
      Object.values(grouped).forEach((groupData) => {
        totals[col.name] += groupData[col.name].reduce((a, b) => a + b, 0);
      });
    });

    return Object.entries(grouped)
      .map(([name, data]) => {
        const primaryCol = numericCols[0];
        const values = data[primaryCol.name];
        const total = values.reduce((a, b) => a + b, 0);
        const avg = total / values.length;

        const mid = Math.floor(values.length / 2);
        const firstHalf = values.slice(0, mid).reduce((a, b) => a + b, 0) / (mid || 1);
        const secondHalf = values.slice(mid).reduce((a, b) => a + b, 0) / ((values.length - mid) || 1);
        const trendPct = firstHalf > 0 ? ((secondHalf - firstHalf) / firstHalf) * 100 : 0;

        const share = totals[primaryCol.name] > 0 ? (total / totals[primaryCol.name]) * 100 : 0;

        return { name, count: values.length, total, avg, trendPct, share };
      })
      .sort((a, b) => b.total - a.total);
  }, [rawData, dataSummary]);

  if (tableData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[100px] text-[11px] text-[#333] font-mono">
        NO CATEGORICAL DATA
      </div>
    );
  }

  const maxTotal = Math.max(...tableData.map((d) => d.total));

  return (
    <table className="w-full text-[11px] font-mono">
      <thead>
        <tr className="border-b border-[#1c1c1c]">
          <th className="py-1.5 px-3 text-left text-[9px] text-[#444] font-normal uppercase tracking-wider">Group</th>
          <th className="py-1.5 px-3 text-right text-[9px] text-[#444] font-normal uppercase tracking-wider">N</th>
          <th className="py-1.5 px-3 text-right text-[9px] text-[#444] font-normal uppercase tracking-wider">Total</th>
          <th className="py-1.5 px-3 text-left text-[9px] text-[#444] font-normal uppercase tracking-wider w-[120px]">Share</th>
          <th className="py-1.5 px-3 text-right text-[9px] text-[#444] font-normal uppercase tracking-wider">Avg</th>
          <th className="py-1.5 px-3 text-right text-[9px] text-[#444] font-normal uppercase tracking-wider">Trend</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, i) => {
          const barW = maxTotal > 0 ? (row.total / maxTotal) * 100 : 0;
          const color = ROW_COLORS[i % ROW_COLORS.length];
          return (
            <tr key={row.name} className="border-b border-[#151515] hover:bg-[#141414] transition-colors">
              <td className="py-1.5 px-3">
                <div className="flex items-center gap-2">
                  <div className="w-[6px] h-[6px] rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-[#999]">{row.name}</span>
                </div>
              </td>
              <td className="py-1.5 px-3 text-right text-[#555]">{row.count}</td>
              <td className="py-1.5 px-3 text-right text-[#ccc]">
                {row.total >= 1000 ? `${(row.total / 1000).toFixed(1)}k` : row.total.toFixed(0)}
              </td>
              <td className="py-1.5 px-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-[3px] bg-[#1a1a1a]">
                    <div className="h-full transition-all" style={{ width: `${barW}%`, backgroundColor: color, opacity: 0.7 }} />
                  </div>
                  <span className="text-[#555] text-[9px] w-8 text-right">{row.share.toFixed(0)}%</span>
                </div>
              </td>
              <td className="py-1.5 px-3 text-right text-[#777]">
                {row.avg >= 1000 ? `${(row.avg / 1000).toFixed(1)}k` : row.avg.toFixed(0)}
              </td>
              <td className={`py-1.5 px-3 text-right ${row.trendPct > 2 ? "text-emerald-400" : row.trendPct < -2 ? "text-red-400" : "text-[#555]"}`}>
                {row.trendPct > 0 ? "+" : ""}{row.trendPct.toFixed(1)}%
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
