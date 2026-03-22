"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { DataSummary, generateDataSummary, cleanData } from "@/lib/data-parser";
import { AIInsight, ChatMessage, DataAnalysisSummary } from "@/lib/ai";

interface DataContextType {
  rawData: Record<string, unknown>[];
  setRawData: (data: Record<string, unknown>[]) => void;
  dataSummary: DataSummary | null;
  isDataLoaded: boolean;
  loadData: (data: Record<string, unknown>[]) => void;
  clearData: () => void;
  insights: AIInsight[];
  setInsights: (insights: AIInsight[]) => void;
  chatHistory: ChatMessage[];
  setChatHistory: (history: ChatMessage[]) => void;
  addChatMessage: (message: ChatMessage) => void;
  isLoadingInsights: boolean;
  setIsLoadingInsights: (loading: boolean) => void;
  analysis: DataAnalysisSummary | null;
  setAnalysis: (analysis: DataAnalysisSummary | null) => void;
  isLoadingAnalysis: boolean;
  setIsLoadingAnalysis: (loading: boolean) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [rawData, setRawData] = useState<Record<string, unknown>[]>([]);
  const [dataSummary, setDataSummary] = useState<DataSummary | null>(null);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [analysis, setAnalysis] = useState<DataAnalysisSummary | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);

  const loadData = (data: Record<string, unknown>[]) => {
    const cleaned = cleanData(data);
    setRawData(cleaned);
    const summary = generateDataSummary(cleaned);
    setDataSummary(summary);
    setInsights([]);
    setChatHistory([]);
    setAnalysis(null);

    // Auto-trigger AI analysis on data load
    setIsLoadingAnalysis(true);
    fetch("/api/analysis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dataSummary: JSON.stringify(summary) }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.analysis) {
          setAnalysis(data.analysis);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoadingAnalysis(false));
  };

  const clearData = () => {
    setRawData([]);
    setDataSummary(null);
    setInsights([]);
    setChatHistory([]);
    setAnalysis(null);
  };

  const addChatMessage = (message: ChatMessage) => {
    setChatHistory((prev) => [...prev, message]);
  };

  return (
    <DataContext.Provider
      value={{
        rawData,
        setRawData,
        dataSummary,
        isDataLoaded: rawData.length > 0,
        loadData,
        clearData,
        insights,
        setInsights,
        chatHistory,
        setChatHistory,
        addChatMessage,
        isLoadingInsights,
        setIsLoadingInsights,
        analysis,
        setAnalysis,
        isLoadingAnalysis,
        setIsLoadingAnalysis,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
