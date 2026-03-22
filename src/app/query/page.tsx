"use client";

import { ChatInterface } from "@/components/chat-interface";

export default function QueryPage() {
  return (
    <div className="p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="text-[12px] text-[#888]">AI Query</span>
        <span className="text-[10px] text-[#333] font-mono">|</span>
        <span className="text-[10px] text-[#444] font-mono">Natural language data query</span>
      </div>

      {/* Chat panel */}
      <div className="border border-[#222] bg-[#111]/80 backdrop-blur-sm hover-glow-cyan panel-glow transition-all rounded-[1px]">
        <div className="px-3 py-1.5 border-b border-[#1c1c1c] flex items-center justify-between">
          <span className="text-[10px] text-[#555] font-mono uppercase">Query Interface</span>
          <span className="text-[9px] text-[#333] font-mono">powered by gemini</span>
        </div>
        <div className="p-3">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
}
