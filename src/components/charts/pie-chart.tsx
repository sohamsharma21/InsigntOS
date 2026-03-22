"use client";

import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useData } from "@/context/data-context";
import { useMemo } from "react";

export function DistributionPieChart() {
  const { rawData, dataSummary } = useData();

  const chartData = useMemo(() => {
    if (!dataSummary || rawData.length === 0) return [];

    const categoricalCols = dataSummary.columns.filter((c) => c.type === "categorical");
    const primaryNumeric = dataSummary.columns.find((c) => c.type === "numeric");

    const catCol = categoricalCols.length > 1 ? categoricalCols[1] : categoricalCols[0];

    if (!catCol || !primaryNumeric) return [];

    const grouped: Record<string, number> = {};

    rawData.forEach((row) => {
      const key = String(row[catCol.name]);
      grouped[key] = (grouped[key] || 0) + Number(row[primaryNumeric.name] || 0);
    });

    return Object.entries(grouped).map(([name, value]) => ({ name, value }));
  }, [rawData, dataSummary]);

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px] text-[11px] text-[#333] font-mono">
        NO DISTRIBUTION DATA
      </div>
    );
  }

  const COLORS = ["#22d3ee", "#a78bfa", "#34d399", "#f59e0b", "#f472b6", "#fb923c"];

  return (
    <ResponsiveContainer width="100%" height={220}>
      <RechartsPieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
          stroke="#0A0A0A"
          strokeWidth={1}
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} opacity={0.8} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#111",
            border: "1px solid #222",
            borderRadius: "0",
            fontSize: "10px",
            fontFamily: "monospace",
          }}
          formatter={(value: any) =>
            typeof value === "number" && value >= 1000 ? `${(value / 1000).toFixed(1)}k` : String(value)
          }
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
