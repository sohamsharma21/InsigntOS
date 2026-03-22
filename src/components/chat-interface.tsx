"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { useData } from "@/context/data-context";
import { ChatMessage } from "@/lib/ai";

const examplePrompts = [
  "Which region is underperforming?",
  "What should I do next?",
  "Predict next quarter",
  "Top performing products?",
  "Where to invest resources?",
  "What risks to watch?",
];

function renderLine(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-cyan-100 font-medium">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function MessageContent({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <div className="space-y-0.5">
      {lines.map((line, i) => {
        if (line.trim() === "") return <div key={i} className="h-1.5" />;

        if (line.includes("|") && line.trim().startsWith("|")) {
          const cells = line.split("|").filter((c) => c.trim()).map((c) => c.trim());
          if (cells.every((c) => /^[-:]+$/.test(c))) return null;
          return (
            <div key={i} className="flex gap-4 text-[10px] font-mono py-0.5 px-1 hover:bg-[#161616] border-b border-[#222]">
              {cells.map((cell, j) => (
                <span key={j} className={`flex-1 ${i === 2 ? 'text-cyan-400/80 font-bold' : 'text-[#888]'}`}>{renderLine(cell)}</span>
              ))}
            </div>
          );
        }

        if (line.match(/^[\s]*[-•]\s/)) {
          return (
            <div key={i} className="flex items-start gap-1.5 ml-1">
              <span className="text-cyan-500/60 text-[10px]">·</span>
              <span className="text-[11px]">{renderLine(line.replace(/^[\s]*[-•]\s/, ""))}</span>
            </div>
          );
        }

        if (line.match(/^[\s]*\d+\.\s/)) {
          const match = line.match(/^[\s]*(\d+)\.\s(.*)/);
          if (match) {
            return (
              <div key={i} className="flex items-start gap-1.5 ml-1">
                <span className="text-cyan-500/80 text-[10px] font-mono w-3">{match[1]}.</span>
                <span className="text-[11px]">{renderLine(match[2])}</span>
              </div>
            );
          }
        }

        return (
          <p key={i} className="text-[11px]">{renderLine(line)}</p>
        );
      })}
    </div>
  );
}

export function ChatInterface() {
  const { chatHistory, addChatMessage, dataSummary, isDataLoaded } = useData();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSend = async (message?: string) => {
    const text = message || input.trim();
    if (!text || !dataSummary) return;

    const userMessage: ChatMessage = { role: "user", content: text };
    addChatMessage(userMessage);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: text,
          dataSummary: JSON.stringify(dataSummary),
          history: chatHistory,
        }),
      });

      const data = await response.json();
      addChatMessage({ role: "assistant", content: data.response });
    } catch {
      addChatMessage({ role: "assistant", content: "ERROR: Failed to process query." });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isDataLoaded) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <span className="text-[11px] text-[#444] font-mono">NO DATA LOADED — UPLOAD FROM DASHBOARD</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-11rem)]">
      {/* Messages */}
      <div className="flex-1 overflow-auto pr-2" ref={scrollRef}>
        <div className="space-y-2 pb-3">
          {chatHistory.length === 0 && (
            <div className="py-12 space-y-6">
              <div className="text-center">
                <p className="text-[11px] text-cyan-400 font-mono">QUERY INTERFACE READY</p>
                <p className="text-[10px] text-[#555] font-mono mt-1">Ask your data anything</p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-1.5 max-w-lg mx-auto">
                {examplePrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="text-[10px] text-left px-2.5 py-2 border border-[#222] bg-[#111] text-[#777] hover:text-cyan-400 hover:bg-cyan-500/5 hover:border-cyan-500/20 transition-colors font-mono"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {chatHistory.map((msg, i) => (
            <div key={i} className="animate-fadeIn">
              {msg.role === "user" ? (
                <div className="flex items-start gap-2 px-2 py-1.5 bg-[#0A0A0A]">
                  <span className="text-[10px] text-purple-400 font-mono shrink-0 mt-0.5 border border-purple-400/30 px-1 py-0.5 leading-none">USR</span>
                  <span className="text-[11px] text-[#ccc] font-mono">{msg.content}</span>
                </div>
              ) : (
                <div className="px-2 py-2 bg-[#111] border-l-2 border-cyan-500/50 ml-2">
                  <div className="text-[#999]">
                    <MessageContent content={msg.content} />
                  </div>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="px-2 py-2 bg-[#111] border-l-2 border-cyan-500/50 mt-2 ml-2 animate-fadeIn flex items-center gap-2">
              <span className="text-[10px] text-cyan-500 font-mono animate-pulse">Processing query…</span>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-[#1c1c1c] pt-2 mt-2">
        <div className="flex items-center gap-2 border border-[#222] bg-[#0A0A0A] focus-within:border-cyan-500/50 transition-colors">
          <span className="text-[10px] text-cyan-500 font-mono pl-2.5">❯</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="query..."
            className="flex-1 bg-transparent text-[11px] text-cyan-100 font-mono py-2 outline-none placeholder:text-[#333]"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="px-2.5 py-2 text-cyan-600 hover:text-cyan-400 disabled:text-[#222] transition-colors"
          >
            <Send className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
