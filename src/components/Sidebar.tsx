import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShieldAlert,
  LayoutDashboard,
  Image,
  Video,
  Layers,
  Cpu,
  Info,
  Github,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/image', label: 'Image Analysis', icon: Image },
    { to: '/video', label: 'Video Analysis', icon: Video },
    { to: '/batch', label: 'Batch Processing', icon: Layers },
    { to: '/architecture', label: 'System Architecture', icon: Cpu },
    { to: '/about', label: 'About Project', icon: Info },
  ];

  return (
    <aside className="w-72 bg-[#0B0F19] border-r border-white/5 flex flex-col h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-white/5 flex items-center gap-3">
        <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-400">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-extrabold text-lg text-white tracking-tight leading-none">
            AUTHENTICITY<span className="text-indigo-400">.AI</span>
          </h1>
          <p className="text-[11px] font-mono text-slate-500 mt-1">v1.0 • Multi-Level Forensic</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        <div className="px-3 mb-2 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
          Forensic Workspaces
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
                    ? 'bg-gradient-to-r from-indigo-600/20 to-cyan-600/10 border border-indigo-500/30 text-white font-semibold shadow-lg shadow-indigo-500/5'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
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
      <div className="p-4 m-4 bg-slate-900/60 border border-white/5 rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300">Models Operational</span>
          <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" /> Ready
          </span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Hybrid CNN • MobileNetV2 • ViT-B/16 • GPT-4o-mini
        </p>
        
        <a
          href="https://github.com/Shreyas1608/Multilevel-AI-Authenticity-Engine"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-xl text-xs font-semibold text-indigo-300 transition-colors"
        >
          <Github className="w-3.5 h-3.5" />
          <span>GitHub Repository</span>
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>
      </div>
    </aside>
  );
};
