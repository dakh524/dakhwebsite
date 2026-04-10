import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Tools() {
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
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTools();
  }, []);

  const getTools = async () => {
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .eq('is_active', true)
        .order('id', { ascending: true });

      if (error) throw error;
      setTools(data || []);
    } catch (err) {
      console.error('Error fetching tools:', err);
      setTools([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUseTool = (link) => {
    if (link) {
      window.open(link, '_blank');
    } else {
      alert("This tool is currently in early access. Contact admin for activation.");
    }
  };

  return (
    <>
      <main className="pt-32 pb-20 px-8 max-w-7xl mx-auto">
        <header className="mb-20 space-y-4">
          <div className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[0.7rem] font-bold uppercase tracking-widest">
            Ethereal Laboratory
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
            Proprietary <span className="text-primary">Ecosystem</span>
          </h1>
          <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
            Precision-engineered tools designed to bridge the gap between academic theory and industry reality. Frosted data meets kinetic intelligence.
          </p>
        </header>

        {loading ? (
          <div className="py-20 text-center text-primary animate-pulse font-bold">LOADING PROPRIETARY TOOLS...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <div 
                key={tool.id} 
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="glass-card rounded-xl p-8 transition-all duration-500 flex flex-col group hover:border-primary/30 hover-tilt glow-border"
              >
                <div className="h-48 w-full rounded-lg mb-6 overflow-hidden relative">
                  <img 
                    src={tool.image_url || 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop'} 
                    alt={tool.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                </div>
                <div className="flex-grow">
                  <span className="text-primary text-[0.65rem] font-black uppercase tracking-widest mb-2 block">{tool.category}</span>
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors">{tool.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6 line-clamp-3">
                    {tool.description}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleUseTool(tool.tool_link)}
                    className="w-full py-4 px-4 rounded-xl bg-primary text-[#004050] font-black text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-2 hover:bg-primary-dim transition-all hover:scale-[1.02] active:scale-95 shadow-[0_5px_15px_rgba(0,209,255,0.2)] btn-vibrate"
                  >
                    <span className="material-symbols-outlined text-sm">rocket_launch</span>
                    Use our tool
                  </button>
                </div>
              </div>
            ))}

            {/*  Static Build with Us Card  */}
            <div 
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="glass-card rounded-xl p-8 border-dashed border-white/20 flex flex-col justify-center items-center text-center group min-h-[400px] hover-tilt glow-border"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-primary text-3xl">add_circle</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Build with Us</h3>
              <p className="text-on-surface-variant text-sm px-4">
                Have a tool in mind? Join the Next-Gen Dev program and build your own proprietary software.
              </p>
              <a 
                href="https://forms.gle/PFs1Vyx4FuKerRQW8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-8 w-full py-4 px-6 rounded-xl bg-white text-black font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5 btn-vibrate"
              >
                <span className="material-symbols-outlined text-sm">edit_note</span>
                Apply to Program
              </a>
            </div>
          </div>
        )}

        {/* The Foundry Feature Section (Static as it is a core structural element) */}
        {!loading && (
          <section className="mt-20 lg:col-span-2 glass-card rounded-xl p-10 flex flex-col md:flex-row gap-10 items-center overflow-hidden group">
            <div className="flex-1 z-10">
              <h2 className="text-3xl font-extrabold mb-4 text-white">The Foundry</h2>
              <p className="text-on-surface-variant leading-relaxed mb-8">
                Our internal incubator where students collaborate with industry veterans to build the next generation of DAKH EDU SOLUTIONS tools. This is where academic theory becomes digital reality.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                  <span className="material-symbols-outlined text-primary">deployed_code</span>
                  <span className="text-xs font-semibold">12 Tools Live</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                  <span className="material-symbols-outlined text-secondary">groups</span>
                  <span className="text-xs font-semibold">450+ Contributors</span>
                </div>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute -inset-10 bg-primary/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop" alt="Foundry" className="relative z-10 rounded-xl shadow-2xl transform rotate-3 group-hover:rotate-0 transition-transform duration-500 w-full object-cover h-64 opacity-80" />
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 bg-[#0a0e14]">
        <div className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto text-slate-500">
          <div className="space-y-4">
            <div className="text-lg font-bold text-white">DAKH EDU SOLUTIONS</div>
            <p className="text-xs leading-relaxed max-w-xs">
              Pioneering the future of technical education through immersive laboratory experiences and proprietary toolsets.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><a className="hover:text-[#00D1FF] transition-colors" href="/courses">Courses</a></li>
              <li><a className="hover:text-[#00D1FF] transition-colors" href="/internships">Internships</a></li>
              <li><a className="hover:text-[#00D1FF] transition-colors" href="/services">Services</a></li>
              <li><a className="hover:text-[#00D1FF] transition-colors" href="https://wa.me/918667399640" target="_blank" rel="noopener noreferrer" onClick={(e) => { alert('Contact: dakhedusolution@gmail.com'); }}>Contact Us</a></li>
            </ul>
          </div>
          <div className="flex items-end text-xs">
            © 2024 DAKH EDU SOLUTIONS. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
