import React from 'react';
import { Activity, Sparkles, Terminal } from 'lucide-react';

interface NavbarProps {
  title: string;
  subtitle?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ title, subtitle }) => {
  return (
    <header className="sticky top-0 z-20 bg-[#070A12]/80 backdrop-blur-xl border-b border-white/5 px-8 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Status indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 border border-white/5 rounded-full text-xs text-slate-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[11px]">API Port :8000</span>
        </div>

        {/* Engine Mode */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-medium text-indigo-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Multi-Level Active</span>
        </div>
      </div>
    </header>
  );
};
