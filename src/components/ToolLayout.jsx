import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ToolLayout({ title, children }) {
  const navigate = useNavigate();

  return (
    <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto text-white min-h-[calc(100vh-200px)]">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10 border-b border-white/5 pb-6">
        <button 
          onClick={() => navigate('/tools')}
          className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
        >
          <ArrowLeft size={24} className="text-slate-300" />
        </button>
        <div>
          <h1 className="text-3xl font-black tracking-tight">{title}</h1>
          <p className="text-xs text-primary/80 tracking-widest uppercase font-bold mt-1">Dakh Engineering Suite</p>
        </div>
      </div>

      {/* Tool Content */}
      <div className="mb-20 min-h-[40vh]">
        {children}
      </div>

      {/* Contact CTA */}
      <div className="mt-20 border-t border-white/5 pt-12 flex justify-center no-print">
        <a 
          href="https://wa.me/918667399640?text=Hi,%20I%20need%20a%20website/app/chatbot"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-panel p-8 rounded-3xl flex flex-col items-center text-center w-full max-w-md transition-transform hover:-translate-y-2 hover:border-[#25D366]/50 group cursor-pointer no-print"
        >
           <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-6 border border-[#25D366]/20 group-hover:shadow-[0_0_30px_rgba(37,211,102,0.3)] transition-all">
              <span className="material-symbols-outlined text-[#25D366] text-3xl">chat</span>
           </div>
           <h3 className="text-xl font-bold mb-2">Need a website, app, or chatbot?</h3>
           <p className="text-slate-400 text-xs mb-6">Our architects can build it for you. Contact us directly.</p>
           <span className="bg-[#25D366] text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-[0_0_20px_rgba(37,211,102,0.2)]">Contact Us</span>
        </a>
      </div>
    </div>
  );
}
