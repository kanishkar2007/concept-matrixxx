import React, { useState, useRef, useEffect } from 'react';
import { 
  BrainCircuit, 
  X, 
  Send, 
  Sparkles, 
  Lightbulb, 
  HelpCircle, 
  ShieldAlert, 
  CheckCircle,
  Bot,
  User
} from 'lucide-react';

export default function SocraticTutor({ isOpen, onClose, concept, questionText }) {
  if (!isOpen || !concept) return null;

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `Hello! I am your Socratic Concept Co-pilot for **${concept.title}**. Rather than just giving you the final homework answer, my role is to help you deeply understand the core concept so you can ace similar exam problems.\n\nWhat aspect of this problem would you like to explore first?`
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const newMessages = [...messages, { role: 'user', text: query }];
    setMessages(newMessages);
    setInputMessage('');
    setIsTyping(true);

    // Simulate intelligent Socratic response
    setTimeout(() => {
      let botResponse = '';
      const lower = query.toLowerCase();

      if (lower.includes('analogy') || lower.includes('intuition')) {
        botResponse = `💡 **Intuitive Analogy for ${concept.title}:**\nThink of ${concept.title} like this: ${concept.summary}\n\nAsk yourself: If you were solving this with a pen and paper on a small example (say N=3), what is the first decision you would make?`;
      } else if (lower.includes('greedy') || lower.includes('greedy fail')) {
        botResponse = `🔍 **Greedy vs Optimal Analysis:**\nA greedy choice makes the locally optimal choice at each step. But in **${concept.title}**, local optimal choices often lead to global dead ends because subproblems are interconnected!\n\nCan you think of a small counterexample where taking the biggest immediate number causes you to miss a much larger payoff later?`;
      } else if (lower.includes('edge case') || lower.includes('trap')) {
        botResponse = `⚠️ **Exam Traps to Watch Out For:**\nHere is what trips up 80% of students in ${concept.title}:\n1. ${concept.commonTraps?.[0] || 'Boundary initialization'}\n2. ${concept.commonTraps?.[1] || 'Sign errors in direction vectors'}\n\nHave you checked how your solution behaves when the input size is 0 or 1?`;
      } else if (lower.includes('formula') || lower.includes('math')) {
        botResponse = `📐 **Mathematical Foundation:**\nThe governing equation for this concept is:\n\`\`\`\n${concept.formulas?.[0] || 'State relation'}\n\`\`\`\nNotice that every state depends strictly on prior subproblems. What happens if you reverse the iteration order?`;
      } else if (lower.includes('test me') || lower.includes('quiz')) {
        const flashcard = concept.flashcards?.[0] || { q: 'What is the primary condition?', a: 'See notes' };
        botResponse = `🎯 **Concept Check Question:**\n${flashcard.q}\n\nTake a moment to formulate your answer before I check your logic!`;
      } else {
        botResponse = `Great question! When approaching **${concept.title}**, the key invariant is: *${concept.keyTheorems?.[0] || concept.summary}*.\n\nHow do you think this invariant applies to the specific constraints of your question?`;
      }

      setMessages(prev => [...prev, { role: 'assistant', text: botResponse }]);
      setIsTyping(false);
    }, 700);
  };

  const quickPrompts = [
    { label: "Give intuitive analogy", text: "Can you give me an intuitive real-world analogy for this concept?" },
    { label: "Why does greedy fail?", text: "Why would a greedy choice fail for this type of problem?" },
    { label: "Exam edge cases", text: "What edge cases and traps should I avoid in this problem?" },
    { label: "Test my intuition", text: "Test my conceptual understanding with a quick diagnostic question." }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 rounded-2xl border border-indigo-500/40 shadow-2xl flex flex-col h-[85vh] max-h-[700px] overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">Socratic Concept Co-pilot</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 font-semibold">
                  Guiding Mode
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Focus: <strong className="text-indigo-300">{concept.title}</strong>
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

        {/* Chat Message History */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg, idx) => {
            const isBot = msg.role === 'assistant';
            return (
              <div
                key={idx}
                className={`flex gap-3 ${isBot ? 'items-start' : 'items-start flex-row-reverse'}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                    isBot 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30' 
                      : 'bg-slate-700 text-slate-200'
                  }`}
                >
                  {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    isBot
                      ? 'bg-slate-950/80 border border-slate-800 text-slate-200'
                      : 'bg-indigo-600 text-white font-medium shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-indigo-400 pl-11">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span>Socratic Co-pilot is analyzing your thought process...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-950/50 border-t border-slate-800/80 flex gap-2 overflow-x-auto no-scrollbar">
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(p.text)}
              className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/40 text-[11px] text-slate-300 hover:text-indigo-300 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>{p.label}</span>
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your reasoning or question (e.g. 'Why does space optimization work here?')..."
            className="flex-1 bg-slate-900 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 border border-slate-800 focus:border-indigo-500 outline-none"
          />

          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white transition-all shadow-md shadow-indigo-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
