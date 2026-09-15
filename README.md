# ConceptPulse (SynapseLearn)
### Pro-Level Question-to-Concept Matching & Diagnostic Intelligence System for Students

> **Hackathon Edition** — Designed to bridge the gap between solving practice problems and achieving true conceptual mastery. Instead of just returning raw homework answers, ConceptPulse extracts underlying academic concepts, generates interactive knowledge graphs, flags student misconception traps, and provides a Socratic AI co-pilot.

---

## 🌟 Key Features

### 1. Intelligent Question & Exam Input Engine
- **Single Question Text Area**: Direct paste or typing with LaTeX math support ($\lambda$, $\sum$, $\nabla$, matrices).
- **1-Click Hackathon Demo Presets**: Ready-to-demo questions across Computer Science, Calculus, Classical Mechanics, and Deep Learning.
- **Batch Exam Paper Parser**: Paste complete multi-question exams or assignments to generate an exam-wide Concept Distribution Matrix.
- **Snapshot OCR Simulator**: Simulates scanning whiteboard photos or textbook snapshots with 1-click text extraction.

### 2. Deep Concept Analysis & Diagnostic Card
- **Primary Concept Match**: Matched title, subfield, confidence % score, Bloom's Taxonomy Level (e.g. *Analysis*, *Evaluation*, *Application*).
- **Core Formulae & Theory**: Essential mathematical formulations rendered via KaTeX.
- **Student Traps & Pitfalls ("Where 80% of Students Lose Marks")**: Exam-critical misconceptions, edge cases, and typical student misunderstandings.
- **Prerequisite Readiness Checklist**: Identifies what you need to know first and subsequent topics unlocked.
- **Real-World Applications**: Where this concept is applied in industry (bioinformatics, self-driving cars, robotics, finance).

### 3. Interactive Visual Knowledge Graph
- **Radial Knowledge Network**: Visual SVG representation connecting the Question node to the Target Concept, Prerequisite concepts, and Successor extension topics.
- **Hover & Click Interactivity**: Inspect nodes and traverse the curriculum graph dynamically.

### 4. Socratic AI Concept Co-Pilot
- Guided learning assistant that resists spoon-feeding answers; uses Socratic questioning, real-world analogies, and conceptual checkpoints to guide the student's thought process.

### 5. Adaptive Practice Question Bank
- Curated practice questions calibrated to test mastery of the identified concept across three tiers:
  - 🟢 **Warm-up** (conceptual drill)
  - 🟡 **Core Exam** (standard university exam problem)
  - 🔴 **FAANG / Challenge** (rigorous application / Olympiad)
- Revealable hints and concept invariants with celebratory confetti on solve.

### 6. Student Study Hub & Concept Gap Radar
- **Mastery Progress Bars**: Tracks student competency across Computer Science, Mathematics, Physics, and AI.
- **Diagnosed Concept Gaps**: Early warning alerts for weak prerequisite foundations.
- **Personalized Revision Deck**: Bookmark concepts and export a complete Markdown study sheet for exam review.
- **Active Recall Flashcards**: Interactive flip flashcards for spaced repetition.

### 7. Dual AI Architecture
- **Instant Offline Engine**: 100% functional out-of-the-box with pre-indexed multi-domain concept database (zero API keys needed, zero demo lag).
- **Gemini Live AI Option**: Optional Google Gemini API key configuration to analyze novel arbitrary questions in real-time.

---

## 🚀 Running the Project

1. Navigate to the project directory:
   ```bash
   cd c:\Users\kani7\OneDrive\Desktop\concept-matrix
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Open your browser:
   **`http://localhost:5173`**

---

## 🛠️ Tech Stack
- **Frontend Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS + Glassmorphism UI
- **Icons**: Lucide React
- **Formulas**: KaTeX Math Rendering
- **Interactions & Effects**: Canvas Confetti, SVG Force/Radial Layouts
