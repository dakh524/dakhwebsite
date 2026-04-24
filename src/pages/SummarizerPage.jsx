import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout';
import { summarizeText } from '../api/ai';
import { Copy, Check, Sparkles, AlertCircle } from 'lucide-react';

export default function SummarizerPage() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) {
      setError('Please provide some text to summarize.');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSummary('');
    setCopied(false);

    try {
      const result = await summarizeText(text);
      setSummary(result);
    } catch (err) {
      setError(err.message || 'An error occurred while summarizing.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout title="AI Text Summarizer">
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mx-auto px-4">
          {/* Input Side */}
          <div className="glass-panel p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] flex flex-col h-auto lg:h-[600px] min-h-[350px] border border-white/5 bg-white/[0.02] backdrop-blur-xl shadow-2xl transition-all hover:border-primary/20">
             <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                   <h3 className="font-black tracking-[0.2em] uppercase text-xs text-slate-400 mb-1">Source Analysis</h3>
                   <div className="h-1 w-12 bg-primary rounded-full"></div>
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{text.length} characters</span>
             </div>
             
             <textarea 
                value={text}
                onChange={(e) => {
                   setText(e.target.value);
                   if (error) setError(null);
                }}
                placeholder="Paste long articles, research papers, or any text here for deep analysis..."
                className="flex-1 bg-black/40 border border-white/5 focus:border-primary/50 focus:bg-black/60 rounded-2xl p-4 sm:p-8 text-white placeholder-slate-600 outline-none resize-none mb-6 text-sm sm:text-[15px] leading-relaxed w-full transition-all custom-scrollbar min-h-[200px]"
             ></textarea>
             
             <button 
                onClick={handleSummarize}
                disabled={loading || !text.trim()}
                className="group relative w-full overflow-hidden bg-primary text-black py-5 rounded-2xl font-black uppercase tracking-widest text-xs disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:shadow-[0_0_30px_-5px_rgba(0,209,255,0.5)] active:scale-[0.98]"
             >
                <div className="relative z-10 flex justify-center items-center gap-3">
                   {loading ? (
                      <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                   ) : <Sparkles size={16} />}
                   {loading ? 'Synthesizing knowledge...' : 'Generate AI Summary'}
                </div>
             </button>
          </div>

          {/* Output Side */}
          <div className="glass-panel p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] flex flex-col h-auto lg:h-[600px] min-h-[350px] border border-white/5 bg-white/[0.02] backdrop-blur-xl shadow-2xl relative">
             <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                   <h3 className="font-black tracking-[0.2em] uppercase text-xs text-secondary mb-1">AI Intelligence</h3>
                   <div className="h-1 w-12 bg-secondary rounded-full"></div>
                </div>
                {summary && !loading && (
                   <button 
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-4 py-2 bg-secondary/10 hover:bg-secondary/20 text-secondary rounded-full transition-all active:scale-95 group"
                   >
                      {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="group-hover:scale-110 transition-transform" />}
                      <span className="text-[10px] font-black uppercase tracking-widest">{copied ? 'Copied' : 'Copy'}</span>
                   </button>
                )}
             </div>

             <div className={`flex-1 rounded-2xl p-4 sm:p-8 overflow-y-auto transition-all ${summary ? 'bg-black/40 border border-white/5' : 'bg-transparent border border-dashed border-white/10 flex items-center justify-center min-h-[150px]'}`}>
                {loading ? (
                   <div className="flex flex-col items-center justify-center h-full text-slate-500">
                      <div className="relative w-16 h-16 mb-6">
                         <div className="absolute inset-0 border-4 border-secondary/10 rounded-full"></div>
                         <div className="absolute inset-0 border-4 border-transparent border-t-secondary rounded-full animate-spin"></div>
                         <div className="absolute inset-4 border-4 border-transparent border-b-primary rounded-full animate-spin [animation-duration:1.5s]"></div>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.3em] font-black animate-pulse text-secondary">Decrypting data streams...</span>
                   </div>
                ) : error ? (
                   <div className="flex flex-col items-center justify-center text-center p-6 bg-red-500/5 rounded-2xl border border-red-500/20 text-red-400 w-full animate-in fade-in zoom-in duration-300">
                      <AlertCircle size={32} className="mb-4 opacity-50" />
                      <p className="text-sm font-bold leading-relaxed">{error}</p>
                   </div>
                ) : summary ? (
                   <div className="text-slate-200 text-base leading-[1.8] whitespace-pre-wrap font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
                      {summary}
                   </div>
                ) : (
                   <div className="flex flex-col items-center justify-center opacity-20 text-center">
                      <Sparkles size={48} className="mb-4 text-slate-400" />
                      <span className="text-[10px] uppercase tracking-[0.4em] font-black text-slate-400">System Ready for Processing</span>
                   </div>
                )}
             </div>
             
             {summary && !loading && (
                <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                   <div className="w-1 h-1 rounded-full bg-secondary"></div>
                   Verified AI Generation
                </div>
             )}
          </div>
       </div>
    </ToolLayout>
  );
}
