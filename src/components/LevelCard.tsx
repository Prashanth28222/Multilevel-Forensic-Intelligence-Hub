import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Activity, UserCheck, Brain, CheckCircle, AlertCircle } from 'lucide-react';

interface LevelCardProps {
  levelNumber: number;
  title: string;
  subtitle: string;
  probability: number; // 0 to 100
  confidence?: number; // 0 to 100
  metrics: Array<{ label: string; value: string | number }>;
  description: string;
  defaultExpanded?: boolean;
}

export const LevelCard: React.FC<LevelCardProps> = ({
  levelNumber,
  title,
  subtitle,
  probability,
  confidence,
  metrics,
  description,
  defaultExpanded = true
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const getIcon = () => {
    switch (levelNumber) {
      case 1:
        return Activity;
      case 2:
        return UserCheck;
      case 3:
        return Brain;
      default:
        return Activity;
    }
  };

  const Icon = getIcon();
  const isHighRisk = probability > 60;
  const statusColor = isHighRisk ? 'text-rose-400' : 'text-emerald-400';
  const progressBg = isHighRisk ? 'bg-gradient-to-r from-indigo-500 to-rose-500' : 'bg-gradient-to-r from-indigo-500 to-emerald-500';

  return (
    <div className="glass-card glass-card-hover overflow-hidden">
      {/* Expander Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 flex items-center justify-between text-left focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl text-indigo-400">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                Level {levelNumber} Expert
              </span>
              <h4 className="text-lg font-bold text-white tracking-tight">{title}</h4>
            </div>
            <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Fake Probability
            </span>
            <span className={`text-lg font-extrabold ${statusColor}`}>
              {probability.toFixed(1)}%
            </span>
          </div>

          <div className="p-2 bg-slate-800/60 rounded-xl text-slate-400 hover:text-white transition-colors">
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </button>

      {/* Expanded Content Body */}
      {expanded && (
        <div className="px-6 pb-6 pt-2 border-t border-white/5 space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Fake Probability Index</span>
              <span className={statusColor}>{probability.toFixed(2)}%</span>
            </div>
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/5">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${progressBg}`}
                style={{ width: `${Math.min(100, Math.max(0, probability))}%` }}
              />
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {metrics.map((m, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-white/5 p-3 rounded-xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                  {m.label}
                </span>
                <span className="text-sm font-black text-slate-100">{m.value}</span>
              </div>
            ))}
          </div>

          {/* Description Box */}
          <div className="p-4 bg-slate-900/40 border border-white/5 rounded-xl text-xs text-slate-300 leading-relaxed">
            {description}
          </div>
        </div>
      )}
    </div>
  );
};
