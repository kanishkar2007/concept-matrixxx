import React, { useState } from 'react';
import { 
  Sparkles, 
  Bookmark, 
  BookmarkCheck, 
  BrainCircuit, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  GraduationCap, 
  ExternalLink,
  HelpCircle,
  Dumbbell,
  Share2,
  Check
} from 'lucide-react';
import MathView from './MathView';

export default function ConceptMatchResult({
  matchResult,
  isSaved,
  onToggleSave,
  onOpenTutor,
  onOpenFlashcards,
  onScrollToPractice
}) {
  const [activeTab, setActiveTab] = useState('theory'); // 'theory' | 'traps' | 'prereqs' | 'realworld'
  const [copied, setCopied] = useState(false);

  if (!matchResult || !matchResult.primaryConcept) return null;

  const { primaryConcept, confidence, detectedBloom, secondaryConcepts, matchedKeywords } = matchResult;

  const handleCopySummary = () => {
    const text = `${primaryConcept.title} (${primaryConcept.subfield})\nSummary: ${primaryConcept.summary}\nKey Formula: ${primaryConcept.formulas?.[0] || 'N/A'}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Difficulty badge colors
  const difficultyStyles = {
    'Foundational': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    'Foundational to Intermediate': 'bg-teal-500/10 text-teal-400 border-teal-500/30',
    'Intermediate': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    'Advanced': 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  }[primaryConcept.difficulty] || 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';

  return (
    <div className="w-full glass-panel rounded-2xl p-5 sm:p-7 shadow-2xl border border-indigo-500/30 relative overflow-hidden transition-all">
      
      {/* Glow highlight background */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner: Confidence & Meta Tags */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Match Confidence Score */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>{confidence}% Concept Match</span>
          </div>

          {/* Bloom's Taxonomy Level */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/30 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5 text-violet-400" />
            <span>Bloom: {detectedBloom}</span>
          </div>

          {/* Difficulty Level */}
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${difficultyStyles}`}>
            {primaryConcept.difficulty}
          </span>

          {/* Time to Master */}
          {primaryConcept.timeToMaster && (
            <div className="hidden sm:flex items-center gap-1 text-slate-400 text-xs">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Est. {primaryConcept.timeToMaster}</span>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopySummary}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs transition-all"
            title="Copy Concept Summary"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => onToggleSave(primaryConcept)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              isSaved
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
            }`}
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="w-4 h-4 text-amber-400" />
                <span>Saved to Deck</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                <span>Save to Deck</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Concept Header */}
      <div className="mt-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
          <span>{primaryConcept.subfield}</span>
          {primaryConcept.domain && (
            <>
              <span>•</span>
              <span className="text-slate-400">{primaryConcept.domain.replace('_', ' ').toUpperCase()}</span>
            </>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
          {primaryConcept.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
          {primaryConcept.summary}
        </p>
      </div>

      {/* Secondary Concept Tag pills */}
      {secondaryConcepts && secondaryConcepts.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-800/60">
          <span className="text-xs text-slate-400 font-medium">Overlapping Sub-concepts:</span>
          {secondaryConcepts.map(sec => (
            <span
              key={sec.id}
              className="px-2.5 py-0.5 rounded-md bg-slate-900 text-cyan-300 border border-cyan-500/20 text-xs"
            >
              {sec.title}
            </span>
          ))}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 mt-6 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('theory')}
          className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'theory'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Core Formulae & Theory
        </button>

        <button
          onClick={() => setActiveTab('traps')}
          className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'traps'
              ? 'border-rose-500 text-rose-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
          <span>Student Traps & Pitfalls</span>
        </button>

        <button
          onClick={() => setActiveTab('prereqs')}
          className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'prereqs'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Prerequisite Readiness
        </button>

        <button
          onClick={() => setActiveTab('realworld')}
          className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'realworld'
              ? 'border-cyan-500 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Real-World Applications
        </button>
      </div>

      {/* TAB CONTENT PANELS */}
      <div className="mt-4">
        
        {/* TAB 1: THEORY & FORMULAE */}
        {activeTab === 'theory' && (
          <div className="space-y-4 animate-fade-in">
            {/* Formulas Box */}
            {primaryConcept.formulas && primaryConcept.formulas.length > 0 && (
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Essential Mathematical / Algorithmic Formulations
                </span>
                <div className="space-y-2">
                  {primaryConcept.formulas.map((formula, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 font-mono text-xs sm:text-sm text-indigo-200 overflow-x-auto">
                      <MathView math={formula} block={true} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Theorems */}
            {primaryConcept.keyTheorems && (
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Fundamental Invariants & Theorems
                </span>
                <ul className="space-y-2">
                  {primaryConcept.keyTheorems.map((theorem, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span>{theorem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: STUDENT TRAPS & PITFALLS ("Where students lose marks") */}
        {activeTab === 'traps' && (
          <div className="space-y-3 animate-fade-in">
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-rose-300 text-xs">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 text-rose-400" />
              <span>
                <strong>High-frequency exam mistakes:</strong> Review these common conceptual pitfalls before attempting related practice questions.
              </span>
            </div>

            <div className="space-y-2.5">
              {primaryConcept.commonTraps?.map((trap, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/30 transition-all flex items-start gap-3"
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {trap}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PREREQUISITE READINESS */}
        {activeTab === 'prereqs' && (
          <div className="space-y-3 animate-fade-in">
            <p className="text-xs text-slate-300">
              Ensure you have solid foundations in these prerequisite topics before diving into complex problems.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {primaryConcept.prerequisites?.map(prereq => (
                <div 
                  key={prereq.id}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs sm:text-sm font-medium text-slate-200">{prereq.title}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    {prereq.status || 'Foundational'}
                  </span>
                </div>
              ))}
            </div>

            {primaryConcept.successors && (
              <div className="mt-4 pt-4 border-t border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Next-Level Successor Topics to Unlock:
                </span>
                <div className="flex flex-wrap gap-2">
                  {primaryConcept.successors.map(succ => (
                    <span 
                      key={succ.id}
                      className="px-3 py-1 rounded-lg bg-violet-500/10 text-violet-300 border border-violet-500/25 text-xs font-medium"
                    >
                      {succ.title} &rarr;
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: REAL-WORLD APPLICATIONS */}
        {activeTab === 'realworld' && (
          <div className="space-y-2.5 animate-fade-in">
            {primaryConcept.realWorldUse?.map((use, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all flex items-start gap-3"
              >
                <div className="p-1.5 rounded-lg bg-cyan-500/15 text-cyan-400 flex-shrink-0 mt-0.5">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {use}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Interactive Quick-Action Toolbar */}
      <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Socratic AI Tutor Trigger */}
          <button
            onClick={onOpenTutor}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md shadow-violet-500/20 hover:shadow-violet-500/35 transition-all"
          >
            <BrainCircuit className="w-4 h-4 text-violet-200" />
            <span>Ask Socratic Tutor Co-pilot</span>
          </button>

          {/* Flashcards Generator Trigger */}
          <button
            onClick={onOpenFlashcards}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white border border-slate-700 hover:border-slate-600 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Generate Flashcard Drill</span>
          </button>
        </div>

        {/* Scroll to Practice Questions */}
        <button
          onClick={onScrollToPractice}
          className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-all"
        >
          <Dumbbell className="w-3.5 h-3.5" />
          <span>Jump to {primaryConcept.practiceQuestions?.length || 3} Practice Problems &darr;</span>
        </button>
      </div>

    </div>
  );
}
