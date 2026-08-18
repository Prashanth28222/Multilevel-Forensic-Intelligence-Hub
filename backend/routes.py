import os
import tempfile
import cv2
import shutil
import uuid
from typing import List
from fastapi import APIRouter, UploadFile, File, HTTPException
from PIL import Image

from src.core.ensemble_engine import EnsembleEngine
from src.core.explanation_engine import ExplanationEngine

router = APIRouter()

# Lazy singleton instances to avoid reloading models on every request
_ensemble_engine = None
_explanation_engine = None

def get_ensemble_engine():
    global _ensemble_engine
    if _ensemble_engine is None:
        _ensemble_engine = EnsembleEngine()
    return _ensemble_engine

def get_explanation_engine():
    global _explanation_engine
    if _explanation_engine is None:
        _explanation_engine = ExplanationEngine()
    return _explanation_engine


@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "version": "1.0.0",
        "engine": "Multilevel AI Authenticity Engine",
        "cuda_available": False
    }


@router.get("/models")
def get_models_info():
    return {
        "models": [
            {
                "level": "Level 1",
                "name": "Frequency Expert",
                "type": "Hybrid Dual ConvNet",
                "framework": "PyTorch",
                "technique": "2D Fast Fourier Transform (FFT) + Spatial Conv2D",
                "description": "Detects high-frequency spectral noise grid anomalies and upscaling artifacts."
            },
            {
                "level": "Level 2",
                "name": "Face Integrity Expert",
                "type": "MobileNetV2 Deep CNN + OpenCV",
                "framework": "PyTorch / OpenCV",
                "technique": "Haar Cascade (30% margin crop) + MobileNetV2 classification",
                "description": "Evaluates facial blending seams, eye/mouth synthesis, and deepfake identity warping."
            },
            {
                "level": "Level 3",
                "name": "Semantic Consistency Expert",
                "type": "Vision Transformer (ViT-B/16)",
                "framework": "PyTorch torchvision",
                "technique": "Fine-Tuned top 4 Transformer Encoder layers",
                "description": "Evaluates global spatial realism, lighting direction consistency, and shadow realism."
            },
            {
                "level": "Level 4",
                "name": "Video Temporal Expert",
                "type": "Temporal Keyframe Aggregator",
                "framework": "OpenCV / PyTorch",
                "technique": "Uniform Keyframe Step Sampling (15-20 frames)",
                "description": "Computes frame-level risk distribution to detect video deepfakes and temporal flicker."
            },
            {
                "level": "Level 5",
                "name": "AI Explanation Engine",
                "type": "LLM Reasoning Layer / Local Fallback",
                "framework": "OpenAI API (gpt-4o-mini)",
                "technique": "Contextual prompt rationale generation with strict guardrails",
                "description": "Translates raw model probability outputs into human-readable forensic explanations."
            }
        ]
    }


@router.post("/analyze/image")
async def analyze_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be an image (JPEG, PNG).")

    contents = await file.read()
    
    # Save temporary file
    temp_path = None
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp:
            tmp.write(contents)
            temp_path = tmp.name

        # Ensure image is RGB
        image = Image.open(temp_path)
        if image.mode != "RGB":
            image = image.convert("RGB")
            image.save(temp_path, format="JPEG")

        engine = get_ensemble_engine()
        explainer = get_explanation_engine()

        result = engine.analyze(temp_path)
        explanation = explainer.generate_explanation(result)

        result["explanation"] = explanation
        result["filename"] = file.filename
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image analysis error: {str(e)}")
    finally:
        if temp_path and os.path.exists(temp_path):
            try:
                os.remove(temp_path)
            except Exception:
                pass


@router.post("/analyze/video")
async def analyze_video(file: UploadFile = File(...)):
    contents = await file.read()
    temp_video_path = None

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as tmp:
            tmp.write(contents)
            temp_video_path = tmp.name

        engine = get_ensemble_engine()
        cap = cv2.VideoCapture(temp_video_path)

        frame_results = []
        frame_count = 0
        max_frames = 20

        temp_frame_dir = os.path.join(
            tempfile.gettempdir(),
            f"video_frames_{uuid.uuid4().hex}"
        )
        os.makedirs(temp_frame_dir, exist_ok=True)

        while cap.isOpened() and frame_count < max_frames:
            ret, frame = cap.read()
            if not ret:
                break

            frame_path = os.path.join(temp_frame_dir, f"frame_{frame_count}.jpg")
            cv2.imwrite(frame_path, frame)

            frame_result = engine.analyze(frame_path)
            frame_results.append({
                "frame_index": frame_count,
                "ai_percentage": frame_result["final_ai_percentage"],
                "verdict": frame_result["verdict"]
            })
            frame_count += 1

        cap.release()
        shutil.rmtree(temp_frame_dir)

        if not frame_results:
            raise HTTPException(status_code=400, detail="No frames could be extracted from video.")

        ai_percentages = [f["ai_percentage"] for f in frame_results]
        avg_ai_pct = sum(ai_percentages) / len(ai_percentages)
        max_ai_pct = max(ai_percentages)
        verdict = "AI Generated" if avg_ai_pct > 65 else "Authentic"

        explanation = (
            f"Video evaluated across {len(frame_results)} keyframes. "
            f"Average AI Probability: {avg_ai_pct:.2f}%. Maximum Frame AI Probability: {max_ai_pct:.2f}%. "
            f"Final Video Classification: {verdict.upper()}."
        )

        return {
            "filename": file.filename,
            "frames_analyzed": len(frame_results),
            "max_frame_fake_probability": max_ai_pct / 100.0,
            "average_frame_fake_probability": avg_ai_pct / 100.0,
            "video_ai_percentage": avg_ai_pct,
            "verdict": verdict,
            "explanation": explanation,
            "frame_breakdown": frame_results
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Video analysis error: {str(e)}")
    finally:
        if temp_video_path and os.path.exists(temp_video_path):
            try:
                os.remove(temp_video_path)
            except Exception:
                pass


@router.post("/batch")
async def analyze_batch(files: List[UploadFile] = File(...)):
    if not files:
        raise HTTPException(status_code=400, detail="No files provided for batch processing.")

    engine = get_ensemble_engine()
    results = []
    ai_count = 0
    real_count = 0
    uncertain_count = 0
    total_ai_pct = 0.0

    for file in files:
        contents = await file.read()
        temp_path = None
        try:
            with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp:
                tmp.write(contents)
                temp_path = tmp.name

            result = engine.analyze(temp_path)
            ai_pct = result["final_ai_percentage"]
            verdict = result["verdict"]

            total_ai_pct += ai_pct

            if verdict == "AI Generated":
                ai_count += 1
            elif verdict == "Authentic":
                real_count += 1
            else:
                uncertain_count += 1

            confidence = 0.0
            if result.get("level3_details"):
                confidence = result["level3_details"].get("confidence", 0.0) * 100.0

            results.append({
                "filename": file.filename,
                "final_ai_percentage": ai_pct,
                "verdict": verdict,
                "confidence": confidence,
                "details": result
            })

        except Exception as e:
            results.append({
                "filename": file.filename,
                "error": str(e)
            })
        finally:
            if temp_path and os.path.exists(temp_path):
                try:
                    os.remove(temp_path)
                except Exception:
                    pass

    avg_ai = total_ai_pct / len(files) if files else 0.0

    return {
        "summary": {
            "total_images": len(files),
            "ai_count": ai_count,
            "real_count": real_count,
            "uncertain_count": uncertain_count,
            "average_ai_percentage": avg_ai
        },
        "items": results
    }
