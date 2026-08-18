import React from 'react';
import { Cpu, Sparkles, Activity } from 'lucide-react';

interface LoadingStateProps {
  title?: string;
  subtitle?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  title = 'Running Multi-Level Forensic Evaluation...',
  subtitle = 'Inspecting Frequency Spectral Noise, Facial Integrity, & Semantic Realism...'
}) => {
  return (
    <div className="glass-panel p-12 text-center space-y-6 flex flex-col items-center justify-center min-h-[320px]">
      {/* Animated Radar Circle */}
      <div className="relative flex items-center justify-center">
        <div className="w-24 h-24 rounded-full border-2 border-indigo-500/20 animate-ping absolute" />
        <div className="w-20 h-20 rounded-full border-2 border-cyan-500/40 animate-pulse absolute" />
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 text-white relative z-10">
          <Cpu className="w-8 h-8 animate-spin" style={{ animationDuration: '4s' }} />
        </div>
      </div>

      <div className="space-y-2 max-w-md">
        <h4 className="text-lg font-bold text-white tracking-tight flex items-center justify-center gap-2">
          <span>{title}</span>
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed font-mono">
          {subtitle}
        </p>
      </div>

      {/* Progress ticker */}
      <div className="flex items-center gap-4 text-[11px] font-mono text-indigo-300 bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20">
        <Activity className="w-3.5 h-3.5 animate-pulse text-indigo-400" />
        <span>Level 1 FFT • Level 2 Face Seams • Level 3 ViT-B/16</span>
      </div>
    </div>
  );
};
