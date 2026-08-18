import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShieldAlert,
  LayoutDashboard,
  Image as ImageIcon,
  Cpu,
  Info,
  Github,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/image', label: 'Image Analysis', icon: ImageIcon },
    { to: '/architecture', label: 'System Architecture', icon: Cpu },
    { to: '/about', label: 'About Project', icon: Info },
  ];

  return (
    <aside className="w-72 bg-[#0F172A] border-r border-white/5 flex flex-col h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-white/5 flex items-center gap-3">
        <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-400">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-extrabold text-lg text-white tracking-tight leading-none">
            AUTHENTICITY<span className="text-indigo-400">.AI</span>
          </h1>
          <p className="text-[11px] font-mono text-slate-400 mt-1">Image Forensic Platform</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        <div className="px-3 mb-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600/30 to-blue-600/20 border border-indigo-500/40 text-white font-semibold shadow-lg shadow-indigo-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`
              }
            >
              <Icon className="w-4 h-4 text-indigo-400" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Footer Info Box */}
      <div className="p-4 m-4 bg-[#111827]/80 border border-white/5 rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300">Models Operational</span>
          <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" /> Ready
          </span>
        </div>

        {/* Updated Model Information Panel */}
        <div className="space-y-1 text-[11px] text-slate-300 leading-relaxed font-medium">
          <p className="flex items-center gap-1.5"><span className="text-indigo-400">•</span> Hybrid CNN + FFT Analysis</p>
          <p className="flex items-center gap-1.5"><span className="text-blue-400">•</span> MobileNetV2 Face Integrity Expert</p>
          <p className="flex items-center gap-1.5"><span className="text-purple-400">•</span> Vision Transformer (ViT-B/16)</p>
          <p className="flex items-center gap-1.5"><span className="text-emerald-400">•</span> Ensemble Decision Engine</p>
        </div>

        {/* Updated GitHub Button */}
        <a
          href="https://github.com/Prashanth28222/Multilevel-Forensic-Intelligence-Hub"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 rounded-xl text-xs font-bold text-indigo-300 transition-colors shadow-sm"
        >
          <Github className="w-4 h-4" />
          <span>GitHub Repository</span>
          <ExternalLink className="w-3 h-3 opacity-70" />
        </a>
      </div>
    </aside>
  );
};
