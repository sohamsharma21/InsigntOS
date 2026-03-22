import { NextRequest, NextResponse } from "next/server";
import { chatWithData } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const { question, dataSummary, history } = await request.json();

    if (!question || !dataSummary) {
      return NextResponse.json(
        { error: "Question and data summary are required" },
        { status: 400 }
      );
    }

    const response = await chatWithData(question, dataSummary, history || []);

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat query" },
      { status: 500 }
    );
  }
}
