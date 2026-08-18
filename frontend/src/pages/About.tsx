import React from 'react';
import { Info, ShieldCheck, Users, Database, Github, ExternalLink, Cpu, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-panel p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl text-indigo-400">
            <Info className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white tracking-tight">About Project</h3>
            <p className="text-xs text-slate-400 mt-1">
              Hierarchical Digital Image Forensic Detection System
            </p>
          </div>
        </div>

        {/* Updated Exact Description Requirement */}
        <p className="text-sm text-slate-200 leading-relaxed font-medium bg-slate-900/60 p-4 rounded-2xl border border-white/5">
          This platform is an AI-powered image authenticity detection system that uses a hierarchical ensemble of deep learning models to identify AI-generated and manipulated images through frequency-domain analysis, facial integrity verification, and semantic consistency evaluation.
        </p>
      </div>

      {/* Deep Learning Architecture Stack */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
          🧠 Integrated AI Model Ensemble
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card p-5 space-y-2">
            <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
              Level 1
            </span>
            <h5 className="font-bold text-sm text-white">Hybrid CNN + FFT Analysis</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Detects high-frequency spectral noise grid anomalies and upscaling artifacts using 2D Fast Fourier Transform (FFT) log-magnitude spectra and spatial Conv2D feature maps.
            </p>
          </div>

          <div className="glass-card p-5 space-y-2">
            <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
              Level 2
            </span>
            <h5 className="font-bold text-sm text-white">MobileNetV2 Face Integrity Expert</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Detects facial blending seams, eye/mouth warping, and deepfake face-swapping using OpenCV Haar Cascade face detection with a 30% margin bounding box crop.
            </p>
          </div>

          <div className="glass-card p-5 space-y-2">
            <span className="text-[10px] font-mono font-bold text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
              Level 3
            </span>
            <h5 className="font-bold text-sm text-white">Vision Transformer (ViT-B/16)</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fine-tuned top 4 Transformer Encoder layers evaluating global scene context, lighting direction consistency, shadow placement, and physical plausibility.
            </p>
          </div>

          <div className="glass-card p-5 space-y-2">
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Level 4
            </span>
            <h5 className="font-bold text-sm text-white">Ensemble Decision Engine</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Aggregates predictions from all expert models using adaptive weighted fusion and face manipulation score overrides to calculate the final AI authenticity score.
            </p>
          </div>
        </div>
      </div>

      {/* GitHub Repository Link */}
      <div className="glass-panel p-6 space-y-4">
        <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
          ⭐ Source Code & Repository
        </h4>
        
        <p className="text-xs text-slate-300 leading-relaxed">
          Access the complete codebase, system architecture specifications, and implementation details on GitHub.
        </p>

        <a
          href="https://github.com/Prashanth28222/Multilevel-Forensic-Intelligence-Hub"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 rounded-xl text-xs font-bold transition-all shadow-sm"
        >
          <Github className="w-4 h-4" />
          <span>GitHub Repository</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>
      </div>
    </div>
  );
};
