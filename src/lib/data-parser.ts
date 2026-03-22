export interface ColumnInfo {
  name: string;
  type: "date" | "numeric" | "categorical";
  uniqueValues?: number;
  min?: number;
  max?: number;
  mean?: number;
  sum?: number;
}

export interface DataSummary {
  totalRows: number;
  totalColumns: number;
  columns: ColumnInfo[];
  dateRange?: { start: string; end: string };
  numericSummary: Record<string, { min: number; max: number; mean: number; sum: number }>;
}

function isDateString(value: string): boolean {
  const datePatterns = [
    /^\d{4}-\d{2}-\d{2}$/,
    /^\d{2}\/\d{2}\/\d{4}$/,
    /^\d{2}-\d{2}-\d{4}$/,
  ];
  return datePatterns.some((p) => p.test(value));
}

function isNumeric(value: string): boolean {
  return !isNaN(parseFloat(value)) && isFinite(Number(value));
}

export function detectColumnTypes(data: Record<string, unknown>[]): ColumnInfo[] {
  if (data.length === 0) return [];
  const columns = Object.keys(data[0]);

  return columns.map((col) => {
    const values = data.map((row) => String(row[col] ?? "")).filter((v) => v !== "");
    const sampleSize = Math.min(values.length, 20);
    const sample = values.slice(0, sampleSize);

    const dateCount = sample.filter(isDateString).length;
    const numericCount = sample.filter(isNumeric).length;

    if (dateCount > sampleSize * 0.7) {
      return { name: col, type: "date" as const };
    }

    if (numericCount > sampleSize * 0.7) {
      const nums = values.map(Number).filter((n) => !isNaN(n));
      return {
        name: col,
        type: "numeric" as const,
        min: Math.min(...nums),
        max: Math.max(...nums),
        mean: nums.reduce((a, b) => a + b, 0) / nums.length,
        sum: nums.reduce((a, b) => a + b, 0),
      };
    }

    return {
      name: col,
      type: "categorical" as const,
      uniqueValues: new Set(values).size,
    };
  });
}

export function generateDataSummary(data: Record<string, unknown>[]): DataSummary {
  const columns = detectColumnTypes(data);

  const dateCol = columns.find((c) => c.type === "date");
  let dateRange: { start: string; end: string } | undefined;

  if (dateCol) {
    const dates = data
      .map((row) => String(row[dateCol.name]))
      .filter(Boolean)
      .sort();
    dateRange = { start: dates[0], end: dates[dates.length - 1] };
  }

  const numericSummary: Record<string, { min: number; max: number; mean: number; sum: number }> = {};
  columns
    .filter((c) => c.type === "numeric")
    .forEach((c) => {
      numericSummary[c.name] = {
        min: c.min!,
        max: c.max!,
        mean: c.mean!,
        sum: c.sum!,
      };
    });

  return {
    totalRows: data.length,
    totalColumns: columns.length,
    columns,
    dateRange,
    numericSummary,
  };
}

export function cleanData(data: Record<string, unknown>[]): Record<string, unknown>[] {
  return data.map((row) => {
    const cleaned: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(row)) {
      const trimmedKey = key.trim();
      if (typeof value === "string") {
        const trimmed = value.trim();
        if (isNumeric(trimmed)) {
          cleaned[trimmedKey] = parseFloat(trimmed);
        } else {
          cleaned[trimmedKey] = trimmed;
        }
      } else {
        cleaned[trimmedKey] = value;
      }
    }
    return cleaned;
  });
}
