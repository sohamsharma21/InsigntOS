import { NextRequest, NextResponse } from "next/server";
import { generateDataAnalysis } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const { dataSummary } = await request.json();

    if (!dataSummary) {
      return NextResponse.json(
        { error: "Data summary is required" },
        { status: 400 }
      );
    }

    const analysis = await generateDataAnalysis(dataSummary);

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Analysis API error:", error);
    return NextResponse.json(
      { error: "Failed to generate analysis" },
      { status: 500 }
    );
  }
}
