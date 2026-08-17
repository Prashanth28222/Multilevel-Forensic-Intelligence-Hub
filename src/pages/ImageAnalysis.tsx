import React, { useState } from 'react';
import { Dropzone } from '../components/Dropzone';
import { LoadingState } from '../components/LoadingState';
import { ResultCard } from '../components/ResultCard';
import { LevelCard } from '../components/LevelCard';
import { SystemExplanation } from '../components/SystemExplanation';
import { api, ImageAnalysisResponse } from '../api/client';
import { Image as ImageIcon, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

export const ImageAnalysis: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImageAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl(null);
    }
    setResult(null);
    setError(null);
  };

  const handleRunAnalysis = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError(null);

    try {
      const res = await api.analyzeImage(selectedFile);
      setResult(res);
    } catch (err: any) {
      setError(err?.response?.data?.detail || err?.message || 'Error executing image forensic evaluation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div className="glass-panel p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-400">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Single Image Forensics Workspace</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Upload an image (JPG, PNG) to execute multi-level neural inspection
            </p>
          </div>
        </div>

        <Dropzone
          onFileSelect={handleFileSelect}
          selectedFiles={selectedFile ? [selectedFile] : []}
          onClearFile={handleClearFile}
        />
      </div>

      {/* Image Preview & Analyze Action */}
      {selectedFile && imagePreviewUrl && !loading && !result && (
        <div className="glass-panel p-6 space-y-6">
          <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
            Image Preview & Metadata
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-1 rounded-2xl overflow-hidden border border-white/10 max-h-64 flex justify-center bg-slate-950">
              <img src={imagePreviewUrl} alt="Preview" className="object-contain max-h-64" />
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-900/60 border border-white/5 rounded-xl">
                  <span className="text-slate-400 block mb-0.5">Filename</span>
                  <span className="font-bold text-white truncate block">{selectedFile.name}</span>
                </div>
                <div className="p-3 bg-slate-900/60 border border-white/5 rounded-xl">
                  <span className="text-slate-400 block mb-0.5">File Size</span>
                  <span className="font-bold text-white">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                </div>
              </div>

              <button
                onClick={handleRunAnalysis}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold rounded-xl text-base transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Run Forensic Multi-Level Analysis</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Message Display */}
      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center gap-3 text-xs text-rose-300 font-semibold">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading Animation */}
      {loading && <LoadingState />}

      {/* Results Section */}
      {result && (
        <div className="space-y-8">
          {/* Hero Result Dashboard Card */}
          <ResultCard result={result} />

          {/* 3 Collapsible Level Breakdown Cards */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">
              📊 Multi-Level Forensic Breakdown
            </h3>

            {/* Level 1 Card */}
            {result.level1_details && (
              <LevelCard
                levelNumber={1}
                title="Frequency & Spectral Noise Analysis"
                subtitle="Custom Dual-Branch Hybrid CNN (Spatial + 2D FFT Frequency Log-Magnitude)"
                probability={result.level1_details.fake_probability * 100}
                confidence={result.level1_details.confidence * 100}
                metrics={[
                  { label: 'Fake Signal', value: `${(result.level1_details.fake_probability * 100).toFixed(2)}%` },
                  { label: 'Real Signal', value: `${(result.level1_details.real_probability * 100).toFixed(2)}%` },
                  { label: 'Confidence', value: `${(result.level1_details.confidence * 100).toFixed(2)}%` },
                  { label: 'Status', value: result.level1_details.fake_probability > 0.5 ? '🔴 Artifact' : '🟢 Natural' }
                ]}
                description="Analyzes 2D Fast Fourier Transform (FFT) log-magnitude spectra and spatial grid noise to uncover upscaling artifacts invisible to the human eye."
              />
            )}

            {/* Level 2 Card */}
            {result.level2_details && (
              <LevelCard
                levelNumber={2}
                title="Facial Integrity & Deepfake Seam Analysis"
                subtitle="MobileNetV2 Deep CNN + OpenCV Haar Cascade Detector (30% Crop Margin)"
                probability={(result.level2_details.max_fake_probability ?? 0) * 100}
                metrics={[
                  { label: 'Faces Detected', value: result.level2_details.faces_detected },
                  { label: 'Max Fake %', value: `${((result.level2_details.max_fake_probability ?? 0) * 100).toFixed(2)}%` },
                  { label: 'Average Fake %', value: `${((result.level2_details.average_fake_probability ?? 0) * 100).toFixed(2)}%` },
                  { label: 'Forensic Verdict', value: result.level2_details.forensic_decision || 'N/A' }
                ]}
                description="Detects facial blending seams, eye/mouth warping, and identity swapping using OpenCV Haar Cascade detection (30% margin) and MobileNetV2 classification."
              />
            )}

            {/* Level 3 Card */}
            {result.level3_details && (
              <LevelCard
                levelNumber={3}
                title="Semantic & Structural Realism Analysis"
                subtitle="Vision Transformer (ViT-B/16 - Fine-Tuned Top 4 Encoder Layers)"
                probability={result.level3_details.fake_probability * 100}
                confidence={result.level3_details.confidence * 100}
                metrics={[
                  { label: 'Semantic Fake %', value: `${(result.level3_details.fake_probability * 100).toFixed(2)}%` },
                  { label: 'Real Score', value: `${(result.level3_details.real_probability * 100).toFixed(2)}%` },
                  { label: 'ViT Confidence', value: `${(result.level3_details.confidence * 100).toFixed(2)}%` },
                  { label: 'Status', value: result.level3_details.fake_probability > 0.5 ? '🔴 Inconsistent' : '🟢 Coherent' }
                ]}
                description="Evaluates lighting consistency, shadow direction, anatomical realism, and contextual coherence using a fine-tuned Vision Transformer (ViT-B/16)."
              />
            )}
          </div>

          {/* Bottom Section: System Explanation */}
          <SystemExplanation
            explanation={result.explanation}
            filename={result.filename}
          />
        </div>
      )}
    </div>
  );
};
