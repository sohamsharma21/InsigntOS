# ❖ InsightOS

<div align="center">
  <h3>An AI-Powered Decision Intelligence System</h3>
  <p>Inspired by Palantir Foundry, built for the modern interactive web.</p>
</div>

---

## 👁‍🗨 The Mission

**InsightOS** is not just another dashboard; it is a **decision intelligence engine**. It transforms inert, raw data (CSV/JSON) into proactive, strategic intelligence. By fusing a highly minimal, data-dense UI with the deep reasoning capabilities of the **Google Gemini Pro API**, InsightOS parses datasets, identifies anomalies, and recommends actionable strategies in real-time.

Built for analysts, engineers, and executives who need high-staked execution over flashy vanity metrics.

---

## ⚡ Core Architecture

- **Data Intake Layer**: Drag-and-drop CSV parser and JSON terminal ingestion.
- **Automated Schema Engine**: On-the-fly column detection (Temporal, Numeric, Categorical) and statistical summarization.
- **Intelligence Layer (LLM)**: Context-aware prompt engine built over `@google/generative-ai` to detect trends, predict risks, and output categorized action items.
- **Visual Operations**: Data-dense terminal-style Recharts with ambient interaction states.

---

## ⚙️ Key Features

### 1. Zero-Friction Data Ingestion
Drop a CSV, paste an array of JSON objects, or use the pre-loaded global operations demo dataset. The system instantly maps numeric topologies and categorical relationships.

### 2. Auto-Analysis & Health Scoring
The moment data hits the client, InsightOS fires a background query to Gemini, summarizing the dataset and extracting a **Global Health Score (0-100)** alongside Top 3 Executive Findings.

### 3. Categorized Intelligence Engine
InsightOS generates localized intelligence cards classified into:
- `TREND` | `ANOMALY` | `PREDICT` | `OPTIMIZE` | `RISK` | `OPPORT`
- *Each insight is paired with a specific, implementable recommended action.*

### 4. Natural Language Database Query (`AI Chat`)
A dark, terminal-style chat interface allowing analysts to interrogate their data using natural language. The AI responds with rich markdown, rendering internal tables, lists, and bolded analytical takeaways.

### 5. "Intelligence System" UI/UX
Designed to feel like secure internal software:
- Ultra-dark `#0A0A0A` theme with deep radial `cyan` ambient gradients.
- Sharp corners, monospace typography, and terminal-style `<button>` brackets.
- Context-aware colored ambient glows (Cyan/Emerald/Purple/Amber/Pink) reacting to user hover states.

---

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Styling** | Tailwind CSS v4 + ShadCN UI Architecture |
| **AI Integration** | Google Gemini API SDK (`@google/generative-ai`) |
| **Data Parsing** | PapaParse |
| **Data Visualization** | Recharts (Highly Customized) |
| **Icons** | Lucide React |

---

## 🚀 Quick Start / Deployment

### 1. Local Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/sohamsharma21/InsigntOS.git
cd InsigntOS
npm install
```

Set up your intelligence layer by adding your Gemini API key:

```bash
# Create a .env.local file
echo "GEMINI_API_KEY=your_google_gemini_api_key_here" > .env.local
```
*(Note: Without an API key, InsightOS will gracefully fall back to a mock, deterministic intelligence model for demonstration purposes).*

Start the operations server:

```bash
npm run dev
```

Visit `http://localhost:3000` to access the OS.

### 2. Production Deployment (Vercel)

InsightOS is optimized for instant deployment on Vercel. Connect this repository to your Vercel account, inject `GEMINI_API_KEY` into the Environment Variables panel, and hit Deploy.

---

<div align="center">
  <p><i>"Transforming raw telemetry into kinetic strategy."</i></p>
</div>
