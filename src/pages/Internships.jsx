import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Footer from '../components/Footer';
import { getSupabaseUrl, handleImageError, FALLBACK_IMAGE } from '../utils/imageUrl';

export default function Internships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInternships();
  }, []);

  const getInternships = async () => {
    try {
      // Primary attempt: with is_active filter
      const { data, error } = await supabase
        .from('internships')
        .select('*')
        .eq('is_active', true)
        .order('id', { ascending: false });

      if (error) {
        console.warn('Primary fetch failed, checking column existence...', error);
        // Fallback: without is_active filter
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('internships')
          .select('*')
          .order('id', { ascending: false });
        
        if (fallbackData) {
          setInternships(fallbackData);
        } else {
          console.error('Final fetch error:', fallbackError);
          alert("Database Error: Please ensure you have run the SQL script to create the 'internships' table.");
        }
      } else {
        setInternships(data || []);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (link) => {
    window.open(link || 'https://forms.gle/PFs1Vyx4FuKerRQW8', '_blank');
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
    <>
      <main className="pt-32 pb-20 px-6 md:px-8 max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <div className="inline-block px-4 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
            Next-Gen Talent Acquisition
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
            Architect Your Future.
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Join the vanguard of technological evolution. Our internship programs offer immersive experiences in cutting-edge domains with high-stakes mentorship.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full py-20 text-center text-primary animate-pulse font-bold tracking-wider">LOADING SECURE DATA...</div>
          ) : internships.length > 0 ? (
            internships.map((internship) => (
              <article 
                key={internship.id} 
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="group relative glass-card p-0 rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(105,218,255,0.15)] overflow-hidden flex flex-col border border-white/5 hover-tilt glow-border"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={getSupabaseUrl(internship.image_url || internship.image) || FALLBACK_IMAGE} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={internship.title} 
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
                  <div className="absolute bottom-4 left-6">
                    <span className="text-primary font-black text-[10px] tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-full backdrop-blur-md">
                      {internship.category || "Internship"}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">{internship.title}</h3>
                  <p className="text-on-surface-variant text-sm mb-8 leading-relaxed line-clamp-3">
                    {internship.description}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      <span className="font-medium tracking-tight">12 Weeks • Remote Friendly</span>
                    </div>
                    <button 
                      onClick={() => handleApply(internship.gform_link || internship.apply_link)}
                      className="w-full bg-surface-container-highest text-white border border-white/10 px-6 py-4 rounded-xl font-bold text-sm transition-all hover:bg-primary hover:text-[#004050] hover:border-primary flex items-center justify-center gap-2 group/btn btn-vibrate btn-glow"
                    >
                      Apply Now
                      <span className="material-symbols-outlined text-sm transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-on-surface-variant border border-white/5 border-dashed rounded-3xl bg-surface-container-low/20">
              <span className="material-symbols-outlined text-4xl mb-4 block opacity-20">work_off</span>
              No internship opportunities currently open. Join our waitlist for the next cohort!
            </div>
          )}
        </div>

        <section className="mt-32">
          <h2 className="text-3xl font-bold mb-12 text-center font-headline tracking-tight uppercase tracking-widest text-white/40">Why Intern at DAKH EDU SOLUTIONS?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2 bg-surface-container-low p-10 rounded-2xl border border-white/5 flex flex-col justify-between min-h-[300px]">
              <h4 className="text-2xl font-bold text-white mb-4">Hyper-Growth Environment</h4>
              <p className="text-on-surface-variant leading-relaxed">We move fast and break things—but we fix them with better architecture. You'll own features from day one, not just fetch coffee.</p>
              <div className="mt-8 flex -space-x-4">
                <div className="w-10 h-10 rounded-full border-2 border-background bg-slate-800"></div>
                <div className="w-10 h-10 rounded-full border-2 border-background bg-slate-700"></div>
                <div className="w-10 h-10 rounded-full border-2 border-background bg-slate-600"></div>
                <div className="w-10 h-10 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">+25</div>
              </div>
            </div>
            <div className="bg-surface-container-low p-8 rounded-2xl border border-white/5 relative overflow-hidden group">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
              <span className="material-symbols-outlined text-4xl text-primary mb-4">verified</span>
              <h4 className="text-xl font-bold text-white mb-2">Mentorship</h4>
              <p className="text-sm text-on-surface-variant">Direct access to industry leads who've built products for millions.</p>
            </div>
            <div className="bg-surface-container-low p-8 rounded-2xl border border-white/5 relative overflow-hidden group">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all"></div>
              <span className="material-symbols-outlined text-4xl text-secondary mb-4">rocket_launch</span>
              <h4 className="text-xl font-bold text-white mb-2">PPO Potential</h4>
              <p className="text-sm text-on-surface-variant">Over 70% of our high-performing interns convert to full-time roles.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
