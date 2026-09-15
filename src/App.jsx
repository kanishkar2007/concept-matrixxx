import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import QuestionInputSection from './components/QuestionInputSection';
import ConceptMatchResult from './components/ConceptMatchResult';
import KnowledgeGraphView from './components/KnowledgeGraphView';
import SocraticTutor from './components/SocraticTutor';
import AdaptivePracticeBank from './components/AdaptivePracticeBank';
import StudentAnalyticsModal from './components/StudentAnalyticsModal';
import FlashcardModal from './components/FlashcardModal';
import BatchResultsModal from './components/BatchResultsModal';
import GeminiSettingsModal from './components/GeminiSettingsModal';
import { CONCEPTS, DEMO_PRESET_QUESTIONS } from './data/conceptKnowledgeBase';
import { matchQuestionToConcept, parseExamPaper, matchWithGeminiAPI } from './services/conceptMatcher';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, ArrowUp } from 'lucide-react';

export default function App() {
  // Input and domain state
  const [inputText, setInputText] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [matchResult, setMatchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Modals state
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isFlashcardsOpen, setIsFlashcardsOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [batchResults, setBatchResults] = useState([]);

  // Toast notification
  const [toastMessage, setToastMessage] = useState('');

  // Persisted user state
  const [savedConceptIds, setSavedConceptIds] = useState(() => {
    try {
      const stored = localStorage.getItem('cp_saved_concepts');
      return stored ? JSON.parse(stored) : ['dynamic-programming', 'eigenvalues-linear-algebra'];
    } catch (e) {
      return ['dynamic-programming'];
    }
  });

  const [solvedQuestionIds, setSolvedQuestionIds] = useState(() => {
    try {
      const stored = localStorage.getItem('cp_solved_questions');
      return stored ? JSON.parse(stored) : ['dp-1'];
    } catch (e) {
      return [];
    }
  });

  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('cp_gemini_api_key') || '';
  });

  // Active view switcher for clean decluttering: 'all' | 'concept' | 'graph' | 'practice'
  const [activeViewMode, setActiveViewMode] = useState('all');

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('cp_saved_concepts', JSON.stringify(savedConceptIds));
  }, [savedConceptIds]);

  useEffect(() => {
    localStorage.setItem('cp_solved_questions', JSON.stringify(solvedQuestionIds));
  }, [solvedQuestionIds]);

  // Initial load: automatically analyze the first preset demo question for instant hackathon showcase
  useEffect(() => {
    const initialDemo = DEMO_PRESET_QUESTIONS[0];
    setInputText(initialDemo.prompt);
    const result = matchQuestionToConcept(initialDemo.prompt, 'all');
    setMatchResult(result);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Main question analysis
  const handleAnalyze = async (textToAnalyze) => {
    const query = textToAnalyze || inputText;
    if (!query.trim()) return;

    setIsLoading(true);

    try {
      if (apiKey) {
        // Try live Gemini API first
        try {
          const geminiResult = await matchWithGeminiAPI(query, apiKey);
          setMatchResult(geminiResult);
          showToast('Live Gemini AI Match Completed!');
          setIsLoading(false);
          return;
        } catch (apiErr) {
          console.warn('Gemini API call failed, falling back to local engine:', apiErr);
          showToast('Gemini API error — fallback to High-Accuracy Local Engine');
        }
      }

      // Fast, zero-friction local semantic matcher
      setTimeout(() => {
        const result = matchQuestionToConcept(query, selectedDomain);
        setMatchResult(result);
        setIsLoading(false);
        showToast('Concept Matched with High Confidence');
        setTimeout(() => {
          document.getElementById('match-result-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      }, 350);

    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  // Batch exam paper analysis
  const handleBatchAnalyze = (batchText) => {
    setIsLoading(true);
    setTimeout(() => {
      const results = parseExamPaper(batchText);
      setBatchResults(results);
      setIsLoading(false);
      setIsBatchModalOpen(true);
      showToast(`Analyzed ${results.length} questions from Exam Paper!`);
    }, 450);
  };

  // Select concept by ID (e.g. from knowledge graph or analytics)
  const handleSelectConceptById = (conceptId) => {
    const found = CONCEPTS.find(c => c.id === conceptId);
    if (found) {
      setMatchResult({
        primaryConcept: found,
        confidence: 94,
        rawScore: 90,
        matchedKeywords: found.keywords.slice(0, 3),
        secondaryConcepts: [],
        detectedBloom: found.bloomLevel || 'Analysis',
        source: 'navigation'
      });
      setInputText(`Exploring curriculum concept: ${found.title} - ${found.summary}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showToast(`Navigated to ${found.title}`);
    }
  };

  // Toggle saving to Revision Deck
  const handleToggleSave = (concept) => {
    const exists = savedConceptIds.includes(concept.id);
    if (exists) {
      setSavedConceptIds(prev => prev.filter(id => id !== concept.id));
      showToast(`Removed "${concept.title}" from Revision Deck`);
    } else {
      setSavedConceptIds(prev => [...prev, concept.id]);
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.2 } });
      showToast(`Saved "${concept.title}" to Revision Deck!`);
    }
  };

  // Mark question solved
  const handleSolveQuestion = (qId) => {
    if (!solvedQuestionIds.includes(qId)) {
      setSolvedQuestionIds(prev => [...prev, qId]);
      showToast('Problem marked solved! Mastery score updated.');
    }
  };

  const handleSaveApiKey = (newKey) => {
    setApiKey(newKey);
    localStorage.setItem('cp_gemini_api_key', newKey);
    showToast(newKey ? 'Gemini API Key Saved!' : 'Gemini Key Cleared');
  };

  const scrollToPractice = () => {
    document.getElementById('practice-bank-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Get full saved concept objects for analytics
  const savedConceptsList = CONCEPTS.filter(c => savedConceptIds.includes(c.id));

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white shadow-xl shadow-indigo-500/30 text-xs font-semibold animate-slide-up">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navigation Bar */}
      <Navbar
        selectedDomain={selectedDomain}
        onSelectDomain={(domain) => {
          setSelectedDomain(domain);
          // If current question exists, re-match with new domain filter
          if (inputText) handleAnalyze(inputText);
        }}
        savedCount={savedConceptIds.length}
        onOpenDeck={() => setIsAnalyticsOpen(true)}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        hasApiKey={!!apiKey}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        
        {/* Hero Tagline for Hackathon presentation */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Curriculum & Concept Matching Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Stop Memorizing Answers. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Master the Underlying Concepts.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Paste any exam question, assignment, or quiz. ConceptPulse reveals the foundational concept, maps prerequisite knowledge graphs, flags common traps, and guides you with Socratic tutoring.
          </p>
        </div>

        {/* Question Input Zone */}
        <section>
          <QuestionInputSection
            inputText={inputText}
            setInputText={setInputText}
            onAnalyze={handleAnalyze}
            onBatchAnalyze={handleBatchAnalyze}
            isLoading={isLoading}
            selectedDomain={selectedDomain}
          />
        </section>

        {/* Primary Match Result & Deep-Dive */}
        {matchResult && matchResult.primaryConcept && (
          <section id="match-result-section" className="space-y-6 animate-fade-in scroll-mt-20">
            {/* View Mode Switcher for Clean, Clutter-Free Browsing */}
            <div className="flex items-center justify-between flex-wrap gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-sm">
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setActiveViewMode('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    activeViewMode === 'all'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  🌟 All Sections
                </button>
                <button
                  onClick={() => setActiveViewMode('concept')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    activeViewMode === 'concept'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  📖 Concept & Traps
                </button>
                <button
                  onClick={() => setActiveViewMode('graph')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    activeViewMode === 'graph'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  🕸️ Knowledge Graph
                </button>
                <button
                  onClick={() => setActiveViewMode('practice')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    activeViewMode === 'practice'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  🏋️ Practice Bank ({matchResult.primaryConcept.practiceQuestions?.length || 3})
                </button>
              </div>

              <span className="text-[11px] text-slate-400 px-2 hidden lg:inline">
                Focus Mode: Select a section to declutter your view
              </span>
            </div>

            {/* Concept Deep-Dive Card */}
            {(activeViewMode === 'all' || activeViewMode === 'concept') && (
              <ConceptMatchResult
                matchResult={matchResult}
                isSaved={savedConceptIds.includes(matchResult.primaryConcept.id)}
                onToggleSave={handleToggleSave}
                onOpenTutor={() => setIsTutorOpen(true)}
                onOpenFlashcards={() => setIsFlashcardsOpen(true)}
                onScrollToPractice={() => {
                  setActiveViewMode('practice');
                  scrollToPractice();
                }}
              />
            )}

            {/* Interactive Knowledge Graph */}
            {(activeViewMode === 'all' || activeViewMode === 'graph') && (
              <KnowledgeGraphView
                primaryConcept={matchResult.primaryConcept}
                secondaryConcepts={matchResult.secondaryConcepts}
                onSelectConcept={handleSelectConceptById}
              />
            )}

            {/* Adaptive Practice Bank */}
            {(activeViewMode === 'all' || activeViewMode === 'practice') && (
              <AdaptivePracticeBank
                concept={matchResult.primaryConcept}
                onSolveQuestion={handleSolveQuestion}
                solvedQuestions={solvedQuestionIds}
              />
            )}
          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-slate-950/90 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">ConceptPulse</span>
            <span>—</span>
            <span>Empowering Students with Concept-First Learning</span>
          </div>
          <p>Built with React, Vite & Tailwind CSS for Hackathon Showcase</p>
        </div>
      </footer>

      {/* Socratic Tutor Interactive Modal */}
      {matchResult && matchResult.primaryConcept && (
        <SocraticTutor
          isOpen={isTutorOpen}
          onClose={() => setIsTutorOpen(false)}
          concept={matchResult.primaryConcept}
          questionText={inputText}
        />
      )}

      {/* Flashcard Drill Modal */}
      {matchResult && matchResult.primaryConcept && (
        <FlashcardModal
          isOpen={isFlashcardsOpen}
          onClose={() => setIsFlashcardsOpen(false)}
          concept={matchResult.primaryConcept}
        />
      )}

      {/* Student Analytics & Revision Deck Modal */}
      <StudentAnalyticsModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        savedConcepts={savedConceptsList}
        onRemoveSaved={(id) => setSavedConceptIds(prev => prev.filter(cId => cId !== id))}
        onSelectConcept={handleSelectConceptById}
        solvedCount={solvedQuestionIds.length}
      />

      {/* Batch Exam Paper Matrix Modal */}
      <BatchResultsModal
        isOpen={isBatchModalOpen}
        onClose={() => setIsBatchModalOpen(false)}
        batchResults={batchResults}
        onSelectResult={(item) => {
          setInputText(item.text);
          if (item.matchedConcept) {
            setMatchResult({
              primaryConcept: item.matchedConcept,
              confidence: item.confidence,
              rawScore: 90,
              matchedKeywords: item.matchedConcept.keywords?.slice(0, 3) || [],
              secondaryConcepts: [],
              detectedBloom: item.bloomLevel,
              source: 'batch_inspection'
            });
          } else {
            handleAnalyze(item.text);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Gemini AI Settings Modal */}
      <GeminiSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={apiKey}
        onSaveKey={handleSaveApiKey}
      />

    </div>
  );
}
