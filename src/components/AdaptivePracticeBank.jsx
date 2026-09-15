import React, { useState } from 'react';
import { 
  Dumbbell, 
  Lightbulb, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Check,
  Flame,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdaptivePracticeBank({ concept, onSolveQuestion, solvedQuestions = [] }) {
  const [expandedHints, setExpandedHints] = useState({});
  const [expandedChecks, setExpandedChecks] = useState({});

  if (!concept || !concept.practiceQuestions || concept.practiceQuestions.length === 0) {
    return null;
  }

  const toggleHint = (id) => {
    setExpandedHints(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCheck = (id) => {
    setExpandedChecks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSolve = (qId) => {
    // Trigger celebratory confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
    if (onSolveQuestion) {
      onSolveQuestion(qId, concept.domain);
    }
  };

  const tierStyles = {
    'Warm-up': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    'Core Exam': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    'FAANG / Challenge': 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  };

  return (
    <div id="practice-bank-section" className="w-full glass-panel rounded-2xl p-5 sm:p-7 shadow-xl border border-slate-800">
      
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Adaptive Concept Practice Bank
            </h2>
            <p className="text-xs text-slate-400">
              Exam-level practice calibrated to test mastery of <strong className="text-indigo-300">{concept.title}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <Award className="w-4 h-4 text-indigo-400" />
          <span>{solvedQuestions.filter(id => concept.practiceQuestions.some(q => q.id === id)).length} of {concept.practiceQuestions.length} Mastered</span>
        </div>
      </div>

      {/* Question Cards Grid */}
      <div className="space-y-4">
        {concept.practiceQuestions.map((question, idx) => {
          const isSolved = solvedQuestions.includes(question.id);
          const isHintOpen = !!expandedHints[question.id];
          const isCheckOpen = !!expandedChecks[question.id];

          return (
            <div
              key={question.id}
              className={`rounded-xl p-4 sm:p-5 border transition-all ${
                isSolved
                  ? 'bg-emerald-950/20 border-emerald-500/30'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-400">
                    Q{idx + 1}.
                  </span>
                  <h3 className="text-sm font-bold text-slate-100">
                    {question.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${tierStyles[question.tier] || tierStyles['Core Exam']}`}>
                    {question.tier}
                  </span>

                  <button
                    onClick={() => handleSolve(question.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                      isSolved
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    {isSolved ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Mastered!</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Mark Solved</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Problem Prompt */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2 mb-4 bg-slate-950/60 p-3.5 rounded-lg border border-slate-850">
                {question.prompt}
              </p>

              {/* Reveal Controls (Hint & Logic Check) */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => toggleHint(question.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-850 text-xs font-medium text-amber-300 border border-amber-500/30 transition-all"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>{isHintOpen ? 'Hide Hint' : 'Reveal Conceptual Hint'}</span>
                  {isHintOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>

                <button
                  onClick={() => toggleCheck(question.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-850 text-xs font-medium text-indigo-300 border border-indigo-500/30 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isCheckOpen ? 'Hide Solution Invariant' : 'Check Concept Invariant'}</span>
                  {isCheckOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              {/* Expandable Hint Box */}
              {isHintOpen && (
                <div className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 animate-slide-up leading-relaxed">
                  <strong>💡 Conceptual Clue:</strong> {question.hint}
                </div>
              )}

              {/* Expandable Solution Check */}
              {isCheckOpen && (
                <div className="mt-3 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-200 animate-slide-up leading-relaxed">
                  <strong>🎯 Key Concept Invariant:</strong> {question.conceptCheck}
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
