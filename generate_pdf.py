import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        
        # Primary colors
        primary_dark = colors.HexColor("#0F172A")
        accent_blue = colors.HexColor("#0284C7")
        text_gray = colors.HexColor("#64748B")
        line_gray = colors.HexColor("#E2E8F0")

        # Top Header (Only pages > 1)
        if self._pageNumber > 1:
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(primary_dark)
            self.drawString(54, 750, "MULTILEVEL AI AUTHENTICITY ENGINE — PROJECT ANALYSIS & ARCHITECTURE REPORT")
            self.setStrokeColor(line_gray)
            self.setLineWidth(0.75)
            self.line(54, 742, 558, 742)

        # Bottom Footer (All pages)
        self.setStrokeColor(line_gray)
        self.setLineWidth(0.75)
        self.line(54, 48, 558, 48)
        
        self.setFont("Helvetica", 8)
        self.setFillColor(text_gray)
        self.drawString(54, 34, "Confidential & Proprietary — AI Forensic Technical Document")
        
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 34, page_str)
        self.restoreState()


def create_report(output_filename):
    doc = SimpleDocTemplate(
        output_filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Custom styles
    primary_color = colors.HexColor("#0F172A")
    secondary_color = colors.HexColor("#0284C7")
    dark_neutral = colors.HexColor("#1E293B")
    light_bg = colors.HexColor("#F8FAFC")
    border_color = colors.HexColor("#CBD5E1")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=primary_color,
        spaceAfter=8
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=secondary_color,
        spaceAfter=15
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=primary_color,
        spaceBefore=16,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=secondary_color,
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=dark_neutral,
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'Bullet_Custom',
        parent=body_style,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=4
    )

    code_style = ParagraphStyle(
        'Code_Custom',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#0F172A"),
        spaceAfter=4
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=dark_neutral
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=colors.white
    )

    story = []

    # Title Banner
    story.append(Paragraph("Multilevel AI Authenticity Engine", title_style))
    story.append(Paragraph("Comprehensive Project Analysis, Model Architecture & Structure Specification Report", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2, color=secondary_color, spaceBefore=0, spaceAfter=12))

    # Executive Metadata Box
    meta_data = [
        [Paragraph("<b>System Name:</b> Multilevel AI Authenticity Engine", table_cell_style),
         Paragraph("<b>Core Framework:</b> PyTorch, OpenCV, Streamlit", table_cell_style)],
        [Paragraph("<b>Primary Application:</b> AI Deepfake & Synthetic Media Detection", table_cell_style),
         Paragraph("<b>Architecture Type:</b> Hierarchical Multi-Expert Ensemble", table_cell_style)],
        [Paragraph("<b>Models Used:</b> Hybrid Dual CNN, MobileNetV2, ViT-B/16, GPT-4o-mini", table_cell_style),
         Paragraph("<b>Input Modalities:</b> Images (JPG, PNG) & Videos (MP4, MOV, AVI)", table_cell_style)]
    ]
    meta_table = Table(meta_data, colWidths=[250, 254])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F1F5F9")),
        ('BOX', (0,0), (-1,-1), 1, border_color),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('PADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 14))

    # SECTION 1: EXECUTIVE OVERVIEW
    story.append(Paragraph("1. Executive Overview & System Purpose", h1_style))
    story.append(Paragraph(
        "The <b>Multilevel AI Authenticity Engine</b> is a state-of-the-art forensic evaluation system engineered to detect "
        "synthetic media generated by modern generative artificial intelligence (including Generative Adversarial Networks like StyleGAN/ProGAN "
        "and Latent Diffusion Models like Stable Diffusion, Midjourney, and DALL-E).", body_style
    ))
    story.append(Paragraph(
        "Instead of relying on a single monolithic neural network—which is highly prone to overfitting, compression artifacts, and poor generalization "
        "across new generative models—this system employs a <b>hierarchical multi-level expert ensemble architecture</b>. Digital inputs undergo simultaneous "
        "forensic inspection across four distinct domain levels (Frequency, Facial, Semantic, Temporal) before an ensemble fusion engine aggregates "
        "probabilities into a definitive authenticity score.", body_style
    ))
    story.append(Spacer(1, 10))

    # SECTION 2: PROJECT STRUCTURE ANALYSIS
    story.append(Paragraph("2. Repository & System Structure", h1_style))
    story.append(Paragraph(
        "The codebase is cleanly modularized into frontend presentation pages, core decision & explanation engines, specialized model expert classes, "
        "and automated weight download handlers. Below is the complete repository layout:", body_style
    ))

    repo_structure = [
        [Paragraph("<b>Path / Module</b>", table_header_style), Paragraph("<b>Component Type</b>", table_header_style), Paragraph("<b>Description & Functionality</b>", table_header_style)],
        [Paragraph("<code>app.py</code>", code_style), Paragraph("Main Entrypoint", table_cell_style), Paragraph("Streamlit dashboard UI with custom CSS animations, cyber particle canvas, and main navigation cards.", table_cell_style)],
        [Paragraph("<code>download_models.py</code>", code_style), Paragraph("Utility Script", table_cell_style), Paragraph("Automated model weight downloader using <code>requests</code> and <code>tqdm</code> targeting GitHub Releases v1.0.", table_cell_style)],
        [Paragraph("<code>requirements.txt</code>", code_style), Paragraph("Dependencies", table_cell_style), Paragraph("Specifies required libraries: <code>torch</code>, <code>torchvision</code>, <code>opencv-python</code>, <code>pillow</code>, <code>streamlit</code>, <code>openai</code>, <code>tqdm</code>.", table_cell_style)],
        [Paragraph("<code>src/core/ensemble_engine.py</code>", code_style), Paragraph("Core Logic", table_cell_style), Paragraph("Central aggregation hub executing Level 1–3 experts, implementing weighted fusion and face override logic.", table_cell_style)],
        [Paragraph("<code>src/core/explanation_engine.py</code>", code_style), Paragraph("Core Logic", table_cell_style), Paragraph("Forensic reasoning engine leveraging OpenAI <code>gpt-4o-mini</code> with a structured local rule-based fallback.", table_cell_style)],
        [Paragraph("<code>src/experts/level1_expert.py</code>", code_style), Paragraph("Expert Model", table_cell_style), Paragraph("Level 1 Frequency Expert: Custom Dual-Branch Hybrid CNN (Spatial 2D Conv + 2D FFT Frequency Conv).", table_cell_style)],
        [Paragraph("<code>src/experts/level2_expert.py</code>", code_style), Paragraph("Expert Model", table_cell_style), Paragraph("Level 2 Face Integrity Expert: MobileNetV2 Deep CNN backbone + OpenCV Haar Cascade face detector.", table_cell_style)],
        [Paragraph("<code>src/experts/level3_expert.py</code>", code_style), Paragraph("Expert Model", table_cell_style), Paragraph("Level 3 Semantic Expert: Fine-tuned Vision Transformer (ViT-B/16) fine-tuning top 4 encoder layers.", table_cell_style)],
        [Paragraph("<code>src/experts/level4_video_expert.py</code>", code_style), Paragraph("Expert Model", table_cell_style), Paragraph("Level 4 Video Expert: Temporal frame sampling framework aggregating multi-frame ensemble predictions.", table_cell_style)],
        [Paragraph("<code>pages/1_Image_Forensics.py</code>", code_style), Paragraph("UI Page", table_cell_style), Paragraph("Single image evaluation page with confidence badges, progress bars, breakdown, and AI explanation.", table_cell_style)],
        [Paragraph("<code>pages/2_Video_Forensics.py</code>", code_style), Paragraph("UI Page", table_cell_style), Paragraph("Video analysis page executing frame extraction, per-frame evaluation, and average risk computation.", table_cell_style)],
        [Paragraph("<code>pages/3_Batch_Analysis.py</code>", code_style), Paragraph("UI Page", table_cell_style), Paragraph("Batch processing page for evaluating multiple images simultaneously with summary metrics.", table_cell_style)],
        [Paragraph("<code>pages/4_System_Architecture.py</code>", code_style), Paragraph("UI Page", table_cell_style), Paragraph("Interactive architecture documentation detailing model layers, weights, and decision rules.", table_cell_style)],
        [Paragraph("<code>models/</code>", code_style), Paragraph("Model Store", table_cell_style), Paragraph("Local directory storing downloaded PyTorch state dicts (<code>.pth</code> files) for Level 1, 2, and 3.", table_cell_style)]
    ]

    struct_table = Table(repo_structure, colWidths=[130, 94, 280])
    struct_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary_color),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, light_bg]),
        ('PADDING', (0,0), (-1,-1), 4.5),
    ]))
    story.append(struct_table)
    story.append(Spacer(1, 14))

    # SECTION 3: IN-DEPTH MODEL ANALYSIS
    story.append(Paragraph("3. Deep-Dive into AI / Deep Learning Models Used", h1_style))
    story.append(Paragraph(
        "The core strength of the engine lies in its combination of diverse model families—ranging from signal processing CNNs to pre-trained transfer learning architectures, Transformer models, and Large Language Models. Below is the detailed technical specification of each model level:", body_style
    ))
    story.append(Spacer(1, 6))

    # Level 1 Model Detailed
    l1_box = [
        [Paragraph("<b>LEVEL 1 — FREQUENCY & NOISE ARTIFACT EXPERT</b>", table_header_style)],
        [Paragraph(
            "<b>Model Architecture:</b> Custom Dual-Branch Hybrid Convolutional Neural Network (Spatial + Frequency FFT)<br/>"
            "<b>Model Class:</b> <code>HybridLevel1(nn.Module)</code> in <code>src/experts/level1_expert.py</code><br/>"
            "<b>Primary Task:</b> Detect high-frequency spectral artifacts, grid noise patterns, upscaling boundaries, and compression signals invisible to human vision.<br/><br/>"
            "<b>Architectural Mechanics:</b><br/>"
            "• <i>Input Preprocessing:</i> Converts image to single-channel Grayscale, resizes to <code>32x32</code>, transforms to Tensor.<br/>"
            "• <i>Spatial Branch:</i> 3 sequential Conv2D blocks (1→32→64→128 channels with 3x3 kernels, padding=1, ReLU, 2x2 MaxPool2D). Output shape: <code>(128, 4, 4)</code>.<br/>"
            "• <i>Frequency Branch:</i> Computes 2D Fast Fourier Transform <code>torch.fft.fft2(x)</code>, shifts zero-frequency to center via <code>torch.fft.fftshift</code>, calculates magnitude <code>torch.abs()</code>, and applies log scaling <code>torch.log1p()</code>. Passes through an identical 3-stage Conv2D block. Output shape: <code>(128, 4, 4)</code>.<br/>"
            "• <i>Fusion Classifier:</i> Concatenates spatial and frequency feature vectors (dim=1) yielding a combined 256-channel tensor. Flattens to 2048 units → Dense(256) → ReLU → Dropout(0.3) → Linear(256, 2) binary output.<br/>"
            "• <i>Weights File:</i> <code>models/level1/level1_hybrid.pth</code>", body_style)]
    ]
    l1_table = Table(l1_box, colWidths=[504])
    l1_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), secondary_color),
        ('BACKGROUND', (0,1), (-1,1), light_bg),
        ('BOX', (0,0), (-1,-1), 1, secondary_color),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(l1_table)
    story.append(Spacer(1, 10))

    # Level 2 Model Detailed
    l2_box = [
        [Paragraph("<b>LEVEL 2 — FACIAL INTEGRITY & DEEPFAKE EXPERT</b>", table_header_style)],
        [Paragraph(
            "<b>Model Architecture:</b> MobileNetV2 Deep CNN Backbone (Transfer Learning) + OpenCV Haar Cascade Detector<br/>"
            "<b>Model Class:</b> <code>Level2FaceExpert</code> in <code>src/experts/level2_expert.py</code><br/>"
            "<b>Primary Task:</b> Detect facial synthesis seam artifacts, face-swapping boundaries, skin texture anomalies, and identity distortions in human faces.<br/><br/>"
            "<b>Architectural Mechanics:</b><br/>"
            "• <i>Face Detection Stage:</i> Employs OpenCV <code>cv2.CascadeClassifier</code> with <code>haarcascade_frontalface_default.xml</code> (scaleFactor=1.1, minNeighbors=5, minSize=40x40). Dynamically expands each bounding box by a <b>30% margin</b> (<code>margin = int(0.3 * w)</code>) to include jawline, hairline, and blending seams.<br/>"
            "• <i>Classification Backbone:</i> PyTorch <code>torchvision.models.mobilenet_v2</code> utilizing depthwise separable convolutions.<br/>"
            "• <i>Custom Classifier Head:</i> Replaces standard head with <code>Linear(last_channel, 512) → ReLU → Dropout(0.3) → Linear(512, 2)</code>.<br/>"
            "• <i>Multi-Face Evaluation:</i> Converts crops to PIL RGB, resizes to <code>128x128</code>, normalizes using ImageNet stats. Computes per-face fake probability, overall maximum fake probability, and average face score.<br/>"
            "• <i>Weights File:</i> <code>models/level2/level2_face_best.pth</code>", body_style)]
    ]
    l2_table = Table(l2_box, colWidths=[504])
    l2_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), secondary_color),
        ('BACKGROUND', (0,1), (-1,1), light_bg),
        ('BOX', (0,0), (-1,-1), 1, secondary_color),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(l2_table)
    story.append(Spacer(1, 10))

    story.append(PageBreak()) # Clean page break for Level 3, 4, 5

    # Level 3 Model Detailed
    l3_box = [
        [Paragraph("<b>LEVEL 3 — SEMANTIC CONSISTENCY EXPERT (VISION TRANSFORMER)</b>", table_header_style)],
        [Paragraph(
            "<b>Model Architecture:</b> Vision Transformer (ViT-B/16 - Fine-Tuned Encoder)<br/>"
            "<b>Model Class:</b> <code>Level3SemanticExpert</code> in <code>src/experts/level3_expert.py</code><br/>"
            "<b>Primary Task:</b> Evaluate global structural realism, lighting consistency, shadow placement, anatomical correctness, and high-level scene context.<br/><br/>"
            "<b>Architectural Mechanics:</b><br/>"
            "• <i>Backbone Architecture:</i> Standard <code>models.vit_b_16</code> pre-trained on ImageNet-1K (patch size 16x16, 12 transformer encoder blocks, 768 hidden dimension).<br/>"
            "• <i>Fine-Tuning Strategy:</i> Freezes lower-level feature extraction layers (blocks 0–7) to retain universal visual representations. Unfreezes the top 4 Transformer Encoder blocks (<code>model.encoder.layers[-4:]</code>) for specialized fine-tuning on high-level semantic inconsistencies.<br/>"
            "• <i>Classification Head:</i> Replaces standard 1000-class head with a 2-class linear projection layer <code>nn.Linear(768, 2)</code>.<br/>"
            "• <i>Transforms:</i> Uses PyTorch <code>torchvision.transforms.v2</code> (Resize 224x224, float32 scaling, ImageNet normalization).<br/>"
            "• <i>Weights File:</i> <code>models/level3/level3_semantic_best.pth</code>", body_style)]
    ]
    l3_table = Table(l3_box, colWidths=[504])
    l3_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), secondary_color),
        ('BACKGROUND', (0,1), (-1,1), light_bg),
        ('BOX', (0,0), (-1,-1), 1, secondary_color),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(l3_table)
    story.append(Spacer(1, 10))

    # Level 4 Model Detailed
    l4_box = [
        [Paragraph("<b>LEVEL 4 — VIDEO TEMPORAL AGGREGATION EXPERT</b>", table_header_style)],
        [Paragraph(
            "<b>Model Architecture:</b> Frame-Level Temporal Sampling & Ensemble Aggregation Framework<br/>"
            "<b>Model Class:</b> <code>Level4VideoExpert</code> in <code>src/experts/level4_video_expert.py</code><br/>"
            "<b>Primary Task:</b> Detect temporal flickers, frame-to-frame synthesis glitches, and deepfake video manipulations.<br/><br/>"
            "<b>Architectural Mechanics:</b><br/>"
            "• <i>Keyframe Extraction:</i> Reads video file via OpenCV <code>cv2.VideoCapture</code>. Uniformly samples 15 to 20 frames across the video duration using calculated frame steps <code>step = total_frames // max_frames</code>.<br/>"
            "• <i>Hierarchical Evaluation:</i> Writes extracted frames to temporary storage and feeds each frame through the <code>EnsembleEngine</code> (executing Level 1, Level 2, Level 3 analysis).<br/>"
            "• <i>Temporal Risk Metrics:</i> Computes maximum frame fake probability (peak anomaly) and mean frame fake probability across all keyframes.<br/>"
            "• <i>Threshold Rules:</i> Max Fake > 0.75 → 'AI Generated', Avg Fake > 0.60 → 'Likely AI', Avg Fake < 0.35 → 'Authentic', else → 'Uncertain'.", body_style)]
    ]
    l4_table = Table(l4_box, colWidths=[504])
    l4_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), secondary_color),
        ('BACKGROUND', (0,1), (-1,1), light_bg),
        ('BOX', (0,0), (-1,-1), 1, secondary_color),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(l4_table)
    story.append(Spacer(1, 10))

    # Level 5 Model Detailed
    l5_box = [
        [Paragraph("<b>LEVEL 5 — AI EXPLANATION ENGINE (LLM + RULE FALLBACK)</b>", table_header_style)],
        [Paragraph(
            "<b>Model Architecture:</b> Large Language Model Reasoning Layer (OpenAI <code>gpt-4o-mini</code>) + Deterministic Local Rule Fallback<br/>"
            "<b>Model Class:</b> <code>ExplanationEngine</code> in <code>src/core/explanation_engine.py</code><br/>"
            "<b>Primary Task:</b> Generate human-readable forensic analysis reports explaining *why* the ensemble reached its specific verdict.<br/><br/>"
            "<b>Architectural Mechanics:</b><br/>"
            "• <i>API Integration:</i> Checks environment variable <code>OPENAI_API_KEY</code>. Constructs structured prompts containing Level 1, 2, and 3 output metrics and queries <code>gpt-4o-mini</code> (temperature=0.2).<br/>"
            "• <i>Strict Guardrails:</i> Prompt explicitly instructs the LLM: <i>'Explain clearly WHY the system produced this verdict. Do NOT re-classify.'</i><br/>"
            "• <i>Local Fallback Engine:</i> If API key is missing or encounters rate limits/network failures, automatically falls back to <code>_generate_local_explanation()</code>, constructing a rule-driven bulleted summary of fake signals, face counts, and semantic metrics.", body_style)]
    ]
    l5_table = Table(l5_box, colWidths=[504])
    l5_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), secondary_color),
        ('BACKGROUND', (0,1), (-1,1), light_bg),
        ('BOX', (0,0), (-1,-1), 1, secondary_color),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(l5_table)
    story.append(Spacer(1, 14))

    # SECTION 4: ENSEMBLE DECISION & MATH FUSION LOGIC
    story.append(Paragraph("4. Ensemble Decision Logic & Mathematical Fusion", h1_style))
    story.append(Paragraph(
        "The <code>EnsembleEngine</code> in <code>src/core/ensemble_engine.py</code> aggregates predictions from all active experts to calculate the final "
        "Authenticity Score. The decision pipeline incorporates adaptive conditional weighting:", body_style
    ))

    fusion_data = [
        [Paragraph("<b>Condition / Scenario</b>", table_header_style), Paragraph("<b>Decision Mode</b>", table_header_style), Paragraph("<b>Mathematical Aggregation Formula</b>", table_header_style)],
        [Paragraph("<b>Face Detected & Level 2 Fake > 0.80</b>", table_cell_style), Paragraph("<code>Face Override</code>", table_cell_style), Paragraph("<b>P<sub>final</sub> = P<sub>L2_max_fake</sub></b><br/>(Overrides other models due to critical deepfake facial signal)", table_cell_style)],
        [Paragraph("<b>Face Detected & Level 2 Fake ≤ 0.80</b>", table_cell_style), Paragraph("<code>Weighted Fusion (Face Present)</code>", table_cell_style), Paragraph("<b>P<sub>final</sub> = 0.20 · P<sub>L1</sub> + 0.50 · P<sub>L2_max</sub> + 0.30 · P<sub>L3</sub></b><br/>(Prioritizes facial expert while factoring frequency & semantics)", table_cell_style)],
        [Paragraph("<b>No Face Detected in Image</b>", table_cell_style), Paragraph("<code>Weighted Fusion (No Face)</code>", table_cell_style), Paragraph("<b>P<sub>final</sub> = 0.50 · P<sub>L1</sub> + 0.50 · P<sub>L3</sub></b><br/>(Equal 50/50 split between Frequency and Semantic ViT experts)", table_cell_style)]
    ]
    fusion_table = Table(fusion_data, colWidths=[150, 110, 244])
    fusion_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary_color),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, light_bg]),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(fusion_table)
    story.append(Spacer(1, 10))

    story.append(Paragraph("<b>Final Verdict Classification Thresholds:</b>", h2_style))
    story.append(Paragraph("• <b>AI Generated:</b> Final AI Probability <code>P<sub>final</sub> &gt; 0.70</code> (70% threshold)", bullet_style))
    story.append(Paragraph("• <b>Authentic:</b> Final AI Probability <code>P<sub>final</sub> &lt; 0.35</code> (35% threshold)", bullet_style))
    story.append(Paragraph("• <b>Uncertain:</b> Final AI Probability between <code>0.35</code> and <code>0.70</code> (requires human forensic review)", bullet_style))
    story.append(Spacer(1, 14))

    # SECTION 5: USER INTERFACE & WORKFLOW
    story.append(Paragraph("5. User Interface & Page Workflow Breakdown", h1_style))
    story.append(Paragraph(
        "The user interface is powered by Streamlit and features a modern, responsive dark theme with CSS keyframe gradient animations and "
        "an interactive JavaScript particle canvas rendered on the background HTML5 canvas element.", body_style
    ))
    
    ui_features = [
        [Paragraph("<b>Page Module</b>", table_header_style), Paragraph("<b>Interactive Features & Capabilities</b>", table_header_style)],
        [Paragraph("<code>app.py</code> (Home)", code_style), Paragraph("Main portal featuring glowing navigation cards for Image Forensics, Video Forensics, and Batch Analysis, styled with CSS hover scaling and drop-shadow effects.", table_cell_style)],
        [Paragraph("<code>1_Image_Forensics.py</code>", code_style), Paragraph("Single image file uploader (JPG, PNG). Renders AI Probability metric, interactive progress bar, dynamic confidence badges (High >80%, Moderate >50%, Low ≤50%), multi-level expert probability breakdowns, and LLM text explanation.", table_cell_style)],
        [Paragraph("<code>2_Video_Forensics.py</code>", code_style), Paragraph("Video uploader (MP4, MOV, AVI). Plays uploaded video, extracts keyframes to temp directory, runs multi-level analysis frame-by-frame, displays average AI percentage, and presents final video verdict.", table_cell_style)],
        [Paragraph("<code>3_Batch_Analysis.py</code>", code_style), Paragraph("Bulk image uploader accepting multiple files. Renders summary metrics (Total Processed, Real Count, AI Count, Uncertain Count, Average AI Probability) and individual card breakdowns with progress bars.", table_cell_style)],
        [Paragraph("<code>4_System_Architecture.py</code>", code_style), Paragraph("Technical sitemap rendering system overview, detailed descriptions of Level 1–5 experts, ensemble decision rules, and architectural motivation.", table_cell_style)]
    ]
    ui_table = Table(ui_features, colWidths=[150, 354])
    ui_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary_color),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, light_bg]),
        ('PADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(ui_table)
    story.append(Spacer(1, 14))

    # SECTION 6: SUMMARY TABLE OF AI MODELS
    story.append(Paragraph("6. Comprehensive Summary Table of All AI Models", h1_style))
    
    summary_matrix = [
        [Paragraph("<b>Expert Level</b>", table_header_style), Paragraph("<b>Model Type / Family</b>", table_header_style), Paragraph("<b>Framework</b>", table_header_style), Paragraph("<b>Key Technique</b>", table_header_style), Paragraph("<b>Output Type</b>", table_header_style)],
        [Paragraph("<b>Level 1</b>", table_cell_style), Paragraph("Hybrid Dual ConvNet", table_cell_style), Paragraph("PyTorch", table_cell_style), Paragraph("2D FFT Log-Magnitude + Spatial Conv", table_cell_style), Paragraph("Probabilities (Real/Fake)", table_cell_style)],
        [Paragraph("<b>Level 2</b>", table_cell_style), Paragraph("MobileNetV2 + OpenCV", table_cell_style), Paragraph("PyTorch / OpenCV", table_cell_style), Paragraph("Haar Cascade + 30% Margin Crop", table_cell_style), Paragraph("Per-face & Max Fake Prob", table_cell_style)],
        [Paragraph("<b>Level 3</b>", table_cell_style), Paragraph("Vision Transformer (ViT-B/16)", table_cell_style), Paragraph("PyTorch / Torchvision", table_cell_style), Paragraph("Unfrozen Top 4 Encoder Layers", table_cell_style), Paragraph("Semantic Fake Prob & Conf", table_cell_style)],
        [Paragraph("<b>Level 4</b>", table_cell_style), Paragraph("Temporal Frame Aggregator", table_cell_style), Paragraph("OpenCV / PyTorch", table_cell_style), Paragraph("Uniform Frame Step Sampling", table_cell_style), Paragraph("Video AI Percentage & Verdict", table_cell_style)],
        [Paragraph("<b>Level 5</b>", table_cell_style), Paragraph("LLM / Rule Engine", table_cell_style), Paragraph("OpenAI / Python", table_cell_style), Paragraph("GPT-4o-mini + Rule Fallback", table_cell_style), Paragraph("Natural Language Text Report", table_cell_style)]
    ]
    summary_table = Table(summary_matrix, colWidths=[60, 120, 85, 135, 104])
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), secondary_color),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, light_bg]),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(summary_table)

    # Build PDF
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"[SUCCESS] PDF Report generated successfully at: {output_filename}")

if __name__ == "__main__":
    out_pdf = os.path.abspath("Multilevel_AI_Authenticity_Engine_Report.pdf")
    create_report(out_pdf)
