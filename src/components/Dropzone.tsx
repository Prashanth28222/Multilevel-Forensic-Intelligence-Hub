import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Image, FileVideo, Files, X } from 'lucide-react';

interface DropzoneProps {
  onFileSelect: (files: File[]) => void;
  accept?: Record<string, string[]>;
  multiple?: boolean;
  selectedFiles?: File[];
  onClearFile?: (index: number) => void;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  onFileSelect,
  accept = { 'image/*': ['.jpg', '.jpeg', '.png'] },
  multiple = false,
  selectedFiles = [],
  onClearFile
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple
  });

  return (
    <div className="space-y-4">
      {/* Dropzone Container */}
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all duration-300 ${
          isDragActive
            ? 'border-indigo-500 bg-indigo-500/10 scale-[0.99]'
            : 'border-indigo-500/30 hover:border-indigo-500/60 bg-slate-900/40 hover:bg-indigo-500/5'
        }`}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center gap-3">
          <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl text-indigo-400 group-hover:scale-110 transition-transform">
            {multiple ? <Files className="w-8 h-8" /> : <UploadCloud className="w-8 h-8" />}
          </div>
          
          <div>
            <h4 className="text-base font-bold text-white">
              {isDragActive ? 'Drop your media here...' : multiple ? 'Upload Multiple Media Files' : 'Drag & drop media file here'}
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Supports JPG, JPEG, PNG {multiple ? '& Videos' : ''} • Max recommended file size 50MB
            </p>
          </div>

          <span className="mt-2 px-4 py-2 bg-indigo-600/20 border border-indigo-500/40 rounded-xl text-xs font-bold text-indigo-300 hover:bg-indigo-600/30 transition-colors">
            Browse Local Files
          </span>
        </div>
      </div>

      {/* Selected File Previews */}
      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Selected File{selectedFiles.length > 1 ? 's' : ''} ({selectedFiles.length})
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {selectedFiles.map((f, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/80 border border-white/5 rounded-xl">
                <div className="flex items-center gap-3 overflow-hidden">
                  {f.type.startsWith('video/') ? (
                    <FileVideo className="w-5 h-5 text-cyan-400 shrink-0" />
                  ) : (
                    <Image className="w-5 h-5 text-indigo-400 shrink-0" />
                  )}
                  <div className="truncate">
                    <p className="text-xs font-semibold text-white truncate">{f.name}</p>
                    <p className="text-[10px] text-slate-400">
                      {(f.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                
                {onClearFile && (
                  <button
                    onClick={() => onClearFile(idx)}
                    className="p-1 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
