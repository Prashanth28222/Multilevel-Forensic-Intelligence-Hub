import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json'
  }
});

export interface ImageAnalysisResponse {
  final_fake_probability: number;
  final_ai_percentage: number;
  verdict: 'AI Generated' | 'Authentic' | 'Uncertain';
  decision_mode: string;
  experts_used: {
    level1: boolean;
    level2: boolean;
    level3: boolean;
  };
  level1_details?: {
    real_probability: number;
    fake_probability: number;
    confidence: number;
  };
  level2_details?: {
    faces_detected: number;
    per_face_scores?: Array<{ real_probability: number; fake_probability: number }>;
    max_fake_probability?: number;
    average_fake_probability?: number;
    ai_content_percentage?: number;
    forensic_decision?: string;
    note?: string;
  };
  level3_details?: {
    real_probability: number;
    fake_probability: number;
    confidence: number;
  };
  explanation?: string;
  filename?: string;
}

export interface VideoAnalysisResponse {
  filename: string;
  frames_analyzed: number;
  max_frame_fake_probability: number;
  average_frame_fake_probability: number;
  video_ai_percentage: number;
  verdict: 'AI Generated' | 'Authentic' | 'Uncertain';
  explanation: string;
  frame_breakdown: Array<{
    frame_index: number;
    ai_percentage: number;
    verdict: string;
  }>;
}

export interface BatchItemResult {
  filename: string;
  final_ai_percentage: number;
  verdict: string;
  confidence: number;
  details: ImageAnalysisResponse;
}

export interface BatchAnalysisResponse {
  summary: {
    total_images: number;
    ai_count: number;
    real_count: number;
    uncertain_count: number;
    average_ai_percentage: number;
  };
  items: BatchItemResult[];
}

export interface ModelSpec {
  level: string;
  name: string;
  type: string;
  framework: string;
  technique: string;
  description: string;
}

export const api = {
  checkHealth: async () => {
    const res = await apiClient.get('/health');
    return res.data;
  },

  getModels: async (): Promise<{ models: ModelSpec[] }> => {
    const res = await apiClient.get('/models');
    return res.data;
  },

  analyzeImage: async (file: File): Promise<ImageAnalysisResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await apiClient.post<ImageAnalysisResponse>('/analyze/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },

  analyzeVideo: async (file: File): Promise<VideoAnalysisResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await apiClient.post<VideoAnalysisResponse>('/analyze/video', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },

  analyzeBatch: async (files: File[]): Promise<BatchAnalysisResponse> => {
    const formData = new FormData();
    files.forEach(f => formData.append('files', f));
    const res = await apiClient.post<BatchAnalysisResponse>('/batch', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  }
};
