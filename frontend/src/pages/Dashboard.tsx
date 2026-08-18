import React from 'react';
import { Link } from 'react-router-dom';
import {
  Image as ImageIcon,
  Cpu,
  Info,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Activity,
  Layers,
  Award
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const cards = [
    {
      to: '/image',
      title: 'Image Analysis',
      desc: 'Inspect single images for FFT frequency noise, facial blending seams, and ViT-B/16 semantic consistency.',
      icon: ImageIcon,
      tag: 'Primary Workspace',
      color: 'from-indigo-500/20 via-slate-900 to-slate-900 border-indigo-500/30'
    },
    {
      to: '/architecture',
      title: 'System Architecture',
      desc: 'Explore technical specifications of Level 1–3 experts, transfer learning, and weighted ensemble decision logic.',
      icon: Cpu,
      tag: 'Documentation',
      color: 'from-blue-500/20 via-slate-900 to-slate-900 border-blue-500/30'
    },
    {
      to: '/about',
      title: 'About Project',
      desc: 'Learn about the research background, intended forensic use cases, model architectures, and project details.',
      icon: Info,
      tag: 'Overview',
      color: 'from-purple-500/20 via-slate-900 to-slate-900 border-purple-500/30'
    }
  ];

  return (
    <div className="space-y-10">
      {/* Hero Banner Section */}
      <div className="glass-card p-8 md:p-10 relative overflow-hidden bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border-indigo-500/30">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-xs font-semibold text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Commercial-Grade Multi-Level Forensics</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            AI Image Authenticity Detection Platform
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Commercial-grade multi-level AI forensic engine for detecting AI-generated and manipulated images using CNNs, FFT analysis, facial integrity verification, and Vision Transformers.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to="/image"
              className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2"
            >
              <span>Launch Image Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/architecture"
              className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-800 border border-white/10 text-slate-200 font-bold rounded-xl text-sm transition-all"
            >
              View System Architecture
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white tracking-tight">System Navigation</h3>
          <span className="text-xs text-slate-400 font-mono">Select workspace to proceed</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c, idx) => {
            const Icon = c.icon;
            return (
              <Link
                key={idx}
                to={c.to}
                className={`glass-card p-6 bg-gradient-to-br ${c.color} glass-card-hover flex flex-col justify-between group space-y-4`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-slate-900/80 border border-white/10 rounded-2xl text-indigo-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                      {c.tag}
                    </span>
                  </div>

                  <h4 className="text-xl font-extrabold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                    {c.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {c.desc}
                  </p>
                </div>

                <div className="flex items-center text-xs font-bold text-indigo-400 group-hover:translate-x-1 transition-transform">
                  <span>Open Section</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Model & Architecture Overview Section */}
      <div className="glass-panel p-6 space-y-4">
        <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
          🧠 Hierarchical Deep Learning Model Architecture
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-slate-900/60 border border-white/5 rounded-2xl space-y-1.5">
            <span className="font-mono text-[10px] text-indigo-400 font-bold">LEVEL 1</span>
            <p className="font-bold text-white text-sm">Hybrid CNN + FFT Analysis</p>
            <p className="text-[11px] text-slate-400">2D Log-Magnitude spectral grid noise & spatial Conv2D features</p>
          </div>

          <div className="p-4 bg-slate-900/60 border border-white/5 rounded-2xl space-y-1.5">
            <span className="font-mono text-[10px] text-blue-400 font-bold">LEVEL 2</span>
            <p className="font-bold text-white text-sm">MobileNetV2 Face Integrity Expert</p>
            <p className="text-[11px] text-slate-400">Haar Cascade (30% crop margin) & MobileNetV2 facial crop scoring</p>
          </div>

          <div className="p-4 bg-slate-900/60 border border-white/5 rounded-2xl space-y-1.5">
            <span className="font-mono text-[10px] text-purple-400 font-bold">LEVEL 3</span>
            <p className="font-bold text-white text-sm">Vision Transformer (ViT-B/16)</p>
            <p className="text-[11px] text-slate-400">Fine-tuned top 4 Transformer Encoder layers for lighting & shadow realism</p>
          </div>

          <div className="p-4 bg-slate-900/60 border border-white/5 rounded-2xl space-y-1.5">
            <span className="font-mono text-[10px] text-emerald-400 font-bold">ENSEMBLE</span>
            <p className="font-bold text-white text-sm">Ensemble Decision Engine</p>
            <p className="text-[11px] text-slate-400">Adaptive weighted fusion & face manipulation score override</p>
          </div>
        </div>
      </div>
    </div>
  );
};
