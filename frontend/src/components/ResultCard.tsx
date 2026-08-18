import React from 'react';
import { CircularProgress } from './CircularProgress';
import { ShieldCheck, AlertTriangle, ShieldAlert, Download, Cpu, Award } from 'lucide-react';
import { ImageAnalysisResponse } from '../api/client';

interface ResultCardProps {
  result: ImageAnalysisResponse;
  onDownloadReport?: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onDownloadReport }) => {
  const { final_ai_percentage, verdict, decision_mode, level3_details } = result;

  const humanPercentage = Math.max(0, 100 - final_ai_percentage);
  const confidence = (level3_details?.confidence ?? 0.85) * 100;

  let config = {
    label: 'HUMAN / AUTHENTIC MEDIA',
    color: '#10B981',
    bg: 'from-emerald-500/10 via-slate-900/80 to-slate-900/90',
    border: 'border-emerald-500/30',
    badgeBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    icon: ShieldCheck,
    risk: 'LOW RISK (AUTHENTIC)'
  };

  if (verdict === 'AI Generated') {
    config = {
      label: 'AI GENERATED (SYNTHETIC)',
      color: '#EF4444',
      bg: 'from-rose-500/10 via-slate-900/80 to-slate-900/90',
      border: 'border-rose-500/30',
      badgeBg: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
      icon: ShieldAlert,
      risk: 'CRITICAL RISK (SYNTHETIC)'
    };
  } else if (verdict === 'Uncertain') {
    config = {
      label: 'SUSPICIOUS / UNCERTAIN',
      color: '#F59E0B',
      bg: 'from-amber-500/10 via-slate-900/80 to-slate-900/90',
      border: 'border-amber-500/30',
      badgeBg: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
      icon: AlertTriangle,
      risk: 'MODERATE RISK (MANUAL REVIEW)'
    };
  }

  const StatusIcon = config.icon;

  return (
    <div className={`glass-card p-8 bg-gradient-to-b ${config.bg} border ${config.border} space-y-8 relative overflow-hidden`}>
      {/* Top Banner Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl border ${config.badgeBg}`}>
            <StatusIcon className="w-6 h-6" />
          </div>
          <div>
            <span className={`inline-block px-3 py-1 text-xs font-extrabold tracking-wider rounded-full border ${config.badgeBg} uppercase mb-1`}>
              Verdict: {verdict.toUpperCase()}
            </span>
            <h3 className="text-2xl font-black text-white tracking-tight">{config.label}</h3>
          </div>
        </div>

        {onDownloadReport && (
          <button
            onClick={onDownloadReport}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 rounded-xl text-xs font-bold transition-all shadow-lg hover:shadow-indigo-500/20"
          >
            <Download className="w-4 h-4" />
            <span>Download Report (PDF)</span>
          </button>
        )}
      </div>

      {/* Main Meter & Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Circular Gauge */}
        <div className="md:col-span-5 flex justify-center py-4">
          <CircularProgress
            percentage={final_ai_percentage}
            size={180}
            strokeWidth={14}
            color={config.color}
          />
        </div>

        {/* Right Metric Tiles */}
        <div className="md:col-span-7 grid grid-cols-2 gap-4">
          <div className="bg-slate-900/60 border border-white/5 p-4 rounded-2xl">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
              AI Probability
            </span>
            <span className="text-2xl font-black text-white" style={{ color: config.color }}>
              {final_ai_percentage.toFixed(2)}%
            </span>
          </div>

          <div className="bg-slate-900/60 border border-white/5 p-4 rounded-2xl">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
              Human Probability
            </span>
            <span className="text-2xl font-black text-emerald-400">
              {humanPercentage.toFixed(2)}%
            </span>
          </div>

          <div className="bg-slate-900/60 border border-white/5 p-4 rounded-2xl">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
              Confidence Score
            </span>
            <span className="text-xl font-black text-indigo-300">
              {confidence.toFixed(1)}%
            </span>
          </div>

          <div className="bg-slate-900/60 border border-white/5 p-4 rounded-2xl">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
              Decision Mode
            </span>
            <span className="text-xs font-bold text-slate-300 block truncate mt-1">
              {decision_mode}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
