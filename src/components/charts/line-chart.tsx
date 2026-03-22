"use client";

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useData } from "@/context/data-context";
import { useMemo } from "react";

export function TrendLineChart() {
  const { rawData, dataSummary } = useData();

  const chartData = useMemo(() => {
    if (!dataSummary || rawData.length === 0) return [];

    const dateCol = dataSummary.columns.find((c) => c.type === "date");
    const numericCols = dataSummary.columns.filter((c) => c.type === "numeric");

    if (!dateCol || numericCols.length === 0) return [];

    const grouped: Record<string, Record<string, number>> = {};

    rawData.forEach((row) => {
      const date = String(row[dateCol.name]);
      if (!grouped[date]) {
        grouped[date] = {};
        numericCols.forEach((col) => { grouped[date][col.name] = 0; });
      }
      numericCols.forEach((col) => {
        grouped[date][col.name] = (grouped[date][col.name] || 0) + Number(row[col.name] || 0);
      });
    });

    return Object.entries(grouped)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, values]) => ({ date, ...values }));
  }, [rawData, dataSummary]);

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px] text-[11px] text-[#333] font-mono">
        NO TIME-SERIES DATA
      </div>
    );
  }

  const numericCols = dataSummary!.columns.filter((c) => c.type === "numeric");
  const colors = ["#22d3ee", "#a78bfa", "#34d399"];

  return (
    <ResponsiveContainer width="100%" height={220}>
      <RechartsLineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
        <XAxis
          dataKey="date"
          stroke="#222"
          tick={{ fill: "#555", fontSize: 9, fontFamily: "monospace" }}
          tickFormatter={(v) => {
            const d = new Date(v);
            return `${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getDate().toString().padStart(2, "0")}`;
          }}
          tickLine={{ stroke: "#222" }}
        />
        <YAxis
          stroke="#222"
          tick={{ fill: "#555", fontSize: 9, fontFamily: "monospace" }}
          tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)}
          tickLine={{ stroke: "#222" }}
          width={40}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#111",
            border: "1px solid #222",
            borderRadius: "0",
            fontSize: "10px",
            fontFamily: "monospace",
          }}
          labelStyle={{ color: "#666" }}
          itemStyle={{ color: "#aaa" }}
        />
        {numericCols.slice(0, 3).map((col, i) => (
          <Line
            key={col.name}
            type="monotone"
            dataKey={col.name}
            stroke={colors[i % colors.length]}
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 3, fill: colors[i % colors.length], stroke: "none" }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
