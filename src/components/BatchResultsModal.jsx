import React from 'react';
import { 
  X, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  PieChart,
  Layers
} from 'lucide-react';

export default function BatchResultsModal({ 
  isOpen, 
  onClose, 
  batchResults = [], 
  onSelectResult 
}) {
  if (!isOpen || batchResults.length === 0) return null;

  // Calculate domain stats
  const domainCounts = {};
  batchResults.forEach(r => {
    if (r.matchedConcept) {
      const d = r.matchedConcept.domain;
      domainCounts[d] = (domainCounts[d] || 0) + 1;
    }
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 rounded-2xl border border-cyan-500/30 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Exam Paper Concept Matrix</h3>
              <p className="text-xs text-slate-400">
                Batch Diagnostic: {batchResults.length} Questions Mapped to Curriculum Topics
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* Summary Topic Breakdown Badges */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Curriculum Distribution Across Paper:
            </span>
            <div className="flex flex-wrap gap-2">
              {Object.entries(domainCounts).map(([domain, count]) => (
                <span
                  key={domain}
                  className="px-3 py-1 rounded-lg bg-slate-900 text-cyan-300 border border-cyan-500/25 text-xs font-medium flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>{domain.replace('_', ' ').toUpperCase()}: {count} Qs ({Math.round((count / batchResults.length) * 100)}%)</span>
                </span>
              ))}
            </div>
          </div>

          {/* Question List */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Individual Question to Concept Matches:
            </span>

            {batchResults.map((result, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="flex-1 pr-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      Q{result.number || idx + 1}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {result.matchedConcept?.title || 'Unknown Concept'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Bloom: {result.bloomLevel}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {result.text}
                  </p>
                </div>

                <button
                  onClick={() => {
                    onSelectResult(result);
                    onClose();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold whitespace-nowrap self-end sm:self-center transition-all shadow-sm"
                >
                  <span>Inspect Concept</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
