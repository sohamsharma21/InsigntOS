"use client";

import { useCallback, useState, useRef } from "react";
import { Upload, FileText, Braces, Database, X } from "lucide-react";
import { useData } from "@/context/data-context";
import { sampleData } from "@/lib/sample-data";
import Papa from "papaparse";

export function DataUpload() {
  const { loadData, isDataLoaded, clearData } = useData();
  const [mode, setMode] = useState<"upload" | "json" | null>(null);
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCSVUpload = useCallback(
    (file: File) => {
      setError("");
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.data && results.data.length > 0) {
            loadData(results.data as Record<string, unknown>[]);
            setMode(null);
          } else {
            setError("No valid data found in CSV file.");
          }
        },
        error: () => {
          setError("Failed to parse CSV file.");
        },
      });
    },
    [loadData]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      if (file && file.name.endsWith(".csv")) {
        handleCSVUpload(file);
      } else {
        setError("Please upload a CSV file.");
      }
    },
    [handleCSVUpload]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleCSVUpload(file);
    },
    [handleCSVUpload]
  );

  const handleJSONSubmit = () => {
    setError("");
    try {
      const parsed = JSON.parse(jsonInput);
      if (Array.isArray(parsed) && parsed.length > 0) {
        loadData(parsed);
        setMode(null);
        setJsonInput("");
      } else {
        setError("JSON must be an array of objects.");
      }
    } catch {
      setError("Invalid JSON format.");
    }
  };

  const handleLoadSample = () => {
    loadData(sampleData as unknown as Record<string, unknown>[]);
    setMode(null);
  };

  if (isDataLoaded) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <div className="w-[5px] h-[5px] rounded-full bg-[#3a3] animate-pulseDot" />
          <span className="text-[10px] text-[#555] font-mono">DATA LOADED</span>
        </div>
        <button
          onClick={clearData}
          className="text-[10px] text-[#444] hover:text-[#888] font-mono transition-colors"
        >
          [CLEAR]
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {!mode && (
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setMode("upload")}
            className="flex items-center gap-2 px-3 py-2 border border-[#222] bg-[#111] hover:bg-[#161616] hover:border-[#333] transition-colors text-left"
          >
            <Upload className="w-3 h-3 text-[#555]" />
            <div>
              <p className="text-[11px] text-[#999]">Upload CSV</p>
            </div>
          </button>

          <button
            onClick={() => setMode("json")}
            className="flex items-center gap-2 px-3 py-2 border border-[#222] bg-[#111] hover:bg-[#161616] hover:border-[#333] transition-colors text-left"
          >
            <Braces className="w-3 h-3 text-[#555]" />
            <div>
              <p className="text-[11px] text-[#999]">Paste JSON</p>
            </div>
          </button>

          <button
            onClick={handleLoadSample}
            className="flex items-center gap-2 px-3 py-2 border border-[#222] bg-[#111] hover:bg-[#161616] hover:border-[#333] transition-colors text-left"
          >
            <Database className="w-3 h-3 text-[#555]" />
            <div>
              <p className="text-[11px] text-[#999]">Sample Data</p>
            </div>
          </button>
        </div>
      )}

      {mode === "upload" && (
        <div className="border border-[#222] bg-[#111]">
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#1c1c1c]">
            <span className="text-[10px] text-[#555] font-mono uppercase">Upload CSV</span>
            <button onClick={() => { setMode(null); setError(""); }} className="text-[#444] hover:text-[#888]">
              <X className="w-3 h-3" />
            </button>
          </div>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onClick={() => fileInputRef.current?.click()}
            className={`p-8 text-center cursor-pointer transition-colors ${
              dragActive ? "bg-[#161616]" : "hover:bg-[#0d0d0d]"
            }`}
          >
            <FileText className="w-4 h-4 text-[#444] mx-auto mb-2" />
            <p className="text-[11px] text-[#555]">
              Drop CSV here or <span className="text-[#888] underline">browse</span>
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      )}

      {mode === "json" && (
        <div className="border border-[#222] bg-[#111]">
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#1c1c1c]">
            <span className="text-[10px] text-[#555] font-mono uppercase">Paste JSON</span>
            <button onClick={() => { setMode(null); setError(""); setJsonInput(""); }} className="text-[#444] hover:text-[#888]">
              <X className="w-3 h-3" />
            </button>
          </div>
          <textarea
            placeholder='[{"key": "value"}, ...]'
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="w-full min-h-[120px] bg-[#0d0d0d] text-[#888] font-mono text-[11px] p-3 resize-none border-none outline-none"
          />
          <div className="px-3 py-2 border-t border-[#1c1c1c]">
            <button
              onClick={handleJSONSubmit}
              disabled={!jsonInput.trim()}
              className="text-[10px] font-mono text-[#888] hover:text-[#ccc] disabled:text-[#333] transition-colors"
            >
              [PARSE & LOAD]
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="text-[10px] text-[#a44] font-mono px-2">ERROR: {error}</p>
      )}
    </div>
  );
}
