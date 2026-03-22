import { NextRequest, NextResponse } from "next/server";
import { generateInsights } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const { dataSummary } = await request.json();

    if (!dataSummary) {
      return NextResponse.json(
        { error: "Data summary is required" },
        { status: 400 }
      );
    }

    const insights = await generateInsights(dataSummary);

    return NextResponse.json({ insights });
  } catch (error) {
    console.error("Insights API error:", error);
    return NextResponse.json(
      { error: "Failed to generate insights" },
      { status: 500 }
    );
  }
}
