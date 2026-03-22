"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useData } from "@/context/data-context";
import { useMemo } from "react";

export function CategoryBarChart() {
  const { rawData, dataSummary } = useData();

  const chartData = useMemo(() => {
    if (!dataSummary || rawData.length === 0) return [];

    const categoricalCol = dataSummary.columns.find((c) => c.type === "categorical");
    const numericCols = dataSummary.columns.filter((c) => c.type === "numeric");

    if (!categoricalCol || numericCols.length === 0) return [];

    const grouped: Record<string, Record<string, number>> = {};

    rawData.forEach((row) => {
      const category = String(row[categoricalCol.name]);
      if (!grouped[category]) {
        grouped[category] = {};
        numericCols.forEach((col) => { grouped[category][col.name] = 0; });
      }
      numericCols.forEach((col) => {
        grouped[category][col.name] = (grouped[category][col.name] || 0) + Number(row[col.name] || 0);
      });
    });

    return Object.entries(grouped).map(([category, values]) => ({ category, ...values }));
  }, [rawData, dataSummary]);

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px] text-[11px] text-[#333] font-mono">
        NO CATEGORICAL DATA
      </div>
    );
  }

  const numericCols = dataSummary!.columns.filter((c) => c.type === "numeric");
  const colors = ["#22d3ee", "#a78bfa", "#f59e0b"];

  return (
    <ResponsiveContainer width="100%" height={220}>
      <RechartsBarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
        <XAxis
          dataKey="category"
          stroke="#222"
          tick={{ fill: "#555", fontSize: 9, fontFamily: "monospace" }}
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
          <Bar
            key={col.name}
            dataKey={col.name}
            fill={colors[i % colors.length]}
            opacity={0.8}
            radius={0}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
