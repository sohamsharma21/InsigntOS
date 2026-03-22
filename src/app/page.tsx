"use client";

import Link from "next/link";
import { ArrowRight, Brain, Cpu, Database, LineChart, MessageSquare, Terminal } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen text-[#ccc] font-sans selection:bg-cyan-500/20 selection:text-white pb-20">
      {/* Top Ambient Light */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-cyan-900/10 to-transparent pointer-events-none" />

      {/* Hero Section */}
      <header className="relative pt-24 pb-20 px-6 max-w-5xl mx-auto flex flex-col items-center text-center animate-fadeIn z-10">
        <div className="mb-10">
          <img src="/logo.png" alt="InsightOS Brand" className="w-20 h-20 rounded-full border border-[#222] shadow-[0_0_30px_rgba(6,182,212,0.15)]" />
        </div>

        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-[1px] border border-cyan-500/30 bg-cyan-500/5 text-[10px] text-cyan-400 font-mono uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.1)]">
          <Terminal className="w-3 h-3" />
          <span>System Online • Built by Soham</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-6">
          Decision <span className="text-cyan-400 font-medium">Intelligence.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-[#888] max-w-3xl leading-relaxed mb-10">
          Hi, I&apos;m Soham, and I built <strong className="text-[#ccc] font-medium">InsightOS</strong> — an AI-powered decision intelligence system inspired by how Palantir helps organizations turn raw data into real-world decisions.
        </p>

        <Link
          href="/dashboard"
          className="group relative inline-flex items-center gap-3 px-8 py-3 bg-[#111] border border-cyan-500/40 text-cyan-400 font-mono text-sm uppercase tracking-widest transition-all hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] rounded-[1px]"
        >
          [ Enter Software ]
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </header>

      {/* The Problem & Solution */}
      <section className="relative px-6 max-w-5xl mx-auto py-16 z-10">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="panel-glow border border-[#222] bg-[#111]/80 backdrop-blur-md p-8 hover-glow-purple rounded-[1px]">
            <h3 className="text-xs text-purple-400 font-mono uppercase tracking-widest mb-4">The Problem</h3>
            <p className="text-[#888] leading-relaxed">
              Today, most organizations have a lot of data, but very little clarity. Data is scattered, insights are delayed, and decision-making becomes reactive instead of proactive.
            </p>
          </div>
          <div className="panel-glow border border-[#222] bg-[#111]/80 backdrop-blur-md p-8 hover-glow-emerald rounded-[1px]">
            <h3 className="text-xs text-emerald-400 font-mono uppercase tracking-widest mb-4">The Solution</h3>
            <p className="text-[#888] leading-relaxed">
              I wanted to build a system that doesn&apos;t just show data, but actually tells you what to do next. InsightOS is a simplified decision intelligence platform where users upload raw data and get real-time recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="relative px-6 max-w-5xl mx-auto py-16 z-10">
        <h2 className="text-2xl font-light text-white mb-10 border-b border-[#222] pb-4">Core Architecture</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Capability 1 */}
          <div className="panel-glow group border border-[#222] bg-[#111]/80 backdrop-blur-md p-6 hover-glow-cyan transition-all rounded-[1px]">
            <Database className="w-6 h-6 text-cyan-400 mb-4 opacity-70 group-hover:opacity-100 transition-opacity" />
            <h4 className="text-white font-medium mb-3">Live Data Ingestion</h4>
            <p className="text-sm text-[#888] leading-relaxed">
              Upload a dataset or use sample data. The system automatically parses it and instantly maps key metrics like total records, detected columns, and time ranges.
            </p>
          </div>

          {/* Capability 2 */}
          <div className="panel-glow group border border-[#222] bg-[#111]/80 backdrop-blur-md p-6 hover-glow-amber transition-all rounded-[1px]">
            <LineChart className="w-6 h-6 text-amber-400 mb-4 opacity-70 group-hover:opacity-100 transition-opacity" />
            <h4 className="text-white font-medium mb-3">Advanced Analytics</h4>
            <p className="text-sm text-[#888] leading-relaxed">
              In the analytics section, the system visualizes patterns using dense charts — time-based trends, category comparisons, and proportional distribution insights.
            </p>
          </div>

          {/* Capability 3 */}
          <div className="panel-glow group border border-[#222] bg-[#111]/80 backdrop-blur-md p-6 hover-glow-pink transition-all rounded-[1px]">
            <Brain className="w-6 h-6 text-pink-400 mb-4 opacity-70 group-hover:opacity-100 transition-opacity" />
            <h4 className="text-white font-medium mb-3">AI-Powered Decisions</h4>
            <p className="text-sm text-[#888] leading-relaxed">
              Instead of just charts, the system generates AI insights. It detects trends, identifies risks, and suggests actions. Instead of asking &quot;what is happening&quot;, it answers <strong className="text-[#ccc]">&quot;what should I do next&quot;</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Natural Language & Tech Stack */}
      <section className="relative px-6 max-w-5xl mx-auto py-16 z-10">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="panel-glow border border-[#222] bg-[#111]/80 backdrop-blur-md p-8 hover-glow-cyan rounded-[1px]">
            <MessageSquare className="w-5 h-5 text-cyan-400 mb-4" />
            <h3 className="text-white font-medium mb-4">Natural Language Querying</h3>
            <p className="text-[#888] leading-relaxed mb-6">
              Interact directly with the data using natural language. For example, ask:<br/><br/>
              <span className="font-mono text-cyan-400/80 text-sm bg-[#0A0A0A] p-2 border border-[#222] block">$&gt; Which region is underperforming?</span><br/>
              The system analyzes the dataset context and streams a direct, actionable answer.
            </p>
          </div>

          <div className="panel-glow border border-[#222] bg-[#111]/80 backdrop-blur-md p-8 hover-glow-purple rounded-[1px]">
            <Cpu className="w-5 h-5 text-purple-400 mb-4" />
            <h3 className="text-white font-medium mb-4">Technical Foundation</h3>
            <p className="text-[#888] leading-relaxed">
              Built using <strong>Next.js 15</strong>, featuring a modular backend architecture, and integrated seamlessly with the <strong>Google Gemini API</strong> for generating live insights and decision recommendations. Scalable, fast, and easily extendable for real-world telemetry use cases.
            </p>
          </div>
        </div>
      </section>

      {/* Founder's Footer */}
      <footer className="relative px-6 max-w-5xl mx-auto py-16 text-center border-t border-[#222] mt-10 z-10">
        <p className="text-lg text-[#ccc] font-light max-w-2xl mx-auto italic mb-6">
          &quot;For me, this project is about building systems that turn data into decisions, not just dashboards. That&apos;s the kind of problem I enjoy working on.&quot;
        </p>
        <p className="text-xs text-[#555] font-mono uppercase tracking-widest mb-6">
          — Soham Sharma | InsightOS Architect
        </p>
        <div className="flex items-center justify-center gap-6">
          <a href="https://linkedin.com/in/sohamsharma21" target="_blank" rel="noreferrer" className="text-[10px] text-cyan-500/70 hover:text-cyan-400 font-mono tracking-widest transition-colors hover:shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            [ LINKEDIN ]
          </a>
          <a href="mailto:sohamsharmapcm@gmail.com" className="text-[10px] text-cyan-500/70 hover:text-cyan-400 font-mono tracking-widest transition-colors hover:shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            [ EMAIL ]
          </a>
        </div>
      </footer>
    </div>
  );
}
