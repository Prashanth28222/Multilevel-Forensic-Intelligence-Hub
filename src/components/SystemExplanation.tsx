import React from 'react';
import { FileText, Cpu, CheckCircle2, Clock, Sparkles } from 'lucide-react';

interface SystemExplanationProps {
  explanation?: string;
  filename?: string;
}

export const SystemExplanation: React.FC<SystemExplanationProps> = ({
  explanation,
  filename
}) => {
  const steps = [
    { title: 'Media Ingestion & Grayscale FFT', desc: 'Extracted spatial residual noise & Fourier log-magnitude spectrum' },
    { title: 'Facial Integrity & Seam Crop', desc: 'Haar cascade 30% margin detection & MobileNetV2 classification' },
    { title: 'Semantic Realism ViT Inspection', desc: 'Vision Transformer (ViT-B/16) lighting & shadow evaluation' },
    { title: 'Weighted Ensemble Aggregation', desc: 'Calculated decision mode & weighted probabilistic score' },
    { title: 'LLM Rationale Generation', desc: 'OpenAI GPT-4o-mini forensic rationale text generation' }
  ];

  return (
    <div className="glass-panel p-6 space-y-6">
      {/* Title */}
      <div className="flex items-center gap-3 border-b border-white/5 pb-4">
        <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-400">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">System Explanation</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Automated forensic rationale & execution timeline
          </p>
        </div>
      </div>

      {/* Processing Timeline */}
      <div className="space-y-3">
        <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-widest block mb-2">
          ⚡ Forensic Pipeline Execution Timeline
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {steps.map((step, idx) => (
            <div key={idx} className="p-3 bg-slate-900/60 border border-white/5 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-indigo-300">
                <span>Step {idx + 1}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <p className="text-xs font-semibold text-white leading-tight">{step.title}</p>
              <p className="text-[10px] text-slate-400 leading-snug">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Explanation Rationale Box */}
      <div className="p-5 bg-slate-900/80 border border-white/5 rounded-2xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Forensic Analyst Text Rationale</span>
        </div>
        
        <div className="text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-line bg-slate-950/60 p-4 rounded-xl border border-white/5">
          {explanation || 'System evaluation completed successfully across all active expert modules.'}
        </div>
      </div>
    </div>
  );
};
