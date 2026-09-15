import React from 'react';
import { 
  Sparkles, 
  BrainCircuit, 
  Layers, 
  BookOpen, 
  BarChart3, 
  Key, 
  Flame,
  CheckCircle2
} from 'lucide-react';
import { DOMAINS } from '../data/conceptKnowledgeBase';

export default function Navbar({ 
  selectedDomain, 
  onSelectDomain, 
  savedCount, 
  onOpenDeck, 
  onOpenAnalytics, 
  onOpenSettings,
  hasApiKey 
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand & Tagline */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/25">
              <BrainCircuit className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                  ConceptPulse
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Hackathon Pro
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Question to Concept Matching & Diagnostic Engine
              </p>
            </div>
          </div>

          {/* Center Domain Filter Chips */}
          <div className="hidden md:flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800">
            {DOMAINS.map(domain => {
              const active = selectedDomain === domain.id;
              return (
                <button
                  key={domain.id}
                  onClick={() => onSelectDomain(domain.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    active 
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30 font-semibold' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {domain.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Revision Deck Button */}
            <button
              onClick={onOpenDeck}
              className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all shadow-sm"
              title="View your saved Revision Deck"
            >
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">Revision Deck</span>
              {savedCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-indigo-500 text-white text-[10px] font-bold">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Concept Gap Radar / Analytics */}
            <button
              onClick={onOpenAnalytics}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all shadow-sm"
              title="Student Concept Gap Radar & Analytics"
            >
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Mastery Radar</span>
            </button>

            {/* Gemini Live API Config */}
            <button
              onClick={onOpenSettings}
              className={`p-2 rounded-lg text-xs font-medium border transition-all ${
                hasApiKey
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                  : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
              title={hasApiKey ? 'Gemini Live AI Active' : 'Configure Gemini API Key'}
            >
              <Key className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Mobile Domain Chips Bar */}
        <div className="flex md:hidden overflow-x-auto pb-2 gap-1.5 no-scrollbar">
          {DOMAINS.map(domain => {
            const active = selectedDomain === domain.id;
            return (
              <button
                key={domain.id}
                onClick={() => onSelectDomain(domain.id)}
                className={`whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  active 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                {domain.label}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
