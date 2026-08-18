import React from 'react';
import { Cpu, Activity, UserCheck, Brain, FileText, CheckCircle2 } from 'lucide-react';

export const SystemArchitecture: React.FC = () => {
  const levels = [
    {
      level: 'Level 1',
      title: 'Frequency & Noise Artifact Expert',
      model: 'Hybrid CNN + FFT Analysis',
      technique: '2D Fast Fourier Transform (FFT) + Spatial Conv2D',
      desc: 'Converts input to Grayscale, resizes to 32x32. Spatial branch computes Conv2D features. Frequency branch computes 2D Fast Fourier Transform (torch.fft.fft2), shifts zero-frequency (fftshift), calculates log-magnitude spectrum (torch.log1p), and passes through Conv2D. Features concatenate into a 256-channel classifier.'
    },
    {
      level: 'Level 2',
      title: 'Facial Integrity & Deepfake Expert',
      model: 'MobileNetV2 Face Integrity Expert',
      technique: 'Haar Cascade (30% crop margin) + MobileNetV2 classification',
      desc: 'Detects frontal human faces using OpenCV CascadeClassifier (scaleFactor=1.1, minNeighbors=5). Bounding boxes are expanded by a 30% margin to capture chin, hairline, and facial seams. Crops resize to 128x128 and pass through MobileNetV2 for deepfake scoring.'
    },
    {
      level: 'Level 3',
      title: 'Semantic & Structural Realism Expert',
      model: 'Vision Transformer (ViT-B/16)',
      technique: 'Fine-Tuned Top 4 Transformer Encoder Layers',
      desc: 'Pre-trained ViT-B/16 model on ImageNet-1K. Lower transformer blocks (0-7) are frozen to preserve global feature extraction, while top 4 Transformer Encoder layers (encoder.layers[-4:]) are fine-tuned to evaluate lighting, shadow consistency, and anatomical realism.'
    },
    {
      level: 'Level 4',
      title: 'Ensemble Decision Engine',
      model: 'Ensemble Decision Engine',
      technique: 'Adaptive Weighted Fusion & Score Override',
      desc: 'Aggregates predictions from all active expert models using conditional weighted fusion. If strong facial manipulation is detected (Level 2 fake score > 0.80), the facial score overrides the ensemble to prevent false negatives.'
    },
    {
      level: 'Level 5',
      title: 'AI Explanation & Reasoning Engine',
      model: 'LLM (OpenAI gpt-4o-mini) + Rule Fallback',
      technique: 'Contextual prompt rationale generation with guardrails',
      desc: 'Constructs structured JSON payload of expert scores and queries OpenAI gpt-4o-mini to produce human-understandable forensic explanations. Features local rule-based fallback if API key is absent.'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Overview Card */}
      <div className="glass-panel p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl text-indigo-400">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white tracking-tight">System Architecture Sitemap</h3>
            <p className="text-xs text-slate-400 mt-1">
              Hierarchical Forensic Domain Architecture & Weighted Ensemble Math
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The engine replaces monolithic classifiers with a multi-level expert ensemble. Input images undergo simultaneous forensic inspection across physical and structural domain perspectives before an ensemble fusion engine aggregates scores into a final verdict.
        </p>
      </div>

      {/* Weighted Ensemble Formula Card */}
      <div className="glass-card p-6 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border-indigo-500/30 space-y-4">
        <h4 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">
          ⚙️ Ensemble Weighted Fusion Math
        </h4>

        <div className="p-4 bg-slate-950/80 border border-white/5 rounded-2xl text-xs font-mono text-slate-200 leading-relaxed space-y-2">
          <p className="text-indigo-400 font-bold">// Face Override Condition:</p>
          <p>if (Face_Detected AND Level2_Fake &gt; 0.80) &#123; Final_Fake = Level2_Fake; &#125;</p>
          <p className="text-indigo-400 font-bold mt-2">// Weighted Fusion (Face Present):</p>
          <p>else if (Face_Detected) &#123; Final_Fake = (0.20 * Level1) + (0.50 * Level2) + (0.30 * Level3); &#125;</p>
          <p className="text-indigo-400 font-bold mt-2">// Weighted Fusion (No Face):</p>
          <p>else &#123; Final_Fake = (0.50 * Level1) + (0.50 * Level3); &#125;</p>
        </div>
      </div>

      {/* 5 Levels Stack */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
          🧠 Integrated Deep Learning Expert Levels
        </h4>

        {levels.map((lvl, idx) => (
          <div key={idx} className="glass-panel p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-extrabold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                {lvl.level}
              </span>
              <span className="text-xs font-mono text-slate-400">{lvl.technique}</span>
            </div>

            <h4 className="text-lg font-bold text-white tracking-tight">{lvl.title}</h4>
            <p className="text-xs font-bold text-indigo-300">Model: {lvl.model}</p>
            <p className="text-xs text-slate-300 leading-relaxed">{lvl.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
