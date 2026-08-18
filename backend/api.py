from pydantic import BaseModel
from typing import Dict, Any, List, Optional

class Level1Details(BaseModel):
    real_probability: float
    fake_probability: float
    confidence: float

class FaceScore(BaseModel):
    real_probability: float
    fake_probability: float

class Level2Details(BaseModel):
    faces_detected: int
    per_face_scores: Optional[List[FaceScore]] = None
    max_fake_probability: Optional[float] = None
    average_fake_probability: Optional[float] = None
    ai_content_percentage: Optional[float] = None
    forensic_decision_score: Optional[float] = None
    forensic_decision: Optional[str] = None
    note: Optional[str] = None

class Level3Details(BaseModel):
    real_probability: float
    fake_probability: float
    confidence: float

class ImageAnalysisResult(BaseModel):
    final_fake_probability: float
    final_ai_percentage: float
    verdict: str
    decision_mode: str
    experts_used: Dict[str, bool]
    level1_details: Optional[Level1Details] = None
    level2_details: Optional[Level2Details] = None
    level3_details: Optional[Level3Details] = None
    explanation: Optional[str] = None
    filename: Optional[str] = None

class VideoAnalysisResult(BaseModel):
    frames_analyzed: int
    max_frame_fake_probability: float
    average_frame_fake_probability: float
    video_ai_percentage: float
    verdict: str
    explanation: str

class BatchItemResult(BaseModel):
    filename: str
    final_ai_percentage: float
    verdict: str
    confidence: float
    details: Dict[str, Any]

class BatchSummary(BaseModel):
    total_images: int
    ai_count: int
    real_count: int
    uncertain_count: int
    average_ai_percentage: float

class BatchAnalysisResult(BaseModel):
    summary: BatchSummary
    items: List[BatchItemResult]

class HealthStatus(BaseModel):
    status: str
    version: str
    engine: str

class ModelSpec(BaseModel):
    level: str
    name: str
    type: str
    framework: str
    technique: str
    description: str

class ModelsResponse(BaseModel):
    models: List[ModelSpec]
