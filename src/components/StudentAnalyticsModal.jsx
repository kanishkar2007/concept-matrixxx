import React from 'react';
import { 
  X, 
  BarChart3, 
  AlertTriangle, 
  CheckCircle2, 
  BookOpen, 
  Download, 
  Trash2, 
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  Sparkles
} from 'lucide-react';
import { DOMAINS } from '../data/conceptKnowledgeBase';

export default function StudentAnalyticsModal({ 
  isOpen, 
  onClose, 
  savedConcepts = [], 
  onRemoveSaved, 
  onSelectConcept,
  solvedCount = 0,
  domainProgress = {} 
}) {
  if (!isOpen) return null;

  // Calculate stats
  const totalSaved = savedConcepts.length;

  const defaultProgress = {
    cs_algo: 65,
    mathematics: 50,
    physics: 40,
    ai_ml: 60,
    ...domainProgress
  };

  const handleExportMarkdown = () => {
    let md = `# ConceptPulse — My Revision Study Deck\nGenerated on: ${new Date().toLocaleDateString()}\n\n`;
    savedConcepts.forEach((concept, i) => {
      md += `## ${i + 1}. ${concept.title} (${concept.subfield})\n`;
      md += `**Domain:** ${concept.domain} | **Difficulty:** ${concept.difficulty}\n\n`;
      md += `### Summary\n${concept.summary}\n\n`;
      if (concept.formulas?.length) {
        md += `### Key Formulas\n`;
        concept.formulas.forEach(f => md += `- \`${f}\`\n`);
        md += `\n`;
      }
      if (concept.commonTraps?.length) {
        md += `### Common Student Traps\n`;
        concept.commonTraps.forEach(t => md += `- ⚠️ ${t}\n`);
        md += `\n`;
      }
      md += `---\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ConceptPulse-StudyDeck-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 rounded-2xl border border-indigo-500/30 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Student Concept Gap Radar</h3>
              <p className="text-xs text-slate-400">Diagnostic Mastery Analytics & Revision Deck</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Saved Concepts
              </span>
              <p className="text-2xl font-extrabold text-white mt-1">
                {totalSaved}
              </p>
              <span className="text-[10px] text-indigo-400">In Revision Deck</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Problems Mastered
              </span>
              <p className="text-2xl font-extrabold text-emerald-400 mt-1">
                {solvedCount}
              </p>
              <span className="text-[10px] text-emerald-400">Across Practice Banks</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Exam Readiness
              </span>
              <p className="text-2xl font-extrabold text-violet-400 mt-1">
                {Math.min(100, Math.round((solvedCount * 15) + (totalSaved * 8)) + 30)}%
              </p>
              <span className="text-[10px] text-violet-400">Diagnostic Composite</span>
            </div>
          </div>

          {/* Domain Mastery Bars (Radar Simulation) */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Domain Competency Breakdown
              </span>
              <span className="text-[11px] text-slate-400">Target Benchmark: 80%</span>
            </div>

            <div className="space-y-3">
              {DOMAINS.filter(d => d.id !== 'all').map(d => {
                const pct = defaultProgress[d.id] || 50;
                return (
                  <div key={d.id} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium">{d.label}</span>
                      <span className="text-slate-400 font-mono">{pct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Concept Gap Alerts */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Diagnosed Concept Gaps & Warning Triggers</span>
            </div>
            <p className="text-xs text-amber-200 leading-relaxed">
              Students attempting <strong>Eigenvalues & Matrix Analysis</strong> frequently stumble due to weak foundations in <em>Linear Independence & Null Space</em>. We recommend reviewing basic rank-nullity before attempting defective matrix questions.
            </p>
          </div>

          {/* Saved Revision Deck List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Saved Revision Deck ({savedConcepts.length})
              </span>
              {savedConcepts.length > 0 && (
                <button
                  onClick={handleExportMarkdown}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-indigo-300 border border-slate-700 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Markdown Study Guide</span>
                </button>
              )}
            </div>

            {savedConcepts.length === 0 ? (
              <div className="text-center py-8 rounded-xl bg-slate-950/40 border border-slate-800/80 text-slate-400 text-xs">
                <BookOpen className="w-6 h-6 mx-auto mb-2 text-slate-600" />
                <span>No concepts saved yet. Click "Save to Deck" on any matched concept to build your personalized exam review kit!</span>
              </div>
            ) : (
              <div className="space-y-2">
                {savedConcepts.map(c => (
                  <div
                    key={c.id}
                    className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-all"
                  >
                    <div 
                      onClick={() => {
                        onSelectConcept(c.id);
                        onClose();
                      }}
                      className="cursor-pointer group flex-1 mr-3"
                    >
                      <h4 className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-indigo-400 transition-all">
                        {c.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1">
                        {c.summary}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onSelectConcept(c.id);
                          onClose();
                        }}
                        className="px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 text-[11px] font-semibold transition-all"
                      >
                        Review &rarr;
                      </button>
                      <button
                        onClick={() => onRemoveSaved(c.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-all"
                        title="Remove from deck"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
