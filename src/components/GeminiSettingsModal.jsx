import React, { useState } from 'react';
import { 
  X, 
  Key, 
  Sparkles, 
  Check, 
  AlertCircle, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';

export default function GeminiSettingsModal({ 
  isOpen, 
  onClose, 
  apiKey, 
  onSaveKey 
}) {
  if (!isOpen) return null;

  const [inputKey, setInputKey] = useState(apiKey || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    onSaveKey(inputKey.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  const handleClear = () => {
    setInputKey('');
    onSaveKey('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 rounded-2xl border border-indigo-500/30 shadow-2xl p-6 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">AI Engine Configuration</h3>
              <p className="text-xs text-slate-400">Dual-Mode Matching System</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} className="mt-4 space-y-4">
          
          <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-200 leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold text-indigo-300 mb-1">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Offline-First Guaranteed</span>
            </div>
            ConceptPulse works <strong>100% offline out-of-the-box</strong> with the built-in knowledge base. Adding a Gemini API key is completely optional and enables real-time generative concept analysis for questions outside our indexed syllabus.
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Google Gemini API Key (Optional)
            </label>
            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-slate-950 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-100 placeholder-slate-600 border border-slate-800 focus:border-indigo-500 outline-none"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Keys are stored securely in your browser local storage only.
            </p>
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs">
              <Check className="w-4 h-4" />
              <span>API Key saved successfully! Live mode activated.</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            {apiKey ? (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-all"
              >
                Clear Key (Use Built-in Engine)
              </button>
            ) : <span />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20 transition-all"
              >
                Save Settings
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
