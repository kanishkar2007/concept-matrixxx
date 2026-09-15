import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  RotateCw, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FlashcardModal({ isOpen, onClose, concept }) {
  if (!isOpen || !concept || !concept.flashcards || concept.flashcards.length === 0) {
    return null;
  }

  const flashcards = concept.flashcards;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);

  const card = flashcards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Completed all cards
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      setCurrentIndex(flashcards.length); // trigger summary screen
    }
  };

  const handleMarkKnown = () => {
    setKnownCount(prev => prev + 1);
    handleNext();
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCount(0);
  };

  const isCompleted = currentIndex >= flashcards.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 rounded-2xl border border-indigo-500/40 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">Active Recall Flashcards</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-medium">
              {concept.title}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Content Area */}
        <div className="p-6">
          {!isCompleted ? (
            <div>
              {/* Progress indicator */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span>Card {currentIndex + 1} of {flashcards.length}</span>
                <span className="text-emerald-400 font-medium">{knownCount} Mastered</span>
              </div>

              {/* Card Container */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="min-h-[220px] rounded-2xl p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 border border-slate-800 hover:border-indigo-500/40 cursor-pointer flex flex-col justify-between transition-all shadow-inner relative group"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-mono text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                    {isFlipped ? 'ANSWER' : 'QUESTION'}
                  </span>
                  <span className="text-[11px] flex items-center gap-1 text-slate-400 group-hover:text-indigo-300 transition-all">
                    <RotateCw className="w-3 h-3" />
                    <span>Click to flip</span>
                  </span>
                </div>

                <div className="my-auto py-4">
                  {isFlipped ? (
                    <p className="text-sm sm:text-base text-emerald-300 font-medium leading-relaxed whitespace-pre-wrap animate-fade-in">
                      {card.a}
                    </p>
                  ) : (
                    <p className="text-sm sm:text-base text-slate-100 font-semibold leading-relaxed animate-fade-in">
                      {card.q}
                    </p>
                  )}
                </div>

                <div className="text-[10px] text-center text-slate-500">
                  {isFlipped ? 'Did you get it right?' : 'Formulate the concept in your mind, then tap to verify.'}
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center justify-between gap-3 mt-6">
                <button
                  onClick={handleNext}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-all"
                >
                  Review Again Later
                </button>

                <button
                  onClick={handleMarkKnown}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/20 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>I Know This!</span>
                </button>
              </div>
            </div>
          ) : (
            /* Flashcard Completion Screen */
            <div className="text-center py-6 space-y-4 animate-slide-up">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-white">Drill Completed!</h4>
                <p className="text-xs text-slate-400 mt-1">
                  You reviewed all flashcards for <strong className="text-indigo-300">{concept.title}</strong>.
                </p>
                <p className="text-sm font-bold text-emerald-400 mt-2">
                  Score: {knownCount} / {flashcards.length} Confirmed Mastered
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleRestart}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
                >
                  Drill Again
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-500/25 transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
