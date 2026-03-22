"use client";

import { useData } from "@/context/data-context";

export function DataTablePreview() {
  const { rawData } = useData();

  if (rawData.length === 0) return null;

  const columns = Object.keys(rawData[0]);
  const displayData = rawData.slice(0, 25);

  return (
    <div className="border border-[#222] bg-[#111]">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#1c1c1c]">
        <span className="text-[10px] text-[#555] font-mono uppercase">
          Data Preview
        </span>
        <span className="text-[10px] text-[#333] font-mono">
          {displayData.length}/{rawData.length} rows
        </span>
      </div>
      <div className="overflow-auto max-h-[300px]">
        <table className="w-full text-[11px] font-mono">
          <thead>
            <tr className="border-b border-[#1c1c1c] sticky top-0 bg-[#111]">
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-3 py-1.5 text-left text-[10px] text-[#555] font-normal uppercase tracking-wider whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, i) => (
              <tr
                key={i}
                className="border-b border-[#151515] hover:bg-[#141414] transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col}
                    className="px-3 py-1 text-[#777] whitespace-nowrap"
                  >
                    {String(row[col] ?? "—")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
