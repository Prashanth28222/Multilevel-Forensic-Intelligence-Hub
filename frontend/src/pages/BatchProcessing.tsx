import React, { useState } from 'react';
import { Dropzone } from '../components/Dropzone';
import { LoadingState } from '../components/LoadingState';
import { api, BatchAnalysisResponse } from '../api/client';
import { Layers, Sparkles, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

export const BatchProcessing: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BatchAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles((prev) => [...prev, ...files]);
    setResult(null);
    setError(null);
  };

  const handleClearFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setResult(null);
    setError(null);
  };

  const handleRunBatchAnalysis = async () => {
    if (selectedFiles.length === 0) return;
    setLoading(true);
    setError(null);

    try {
      const res = await api.analyzeBatch(selectedFiles);
      setResult(res);
    } catch (err: any) {
      setError(err?.response?.data?.detail || err?.message || 'Error executing batch analysis.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div className="glass-panel p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Multi-Media Batch Processing</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Upload multiple images to evaluate risk distribution simultaneously
            </p>
          </div>
        </div>

        <Dropzone
          onFileSelect={handleFileSelect}
          multiple={true}
          selectedFiles={selectedFiles}
          onClearFile={handleClearFile}
        />

        {selectedFiles.length > 0 && !loading && !result && (
          <button
            onClick={handleRunBatchAnalysis}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl text-base transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Execute Batch Analysis ({selectedFiles.length} Media Files)</span>
          </button>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center gap-3 text-xs text-rose-300 font-semibold">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading Screen */}
      {loading && (
        <LoadingState
          title={`Evaluating Batch of ${selectedFiles.length} Media Files...`}
          subtitle="Running multi-level neural experts concurrently across uploaded batch files..."
        />
      )}

      {/* Batch Results Dashboard */}
      {result && (
        <div className="space-y-8">
          {/* Summary Header Cards */}
          <div className="glass-panel p-6 space-y-6">
            <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
              📊 Aggregate Batch Risk Summary
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="bg-slate-900/60 border border-white/5 p-4 rounded-2xl text-center">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                  Total Files
                </span>
                <span className="text-2xl font-black text-white">{result.summary.total_images}</span>
              </div>

              <div className="bg-slate-900/60 border border-white/5 p-4 rounded-2xl text-center">
                <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider block mb-1">
                  Authentic
                </span>
                <span className="text-2xl font-black text-emerald-400">{result.summary.real_count}</span>
              </div>

              <div className="bg-slate-900/60 border border-white/5 p-4 rounded-2xl text-center">
                <span className="text-[10px] font-extrabold text-rose-400 uppercase tracking-wider block mb-1">
                  AI Generated
                </span>
                <span className="text-2xl font-black text-rose-400">{result.summary.ai_count}</span>
              </div>

              <div className="bg-slate-900/60 border border-white/5 p-4 rounded-2xl text-center">
                <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block mb-1">
                  Uncertain
                </span>
                <span className="text-2xl font-black text-amber-400">{result.summary.uncertain_count}</span>
              </div>

              <div className="bg-slate-900/60 border border-white/5 p-4 rounded-2xl text-center">
                <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-wider block mb-1">
                  Avg Batch Risk
                </span>
                <span className="text-2xl font-black text-indigo-300">
                  {result.summary.average_ai_percentage.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Individual Results Grid */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
              🔎 Individual Media Results ({result.items.length})
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.items.map((item, idx) => {
                const isAI = item.verdict === 'AI Generated';
                const isReal = item.verdict === 'Authentic';

                return (
                  <div key={idx} className="glass-card p-5 space-y-3 border-white/5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white truncate max-w-[200px]">
                        {item.filename}
                      </span>
                      <span className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-full uppercase border ${
                        isAI ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' : (isReal ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border-amber-500/40')
                      }`}>
                        {item.verdict}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-400">AI Risk Index</span>
                        <span className={isAI ? 'text-rose-400' : 'text-emerald-400'}>
                          {item.final_ai_percentage.toFixed(2)}%
                        </span>
                      </div>

                      <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/5">
                        <div
                          className={`h-full rounded-full ${
                            isAI ? 'bg-gradient-to-r from-indigo-500 to-rose-500' : 'bg-gradient-to-r from-indigo-500 to-emerald-500'
                          }`}
                          style={{ width: `${Math.min(100, Math.max(0, item.final_ai_percentage))}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
