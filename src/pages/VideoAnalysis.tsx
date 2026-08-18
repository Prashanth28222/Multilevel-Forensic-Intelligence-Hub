import React, { useState } from 'react';
import { Dropzone } from '../components/Dropzone';
import { LoadingState } from '../components/LoadingState';
import { api, VideoAnalysisResponse } from '../api/client';
import { Video as VideoIcon, Sparkles, AlertCircle, Film, CheckCircle2 } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export const VideoAnalysis: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VideoAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setVideoPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl);
      setVideoPreviewUrl(null);
    }
    setResult(null);
    setError(null);
  };

  const handleRunAnalysis = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError(null);

    try {
      const res = await api.analyzeVideo(selectedFile);
      setResult(res);
    } catch (err: any) {
      setError(err?.response?.data?.detail || err?.message || 'Error executing video forensic evaluation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div className="glass-panel p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
            <VideoIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Video Temporal Forensics Workspace</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Upload a video (MP4, MOV, AVI) for uniform keyframe extraction & temporal analysis
            </p>
          </div>
        </div>

        <Dropzone
          onFileSelect={handleFileSelect}
          accept={{ 'video/*': ['.mp4', '.mov', '.avi'] }}
          selectedFiles={selectedFile ? [selectedFile] : []}
          onClearFile={handleClearFile}
        />
      </div>

      {/* Video Preview & Analyze Action */}
      {selectedFile && videoPreviewUrl && !loading && !result && (
        <div className="glass-panel p-6 space-y-6">
          <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
            Video Preview & Sampling Parameters
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-1 rounded-2xl overflow-hidden border border-white/10 max-h-64 flex justify-center bg-slate-950">
              <video src={videoPreviewUrl} controls className="max-h-64 w-full object-contain" />
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-900/60 border border-white/5 rounded-xl">
                  <span className="text-slate-400 block mb-0.5">Filename</span>
                  <span className="font-bold text-white truncate block">{selectedFile.name}</span>
                </div>
                <div className="p-3 bg-slate-900/60 border border-white/5 rounded-xl">
                  <span className="text-slate-400 block mb-0.5">Keyframe Count</span>
                  <span className="font-bold text-cyan-400">15–20 Uniform Keyframes</span>
                </div>
              </div>

              <button
                onClick={handleRunAnalysis}
                className="w-full py-4 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold rounded-xl text-base transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Run Video Temporal Keyframe Analysis</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Message Display */}
      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center gap-3 text-xs text-rose-300 font-semibold">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading Animation */}
      {loading && (
        <LoadingState
          title="Extracting Keyframes & Running Temporal Evaluation..."
          subtitle="Sampling uniform video keyframes and analyzing frame-by-frame frequency & facial integrity..."
        />
      )}

      {/* Video Forensic Results */}
      {result && (
        <div className="space-y-8">
          {/* Verdict Banner */}
          <div className={`glass-card p-8 bg-gradient-to-b ${
            result.verdict === 'AI Generated'
              ? 'from-rose-500/10 via-slate-900/80 to-slate-900/90 border-rose-500/30'
              : 'from-emerald-500/10 via-slate-900/80 to-slate-900/90 border-emerald-500/30'
          } border space-y-6`}>
            <div className="flex items-center justify-between">
              <div>
                <span className={`inline-block px-3 py-1 text-xs font-extrabold tracking-wider rounded-full border ${
                  result.verdict === 'AI Generated'
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                    : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                } uppercase mb-2`}>
                  Final Video Verdict: {result.verdict.toUpperCase()}
                </span>
                <h3 className="text-3xl font-black text-white tracking-tight">
                  {result.verdict === 'AI Generated' ? 'Synthetic / AI Video Detected' : 'Authentic / Real Video Content'}
                </h3>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Average AI Probability
                </span>
                <span className={`text-4xl font-black ${
                  result.verdict === 'AI Generated' ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {result.video_ai_percentage.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-900/60 border border-white/5 p-4 rounded-2xl">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                  Frames Extracted & Analyzed
                </span>
                <span className="text-2xl font-black text-white">{result.frames_analyzed} Keyframes</span>
              </div>

              <div className="bg-slate-900/60 border border-white/5 p-4 rounded-2xl">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                  Peak Frame AI Risk
                </span>
                <span className="text-2xl font-black text-rose-400">
                  {(result.max_frame_fake_probability * 100).toFixed(2)}%
                </span>
              </div>

              <div className="bg-slate-900/60 border border-white/5 p-4 rounded-2xl">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                  Average Frame Risk
                </span>
                <span className="text-2xl font-black text-indigo-300">
                  {(result.average_frame_fake_probability * 100).toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          {/* Recharts Frame-by-Frame Line Chart */}
          <div className="glass-panel p-6 space-y-4">
            <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
              📈 Frame-by-Frame Temporal AI Risk Chart
            </h4>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={result.frame_breakdown}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="frame_index" stroke="#64748B" tickFormatter={(v) => `Frame ${v + 1}`} />
                  <YAxis stroke="#64748B" domain={[0, 100]} unit="%" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#FFF'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="ai_percentage"
                    name="AI Risk %"
                    stroke="#6366F1"
                    strokeWidth={3}
                    dot={{ fill: '#06B6D4', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Explanation Box */}
          <div className="glass-panel p-6 space-y-3">
            <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
              🧾 Video Forensic Rationale
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-950/60 p-4 rounded-xl border border-white/5">
              {result.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
