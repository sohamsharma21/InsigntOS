import { GoogleGenerativeAI } from "@google/generative-ai";

export interface AIInsight {
  insight: string;
  riskLevel: "Low" | "Medium" | "High";
  action: string;
  category: "trend" | "anomaly" | "prediction" | "optimization" | "risk" | "opportunity";
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface DataAnalysisSummary {
  overview: string;
  keyFindings: string[];
  trendDirection: "up" | "down" | "stable" | "mixed";
  healthScore: number; // 0-100
}

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenerativeAI(apiKey);
};

export async function generateDataAnalysis(dataSummary: string): Promise<DataAnalysisSummary> {
  const client = getGeminiClient();

  if (!client) {
    return getMockAnalysis();
  }

  try {
    const model = client.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are an elite data analyst at a decision intelligence platform. Analyze this dataset and provide a concise executive summary.

Dataset Summary:
${dataSummary}

Respond in ONLY valid JSON with this exact structure:
{
  "overview": "2-3 sentence executive summary of the dataset and its key characteristics",
  "keyFindings": ["finding 1", "finding 2", "finding 3", "finding 4"],
  "trendDirection": "up|down|stable|mixed",
  "healthScore": 75
}

The healthScore should be 0-100 where 100 = excellent performance, 0 = critical issues.
Return ONLY the JSON, no markdown, no code blocks.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Gemini analysis error:", error);
    return getMockAnalysis();
  }
}

export async function generateInsights(dataSummary: string): Promise<AIInsight[]> {
  const client = getGeminiClient();

  if (!client) {
    return getMockInsights();
  }

  try {
    const model = client.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are a senior decision intelligence analyst at a Palantir-style platform. Your job is to transform raw data into actionable decisions.

Analyze the following dataset and generate exactly 8 high-quality, actionable insights. Each insight must be specific, data-backed, and decision-ready.

For each insight, provide:
1. **insight**: A clear, specific insight statement with actual numbers/percentages when possible
2. **riskLevel**: "Low", "Medium", or "High" based on urgency and potential impact
3. **action**: A specific, implementable recommended action (not vague advice)
4. **category**: One of: "trend", "anomaly", "prediction", "optimization", "risk", "opportunity"

Categories explained:
- trend: Patterns observed over time
- anomaly: Unusual data points or outliers  
- prediction: Forward-looking forecasts
- optimization: Efficiency improvement opportunities
- risk: Potential threats or concerns
- opportunity: Growth or improvement potential

Dataset Summary:
${dataSummary}

Respond in ONLY valid JSON format as an array. Example:
[{"insight": "East region revenue grew 18% while West declined 12%", "riskLevel": "High", "action": "Reallocate 20% of West budget to East expansion", "category": "trend"}]

Return ONLY the JSON array, no markdown, no code blocks.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Gemini insights error:", error);
    return getMockInsights();
  }
}

export async function chatWithData(
  question: string,
  dataSummary: string,
  history: ChatMessage[]
): Promise<string> {
  const client = getGeminiClient();

  if (!client) {
    return getMockChatResponse(question);
  }

  try {
    const model = client.getGenerativeModel({ model: "gemini-2.0-flash" });

    const historyContext = history
      .slice(-8)
      .map((m) => `${m.role === "user" ? "Human" : "AI Analyst"}: ${m.content}`)
      .join("\n");

    const prompt = `You are InsightOS AI — an elite data intelligence analyst embedded in a decision intelligence platform similar to Palantir Foundry. You provide strategic, data-backed analysis.

Your personality:
- Precise and data-driven, always reference specific numbers
- Strategic thinker — connect dots across data dimensions
- Actionable — every answer includes "what to do next"
- Confident but measured — flag uncertainty when appropriate

Dataset Summary:
${dataSummary}

Conversation History:
${historyContext}

User Question: ${question}

Instructions:
- Answer with specific data references (percentages, values, comparisons)
- If asked for predictions, provide confidence levels
- If asked "what should I do", give a prioritized action plan
- For comparisons, use clear metrics
- Use bold (**text**) for emphasis on key numbers and findings
- Keep response under 250 words but make every word count
- If the question can't be answered from the data, say so honestly`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini chat error:", error);
    return getMockChatResponse(question);
  }
}

function getMockAnalysis(): DataAnalysisSummary {
  return {
    overview:
      "This sales dataset spans 4 regions across 2 product categories, covering a multi-month period. Revenue shows moderate growth with the East region as the clear market leader and the West region significantly underperforming relative to peers.",
    keyFindings: [
      "Total revenue exceeds $700K with a 60% cost-to-revenue ratio across all products",
      "East region contributes ~35% of total revenue, primarily driven by Gadget X hardware",
      "West region trails at ~15% of revenue — the largest performance gap in the dataset",
      "Hardware category outperforms Electronics by approximately 22% in aggregate revenue",
    ],
    trendDirection: "up",
    healthScore: 72,
  };
}

function getMockInsights(): AIInsight[] {
  return [
    {
      insight:
        "Revenue shows a consistent upward trend with 12% growth over the analysis period, driven primarily by the East region's Gadget X product line.",
      riskLevel: "Low",
      action:
        "Increase East region inventory allocation by 15% and fast-track Gadget X production capacity expansion.",
      category: "trend",
    },
    {
      insight:
        "West region consistently underperforms with 35% lower revenue compared to the cross-regional average, with Gadget Y as the weakest SKU.",
      riskLevel: "High",
      action:
        "Launch a 90-day West region turnaround program: conduct customer research, test competitive pricing, and evaluate sales team effectiveness.",
      category: "risk",
    },
    {
      insight:
        "Hardware category (Gadget X) is the top revenue generator, contributing 52% of total revenue with growing demand signals.",
      riskLevel: "Low",
      action:
        "Expand hardware product line with premium variants. Consider a 'Gadget X Pro' at 20% price premium to capture high-end demand.",
      category: "opportunity",
    },
    {
      insight:
        "Cost-to-revenue ratio remains locked at 60% across all products with zero variance — suggesting rigid pricing or uniform supplier terms.",
      riskLevel: "Medium",
      action:
        "Negotiate volume-based supplier discounts for high-selling items. Target 5% cost reduction on top 2 products to improve margins.",
      category: "optimization",
    },
    {
      insight:
        "Anomalous revenue spike detected in Week 3 of each month, averaging 8-12% above weekly mean across all regions.",
      riskLevel: "Medium",
      action:
        "Investigate cyclical demand drivers (payroll cycles, promotions). Align marketing campaigns and inventory to mid-month demand peaks.",
      category: "anomaly",
    },
    {
      insight:
        "South region Widget B sales declining approximately 8% month-over-month for 3 consecutive periods, indicating potential market saturation.",
      riskLevel: "High",
      action:
        "Initiate product refresh for Widget B in South region. Test bundling strategies or loyalty discounts within 30 days.",
      category: "trend",
    },
    {
      insight:
        "Based on current trajectory, East region Gadget X could surpass $22K weekly revenue within 6 weeks if growth rate sustains at 4% week-over-week.",
      riskLevel: "Low",
      action:
        "Pre-position additional inventory and logistics capacity in East region to prevent stockouts during projected demand surge.",
      category: "prediction",
    },
    {
      insight:
        "North region shows the most balanced product mix (48/52 electronics-to-hardware ratio) and could serve as a model for other regions.",
      riskLevel: "Low",
      action:
        "Document North region's sales strategy and go-to-market playbook. Use as template for South and West region improvement programs.",
      category: "opportunity",
    },
  ];
}

function getMockChatResponse(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("underperform") || q.includes("worst") || q.includes("weak")) {
    return "Based on the data analysis, the **West region** is the clear underperformer:\n\n📊 **Key Metrics:**\n- **35% below** the cross-regional revenue average\n- Gadget Y (its primary product) generates the **lowest revenue** of any SKU\n- No improvement trend detected over the analysis period\n\n🎯 **Root Cause Hypothesis:**\nThe combination of a weaker product (Gadget Y) and potentially suboptimal market positioning creates a compounding underperformance cycle.\n\n✅ **Recommended Actions (Priority Order):**\n1. **Immediate** — Conduct competitive pricing analysis in West region\n2. **30 days** — Test promotional campaigns targeting Gadget Y\n3. **60 days** — Evaluate whether to pivot West region toward Gadget X distribution\n\nWant me to dive deeper into the West region's product-level breakdown?";
  }

  if (q.includes("best") || q.includes("top") || q.includes("highest")) {
    return "The **East region** dominates performance across all metrics:\n\n🏆 **Performance Highlights:**\n- **~35% of total revenue** — highest of any region\n- Gadget X drives **$16K-21K weekly revenue**, trending upward\n- **Consistent growth** at approximately 4% week-over-week\n\n📈 **What's Working:**\n- Strong hardware demand (Gadget X has natural product-market fit)\n- Consistent unit volume growth suggests organic demand, not promo-driven\n- Higher per-unit revenue compared to electronics category\n\n✅ **How to Replicate Success:**\n1. Analyze East region's go-to-market strategy and customer demographics\n2. Test Gadget X expansion into South and West regions\n3. Consider the East as your test market for new product launches";
  }

  if (q.includes("predict") || q.includes("forecast") || q.includes("future") || q.includes("next")) {
    return "📈 **Predictive Analysis** (Confidence: Medium-High)\n\nBased on observed trends and seasonal patterns:\n\n**Revenue Forecast:**\n- **Next 4 weeks:** 8-12% quarter-over-quarter growth likely\n- **East Region:** Could reach **$22K+ weekly** (currently ~$19K)\n- **West Region:** Continued decline to **~$5K weekly** without intervention\n\n**Risk Scenarios:**\n| Scenario | Probability | Impact |\n|----------|------------|--------|\n| East growth sustains | 75% | +$15K monthly |\n| West further decline | 60% | -$8K monthly |\n| Hardware supply constraint | 30% | -$20K monthly |\n\n⚠️ **Critical Watch:**\nThe biggest risk isn't current performance — it's **hardware supply chain**. If Gadget X demand continues growing at 4%/week, you'll need **30% more inventory** within 2 months.\n\n✅ **Action:** Lock in supplier contracts now at current volume +25% buffer.";
  }

  if (q.includes("do next") || q.includes("recommend") || q.includes("action") || q.includes("should")) {
    return "🎯 **Strategic Action Plan** (Next 90 Days)\n\n**Priority 1 — Protect Growth Engine** (Week 1-2)\n- Secure additional Gadget X inventory for East region\n- Lock supplier terms before demand-driven price increases\n\n**Priority 2 — Address West Region** (Week 2-4)\n- Deploy market research team to West region\n- Test 15% price reduction on Gadget Y as demand elasticity experiment\n- If no response in 30 days, pivot West to Gadget X distribution\n\n**Priority 3 — Optimize Margins** (Month 2)\n- Negotiate bulk supplier discounts (target 5% cost reduction)\n- Current 60% cost ratio → target 55% on top-selling SKUs\n- **Potential impact:** $35K+ annual profit improvement\n\n**Priority 4 — Scale Winners** (Month 3)\n- Launch premium 'Gadget X Pro' at 20% price premium\n- Replicate East region playbook in North region (most similar market dynamics)\n\n💡 **Quick Win:** Aligning promotions with mid-month demand cycles could yield **8-12% revenue lift** with zero additional cost.";
  }

  return "Great question! Based on my analysis of your dataset, here are the key insights:\n\n📊 **Dataset Overview:**\n- **4 regions** (North, South, East, West) with varying performance levels\n- **2 product categories** — Hardware dominates at 52% of revenue\n- **Trend:** Overall upward with regional disparities\n\n🔍 **Notable Patterns:**\n- **East** = strongest performer (Gadget X driving growth)\n- **West** = needs attention (consistent underperformance)\n- **60% cost ratio** is uniform — potential for margin optimization\n- **Mid-month demand spikes** suggest cyclical buying patterns\n\nWould you like me to dive deeper into any specific aspect?\n\n💡 **Suggested follow-ups:**\n- _\"What should I do next?\"_\n- _\"Predict next quarter's revenue\"_\n- _\"Which product should I invest in?\"_";
}
