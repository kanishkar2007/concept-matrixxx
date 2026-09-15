# 📘 ConceptPulse — Student & Hackathon User Manual

Welcome to **ConceptPulse**! If the screen feels a bit dense or unfamiliar at first glance, don't worry. This manual breaks down **what every button does**, **why it is there**, and **how to use it step-by-step in under 2 minutes**.

---

## 🎯 What is the Purpose of this Website?

Most homework apps (like Chegg, ChatGPT, or Photomath) just give you the final homework answer. In exams, students fail because **they never understood the core concept behind the question**.

**ConceptPulse fixes this.** When you give it any question:
1. It identifies the **exact topic / concept** (e.g. *Dynamic Programming*, *Eigenvalues*, *Conservation of Momentum*).
2. It shows you the **math formulas & theory** you need to memorize.
3. It warns you about **common student mistakes ("Traps")** where 80% of students lose marks.
4. It maps out an **interactive concept tree** (what you need to learn first).
5. It offers a **Socratic AI tutor** that gives you hints without spoiling the solution.

---

## 🗺️ Step-by-Step Visual Walkthrough

```
+-------------------------------------------------------------------------+
| [NAVBAR] Domain Filter (CS, Math, Physics, AI) | Revision Deck | Radar |
+-------------------------------------------------------------------------+
|                                                                         |
| [1. QUESTION INPUT ZONE]                                                |
| - Type or paste a question                                              |
| - OR click one of the 4 "1-Click Presets" below the text box           |
| - Click "ANALYZE & MATCH CONCEPT"                                       |
|                                                                         |
+-------------------------------------------------------------------------+
|                                                                         |
| [2. CLEAN VIEW SWITCHER] (New!)                                         |
| [🌟 All Sections]  [📖 Concept & Traps]  [🕸️ Graph]  [🏋️ Practice]     |
|                                                                         |
+-------------------------------------------------------------------------+
|                                                                         |
| [3. SELECTED CONTENT VIEW]                                              |
| - Confidence Score (e.g., 96% Match)                                    |
| - Tabs: Formulas | Student Traps | Prerequisites | Real World Uses      |
| - Action Buttons: Socratic Tutor | Flashcard Drill | Save to Deck       |
|                                                                         |
+-------------------------------------------------------------------------+
```

---

## 🛠️ Detailed Feature Guide

### 1. How to Test a Question (Input Zone)
You have 3 easy ways:
- **Fastest Demo (Recommended for Judges)**: Click any of the 4 quick demo buttons under the input box (e.g. *Algorithms: Minimum Path Flight Costs* or *Math: Eigenvalues*). It fills the question and matches it instantly!
- **Your Own Question**: Type or paste any homework problem into the text box and click **"Analyze & Match Concept"**.
- **Batch Exam Paper Tab**: Click "Batch Exam Paper" at the top-left of the input box and click **"Load Sample Midterm Exam"**. It analyzes 4 questions at the same time and groups them!

---

### 2. Decluttering Your View with "Focus Mode"
Right above the results, you now have 4 view buttons:
- **🌟 All Sections**: Shows everything on one long scrollable page.
- **📖 Concept & Traps**: Hides everything else and shows **only** the theory, formulas, and common student pitfalls.
- **🕸️ Knowledge Graph**: Hides everything else and shows **only** the interactive concept map.
- **🏋️ Practice Bank**: Hides everything else and shows **only** the practice questions.

*Tip: If the screen feels too busy, click **📖 Concept & Traps** to focus on one thing at a time!*

---

### 3. Understanding the Concept Card Tabs
Inside the main concept result card:
- **Core Formulae & Theory**: KaTeX mathematical equations and theorems you must write down in exams.
- **⚠️ Student Traps & Pitfalls**: The most useful tab for students! Shows you the exact mistakes students make (off-by-one errors, sign errors, division by zero).
- **Prerequisite Readiness**: Tells you what foundational math or programming you need before studying this.
- **Real-World Applications**: Shows where this is used in real life (Google Maps, aerospace, rocket propulsion).

---

### 4. Interactive Action Buttons
- **🧠 Ask Socratic Tutor Co-pilot**: Opens a chat window with a tutor AI. Instead of giving you the answer, it gives progressive hints (*Analogy $\to$ Formula $\to$ Edge Cases $\to$ Solution Check*).
- **✨ Generate Flashcard Drill**: Opens flip flashcards. You can click them to reveal the answer and test your memory before tests.
- **🔖 Save to Deck**: Bookmarks the concept to your personal study kit.

---

### 5. The Knowledge Graph (What the Colors Mean)
- 🟡 **Yellow Node ("?")**: The question you asked.
- 🔵 **Pulsing Indigo Node ("★")**: The core concept detected.
- 🟢 **Green Nodes ("REQ")**: Prerequisites (what you need to know first).
- 🟣 **Purple Nodes ("NXT")**: Advanced topics that build on this concept.
- *You can hover over any circle to see an explanation tooltip!*

---

### 6. Top Navigation Bar Shortcuts
- **Domain Filter Pills (All, CS, Math, Physics, AI)**: Click to restrict search only to your subject.
- **Revision Deck**: Opens your saved topics and lets you export a **clean Markdown study guide** with one click!
- **Mastery Radar**: Shows your progress bars across subjects.
- **Key Icon**: Optional settings to paste a Google Gemini API key if you want live AI analysis for unusual questions.

---

## 🎤 60-Second Demo Pitch for Hackathon Judges

> *"Judges, current AI tools like ChatGPT spoon-feed students direct answers to their homework, leading to high grades but zero understanding on final exams.*
>
> *We built **ConceptPulse**: an academic intelligence platform that maps any question back to foundational curriculum concepts. It diagnoses Bloom's taxonomy difficulty, warns students about misconception traps where 80% lose marks, visualizes prerequisite knowledge graphs, and guides them with a Socratic AI co-pilot rather than spoiling answers.*
>
> *Let me demonstrate with one click: here is a Dijkstra shortest-path problem... [click preset]. Notice how ConceptPulse maps it to Priority Queues, highlights the non-negative weight trap, and generates 3 adaptive practice problems."*
