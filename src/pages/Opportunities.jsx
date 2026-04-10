import React from 'react';

export default function Opportunities() {
  const handleApply = () => {
    window.open('https://forms.gle/PFs1Vyx4FuKerRQW8', '_blank');
  };

  const handleWhatsApp = () => {
    window.open('https://chat.whatsapp.com/LkKyo7np9oVJXo8LhtrzQA', '_blank');
  };

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (centerY - y) / 15;
    const rotateY = (x - centerX) / 15;
    
    card.style.setProperty('--rotate-x', `${rotateX}deg`);
    card.style.setProperty('--rotate-y', `${rotateY}deg`);
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty('--rotate-x', `0deg`);
    card.style.setProperty('--rotate-y', `0deg`);
  };

  return (
    <main className="pt-32 pb-24 px-6 md:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Hero Section */}
      <header className="mb-20 text-center max-w-4xl mx-auto">
        <div className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-8">
          Growth Ecosystem
        </div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tightest mb-8 leading-[0.9] glow">
          Join & <span className="text-gradient">Grow</span> With Us
        </h1>
        <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
          DAKH EDU SOLUTIONS is a high-performance growth incubator for students, creators, developers, and marketers. Choose your path.
        </p>
      </header>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
        {/* 1: Campus Ambassador */}
        <div 
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          className="glass-panel p-10 rounded-[2rem] flex flex-col group hover-tilt glow-border"
        >
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 border border-primary/20">
            <span className="material-symbols-outlined text-primary text-3xl">campaign</span>
          </div>
          <h3 className="text-2xl font-black mb-4 tracking-tight">Campus Ambassador</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-10 flex-grow">
            Lead your college community, organize technical summits, and master executive leadership.
          </p>
          <button 
            onClick={handleApply}
            className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all hover:bg-primary hover:text-[#004050] hover:border-primary btn-vibrate"
          >
            Apply Protocol
          </button>
        </div>

        {/* 2: Developer */}
        <div 
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          className="glass-panel p-10 rounded-[2rem] flex flex-col group hover-tilt glow-border"
        >
          <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-8 border border-secondary/20">
            <span className="material-symbols-outlined text-secondary text-3xl">terminal</span>
          </div>
          <h3 className="text-2xl font-black mb-4 tracking-tight">Core Developer</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-10 flex-grow">
            Architect real-world applications and expand your technical neural network with live projects.
          </p>
          <button 
            onClick={handleApply}
            className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all hover:bg-secondary hover:text-white hover:border-secondary btn-vibrate"
          >
            Initiate Build
          </button>
        </div>

        {/* 3: Marketing Partner */}
        <div 
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          className="glass-panel p-10 rounded-[2rem] flex flex-col group border-l-4 border-l-green-500 hover-tilt glow-border"
        >
          <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-8 border border-green-500/20">
            <span className="material-symbols-outlined text-green-500 text-3xl">share</span>
          </div>
          <h3 className="text-2xl font-black mb-4 tracking-tight">Marketing Node</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-10 flex-grow">
            Activate your network via WhatsApp and scale our mission while earning performance rewards.
          </p>
          <button 
            onClick={handleWhatsApp}
            className="w-full bg-green-500 text-black py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(34,197,94,0.3)] btn-vibrate"
          >
            Join Network
          </button>
        </div>

        {/* 4: Freelancer */}
        <div 
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          className="glass-panel p-10 rounded-[2rem] flex flex-col group hover-tilt glow-border"
        >
          <div className="w-14 h-14 bg-tertiary/10 rounded-2xl flex items-center justify-center mb-8 border border-tertiary/20">
            <span className="material-symbols-outlined text-tertiary text-3xl">work_history</span>
          </div>
          <h3 className="text-2xl font-black mb-4 tracking-tight">Tactical Freelancer</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-10 flex-grow">
            Deploy your expertise remotely on mission-specific tasks and earn dimensional rewards.
          </p>
          <button 
            onClick={handleApply}
            className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all hover:bg-tertiary hover:text-white hover:border-tertiary btn-vibrate"
          >
            Secure Task
          </button>
        </div>
      </div>

      {/* CTA Section */}
      <section className="text-center py-20 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none"></div>
        <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tightest leading-tight">
          Start Your Dimensional <br /> <span className="text-gradient">Journey Today.</span>
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-6 relative z-10">
          <button 
            onClick={handleApply}
            className="px-12 py-6 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-2xl btn-vibrate"
          >
            Get Started
          </button>
          <button 
            onClick={handleWhatsApp}
            className="px-12 py-6 rounded-2xl bg-green-500 text-black font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-2xl btn-vibrate"
          >
            Sync via WhatsApp
          </button>
        </div>
      </section>
    </main>
  );
}
