import React, { useState } from 'react';

const options = [
  {
    id: 'chatbot',
    icon: '🤖',
    title: 'WhatsApp Chatbot',
    resultText: 'Automate your business with a smart chatbot',
    whatsappLink: 'https://wa.me/918667399640?text=Hi%20I%20want%20a%20WhatsApp%20chatbot'
  },
  {
    id: 'website',
    icon: '🌐',
    title: 'Website',
    resultText: 'Build a fast and modern website',
    whatsappLink: 'https://wa.me/918667399640?text=Hi%20I%20need%20a%20website'
  },
  {
    id: 'app',
    icon: '📱',
    title: 'Mobile App',
    resultText: 'Turn your idea into a mobile app',
    whatsappLink: 'https://wa.me/918667399640?text=Hi%20I%20want%20to%20build%20a%20mobile%20app'
  }
];

export default function InteractiveBanner() {
  const [selectedOption, setSelectedOption] = useState(null);

  const selectedData = options.find(o => o.id === selectedOption);

  return (
    <section className="py-12 md:py-20 relative px-6 z-20">
      <div className="max-w-4xl mx-auto glass-panel bg-surface/80 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.4)] relative overflow-hidden group">
        {/* Neon decorative blurs */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none transition-all duration-700 group-hover:bg-primary/30"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-secondary/20 rounded-full blur-[80px] pointer-events-none transition-all duration-700 group-hover:bg-secondary/30"></div>

        <div className="relative z-10 text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-black mb-1 tracking-tightest text-white">
            What do you want to build?
          </h2>
          <p className="text-slate-400 text-sm font-bold tracking-widest uppercase mb-10">Tap to Unlock Your Project</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full mb-4">
            {options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              const isOtherSelected = selectedOption && !isSelected;

              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedOption(opt.id)}
                  className={`relative p-8 rounded-3xl flex flex-col items-center justify-center gap-4 transition-all duration-500 border backdrop-blur-md active:scale-95 btn-vibrate
                    ${isSelected 
                      ? 'bg-primary/10 border-primary scale-[1.02] shadow-[0_0_40px_rgba(105,218,255,0.2)] z-10' 
                      : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'}
                    ${isOtherSelected ? 'opacity-30 scale-95 blur-[1px]' : 'opacity-100 blur-0'}
                  `}
                >
                  {isSelected && (
                    <div className="absolute inset-0 rounded-3xl bg-primary/5 animate-pulse pointer-events-none"></div>
                  )}
                  <span className="text-6xl drop-shadow-2xl transition-transform duration-300 group-hover:scale-110">{opt.icon}</span>
                  <span className={`font-black text-sm tracking-widest uppercase transition-colors duration-300 ${isSelected ? 'text-primary' : 'text-slate-300'}`}>
                    {opt.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Result Area */}
          <div className={`transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden flex flex-col items-center w-full ${selectedOption ? 'max-h-[500px] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0 pointer-events-none'}`}>
            {selectedOption && (
              <div className="flex flex-col items-center animate-in slide-in-from-bottom-4 fade-in duration-700 w-full">
                <div className="h-px w-full max-w-sm bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>
                
                <h3 className="text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-8 max-w-lg leading-tight">
                  {selectedData?.resultText}
                </h3>
                
                <a
                  href={selectedData?.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-[1.02] hover:bg-[#20bd5a] active:scale-95 shadow-[0_0_30px_rgba(37,211,102,0.3)] flex items-center justify-center gap-3 animate-pulse relative overflow-hidden group/btn"
                >
                  <div className="absolute inset-0 bg-white/20 -translate-x-[150%] skew-x-[-45deg] group-hover/btn:translate-x-[150%] transition-transform duration-700 ease-out"></div>
                  <span className="material-symbols-outlined text-lg relative z-10">chat</span>
                  <span className="relative z-10">Get Started on WhatsApp</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
