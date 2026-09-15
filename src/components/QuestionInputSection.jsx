import React, { useState } from 'react';
import { 
  Sparkles, 
  FileText, 
  Camera, 
  Send, 
  RotateCcw, 
  HelpCircle, 
  Zap,
  ArrowRight,
  UploadCloud,
  Check
} from 'lucide-react';
import { DEMO_PRESET_QUESTIONS } from '../data/conceptKnowledgeBase';

export default function QuestionInputSection({ 
  inputText, 
  setInputText, 
  onAnalyze, 
  onBatchAnalyze,
  isLoading,
  selectedDomain 
}) {
  const [activeTab, setActiveTab] = useState('single'); // 'single' | 'batch' | 'ocr'
  const [batchText, setBatchText] = useState('');
  const [ocrLoading, setOcrLoading] = useState(false);

  // Filter preset questions by domain if domain is selected
  const visiblePresets = selectedDomain === 'all' 
    ? DEMO_PRESET_QUESTIONS 
    : DEMO_PRESET_QUESTIONS.filter(q => q.domain === selectedDomain);

  const handleSelectPreset = (preset) => {
    setInputText(preset.prompt);
    onAnalyze(preset.prompt);
  };

  const handleBatchSubmit = (e) => {
    e.preventDefault();
    if (batchText.trim()) {
      onBatchAnalyze(batchText);
    }
  };

  const handleSimulateOCR = (sampleQuestion) => {
    setOcrLoading(true);
    setTimeout(() => {
      setInputText(sampleQuestion);
      setOcrLoading(false);
      setActiveTab('single');
      onAnalyze(sampleQuestion);
    }, 900);
  };

  const sampleExamPaper = `1. In a network of routers with non-negative communication latency, determine the least-cost packet delivery path from server A to all other nodes. Why must edge weights remain non-negative?
2. A robotic cart of mass 4kg traveling at 5m/s hits a stationary 2kg cart. They stick together after impact. Calculate the final velocity and state why mechanical kinetic energy is lost.
3. Find the eigenvalues of a 2x2 matrix with characteristic equation det(A - lambda I) = 0 and prove when diagonalization fails.
4. During training of a deep convolutional network, validation loss begins rising after epoch 20 while training error keeps decreasing. Explain how L2 weight decay and Dropout address this issue.`;

  return (
    <div className="w-full glass-panel rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-800">
      
      {/* Mode Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('single')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'single'
                ? 'bg-indigo-600/90 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>Single Question</span>
          </button>

          <button
            onClick={() => setActiveTab('batch')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'batch'
                ? 'bg-indigo-600/90 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-cyan-300" />
            <span>Batch Exam Paper</span>
          </button>

          <button
            onClick={() => setActiveTab('ocr')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'ocr'
                ? 'bg-indigo-600/90 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-emerald-300" />
            <span>Snapshot OCR</span>
          </button>
        </div>

        <span className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400">
          <Zap className="w-3 h-3 text-amber-400" />
          <span>Real-time Semantic Mapping</span>
        </span>
      </div>

      {/* TAB 1: SINGLE QUESTION INPUT */}
      {activeTab === 'single' && (
        <div>
          <div className="relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (inputText.trim() && !isLoading) {
                    onAnalyze(inputText);
                  }
                }
              }}
              placeholder="Paste or type any homework, quiz, or exam question here (e.g., 'Given weights and values of N items, find max value within weight limit W. Why does greedy approach fail?')..."
              rows={4}
              className="w-full bg-slate-900/90 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none resize-none transition-all shadow-inner"
            />
            {inputText && (
              <button
                onClick={() => setInputText('')}
                className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-xs transition-all"
                title="Clear question"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3">
            <div className="text-[11px] text-slate-400 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800 text-indigo-300 font-mono text-[10px] border border-slate-700">
                Enter ↵
              </span>
              <span>Press <strong className="text-slate-300">Enter</strong> to analyze (Shift+Enter for new line), or click the button &rarr;</span>
            </div>

            <button
              onClick={() => onAnalyze(inputText)}
              disabled={isLoading || !inputText.trim()}
              className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg ${
                isLoading || !inputText.trim()
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 animate-pulse-glow'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Matching Concept...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-indigo-200" />
                  <span>Analyze & Match Concept</span>
                </>
              )}
            </button>
          </div>

          {/* 1-Click Hackathon Presets Section */}
          <div className="mt-5 pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-300">Hackathon Demo Presets</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  1-Click Test
                </span>
              </div>
              <span className="text-[11px] text-slate-500">Click any preset to test instantly</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {visiblePresets.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className="text-left p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-850 border border-slate-800 hover:border-indigo-500/40 transition-all group"
                >
                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-300 group-hover:text-indigo-300 mb-1">
                    <span className="truncate">{preset.label}</span>
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-1" />
                  </div>
                  <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                    {preset.prompt}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BATCH EXAM PAPER PARSER */}
      {activeTab === 'batch' && (
        <form onSubmit={handleBatchSubmit} className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-300">
              Paste an entire practice exam, quiz, or assignment containing multiple numbered questions.
            </p>
            <button
              type="button"
              onClick={() => setBatchText(sampleExamPaper)}
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 underline"
            >
              Load Sample Midterm Exam
            </button>
          </div>

          <textarea
            value={batchText}
            onChange={(e) => setBatchText(e.target.value)}
            placeholder="1. Question one...&#10;2. Question two...&#10;3. Question three..."
            rows={6}
            className="w-full bg-slate-900/90 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 border border-slate-800 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none resize-none font-mono"
          />

          <div className="flex items-center justify-end">
            <button
              type="submit"
              disabled={isLoading || !batchText.trim()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-50"
            >
              <FileText className="w-4 h-4" />
              <span>Analyze Complete Exam Paper ({batchText ? (batchText.match(/^\d+[\.:\)]/gm) || []).length : 0} Questions)</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: SNAPSHOT OCR SIMULATOR */}
      {activeTab === 'ocr' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-300">
            Simulate scanning a textbook photo, whiteboard problem, or handwritten quiz snapshot.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div 
              onClick={() => handleSimulateOCR("Given an unsorted array of n integers, design an algorithm to find the length of the longest increasing subsequence in O(N log N) time using binary search on tails.")}
              className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all hover:scale-[1.02] text-left"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
                <Camera className="w-3.5 h-3.5" />
                <span>Textbook Snapshot #1</span>
              </div>
              <p className="text-[11px] text-slate-300 line-clamp-3">
                "Given an unsorted array of n integers, design an algorithm to find the length of the longest increasing subsequence in O(N log N)..."
              </p>
              <span className="inline-block mt-2 text-[10px] text-emerald-300 font-medium">
                Tap to extract & solve &rarr;
              </span>
            </div>

            <div 
              onClick={() => handleSimulateOCR("A block of mass 2kg slides down a 30-degree incline with friction coefficient mu = 0.2. Draw free body diagram and compute net acceleration.")}
              className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all hover:scale-[1.02] text-left"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
                <Camera className="w-3.5 h-3.5" />
                <span>Whiteboard Snapshot #2</span>
              </div>
              <p className="text-[11px] text-slate-300 line-clamp-3">
                "A block of mass 2kg slides down a 30-degree incline with friction coefficient mu = 0.2. Draw free body diagram..."
              </p>
              <span className="inline-block mt-2 text-[10px] text-emerald-300 font-medium">
                Tap to extract & solve &rarr;
              </span>
            </div>

            <div 
              onClick={() => handleSimulateOCR("Find the eigenvalues and corresponding eigenvectors of a 2x2 symmetric matrix A = [[3, 1], [1, 3]]. Verify orthogonality.")}
              className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all hover:scale-[1.02] text-left"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
                <Camera className="w-3.5 h-3.5" />
                <span>Handwritten Quiz #3</span>
              </div>
              <p className="text-[11px] text-slate-300 line-clamp-3">
                "Find the eigenvalues and corresponding eigenvectors of a 2x2 symmetric matrix A = [[3, 1], [1, 3]]. Verify orthogonality."
              </p>
              <span className="inline-block mt-2 text-[10px] text-emerald-300 font-medium">
                Tap to extract & solve &rarr;
              </span>
            </div>
          </div>

          {ocrLoading && (
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
              <div className="w-4 h-4 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
              <span>Simulating optical character recognition (OCR) & parsing mathematical symbols...</span>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
