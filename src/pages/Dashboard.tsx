import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Image as ImageIcon,
  Video as VideoIcon,
  Layers,
  Cpu,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock,
  Activity
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const cards = [
    {
      to: '/image',
      title: 'Image Forensics',
      desc: 'Inspect single image for FFT frequency noise, facial blending seams, and ViT-B/16 semantics.',
      icon: ImageIcon,
      tag: 'Most Popular',
      color: 'from-indigo-500/20 to-cyan-500/10 border-indigo-500/30'
    },
    {
      to: '/video',
      title: 'Video Forensics',
      desc: 'Extract keyframes and aggregate frame-level AI probability scores across temporal video sequences.',
      icon: VideoIcon,
      tag: 'Temporal Expert',
      color: 'from-cyan-500/20 to-emerald-500/10 border-cyan-500/30'
    },
    {
      to: '/batch',
      title: 'Batch Processing',
      desc: 'Upload multiple media files simultaneously to generate aggregate risk statistics and batch reports.',
      icon: Layers,
      tag: 'Bulk Processing',
      color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30'
    },
    {
      to: '/architecture',
      title: 'System Architecture',
      desc: 'Explore technical specifications of Level 1–5 experts, transfer learning, and weighted ensemble math.',
      icon: Cpu,
      tag: 'Documentation',
      color: 'from-emerald-500/20 to-indigo-500/10 border-emerald-500/30'
    }
  ];

  return (
    <div className="space-y-10">
      {/* Hero Banner Section */}
      <div className="glass-panel p-10 relative overflow-hidden bg-gradient-to-r from-indigo-950/40 via-slate-900/80 to-slate-900/90 border-indigo-500/30">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-xs font-semibold text-indigo-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Commercial-Grade Multi-Model AI Forensics</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Detect Deepfakes & Synthetic Media with Multi-Level Neural Experts
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            A hierarchical forensic evaluation system combining signal processing, facial integrity, vision transformers, and temporal keyframe sampling to authenticate digital content.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to="/image"
              className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2"
            >
              <span>Launch Image Forensics</span>
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
          <h3 className="text-xl font-bold text-white tracking-tight">Forensic Workspaces</h3>
          <span className="text-xs text-slate-400 font-mono">Select workspace to begin analysis</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <span>Open Workspace</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 5-Layer Pipeline Summary Bar */}
      <div className="glass-panel p-6 space-y-4">
        <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
          🧠 5-Layer Forensic Domain Architecture
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
          <div className="p-3 bg-slate-900/60 border border-white/5 rounded-xl space-y-1">
            <span className="font-mono text-[10px] text-indigo-400 font-bold">LEVEL 1</span>
            <p className="font-bold text-white">Frequency FFT</p>
            <p className="text-[11px] text-slate-400">2D Log-Magnitude spectral grid noise</p>
          </div>

          <div className="p-3 bg-slate-900/60 border border-white/5 rounded-xl space-y-1">
            <span className="font-mono text-[10px] text-indigo-400 font-bold">LEVEL 2</span>
            <p className="font-bold text-white">Facial Integrity</p>
            <p className="text-[11px] text-slate-400">Haar Cascade crop & MobileNetV2</p>
          </div>

          <div className="p-3 bg-slate-900/60 border border-white/5 rounded-xl space-y-1">
            <span className="font-mono text-[10px] text-indigo-400 font-bold">LEVEL 3</span>
            <p className="font-bold text-white">Semantic Realism</p>
            <p className="text-[11px] text-slate-400">Fine-tuned Vision Transformer (ViT-B/16)</p>
          </div>

          <div className="p-3 bg-slate-900/60 border border-white/5 rounded-xl space-y-1">
            <span className="font-mono text-[10px] text-indigo-400 font-bold">LEVEL 4</span>
            <p className="font-bold text-white">Video Temporal</p>
            <p className="text-[11px] text-slate-400">Uniform keyframe risk aggregation</p>
          </div>

          <div className="p-3 bg-slate-900/60 border border-white/5 rounded-xl space-y-1">
            <span className="font-mono text-[10px] text-indigo-400 font-bold">LEVEL 5</span>
            <p className="font-bold text-white">LLM Rationale</p>
            <p className="text-[11px] text-slate-400">OpenAI GPT-4o-mini rationale generator</p>
          </div>
        </div>
      </div>
    </div>
  );
};
