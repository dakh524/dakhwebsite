import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Footer from '../components/Footer';

import { getSupabaseUrl, handleImageError, FALLBACK_IMAGE } from '../utils/imageUrl';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      // Primary attempt: with is_active filter
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('is_active', true)
        .order('id', { ascending: false });

      if (error) {
        console.warn('Primary fetch failed, checking column existence...', error);
        // Fallback: without is_active filter (in case column doesn't exist yet)
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('courses')
          .select('*')
          .order('id', { ascending: false });
        
        if (fallbackData) {
          setCourses(fallbackData);
        } else {
          console.error('Final fetch error:', fallbackError);
          alert("Database Error: Please ensure you have run the SQL script to create the 'courses' table with all required columns.");
        }
      } else {
        setCourses(data || []);
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
      <main className="pt-32 pb-24 px-6 md:px-8 max-w-7xl mx-auto">
        <header className="mb-16 text-center md:text-left">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-[0.65rem] font-bold tracking-widest text-primary uppercase">Elite Learning Programs</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-none">
            Master the <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Digital Frontier</span>
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
            Industry-aligned certifications designed for high-impact careers in technology, data science, and modern management. 
            Learn from masters of the craft.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full py-20 text-center text-primary animate-pulse font-bold tracking-wider">LOADING SECURE DATA...</div>
          ) : courses.length > 0 ? (
            courses.map((course) => (
              <article 
                key={course.id} 
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="group flex flex-col glass-card p-0 rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(105,218,255,0.15)] overflow-hidden border border-white/5 hover-tilt glow-border"
              >
                <div className="relative h-56 overflow-hidden">
                  {/* Robust image handling: checks image_url, image, or fallback */}
                  <img 
                    src={getSupabaseUrl(course.image_url || course.image) || getKeywordImage(course.title || 'education,coding')} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    data-keyword={course.title || 'education,coding'}
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md text-primary text-[10px] font-black uppercase tracking-widest">
                      {course.category || "Premium Module"}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">{course.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-8 line-clamp-3">
                    {course.description}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Enrollment Open</span>
                    </div>
                    <button 
                      onClick={() => handleApply(course.gform_link || course.apply_link)}
                      className="px-8 py-3 rounded-xl bg-primary text-[#004050] font-black text-xs uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(105,218,255,0.4)] hover:scale-105 active:scale-95 btn-vibrate btn-glow"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-on-surface-variant border border-white/5 border-dashed rounded-2xl bg-surface-container-low/20">
              <span className="material-symbols-outlined text-4xl mb-4 block opacity-20">inventory_2</span>
              No courses currently available. Admissions are closed for this semester.
            </div>
          )}

          <article className="flex flex-col items-center justify-center glass-card p-8 rounded-2xl border-dashed border-primary/20 bg-primary/5 text-center group min-h-[400px]">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
              <span className="material-symbols-outlined text-primary text-3xl">upcoming</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Request Custom Course</h3>
            <p className="text-on-surface-variant text-sm mb-6 max-w-[200px]">Need a specialized training program for your team or enterprise?</p>
            <button className="text-primary font-bold text-sm hover:underline tracking-tight">Contact Advisory Team</button>
          </article>
        </section>

        <section className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 glass-card p-10 rounded-2xl relative overflow-hidden flex flex-col justify-end min-h-[300px]">
            <div className="absolute inset-0 z-0 opacity-20">
              <img 
                className="w-full h-full object-cover grayscale brightness-50" 
                src={getKeywordImage('university,campus,architecture')} 
                data-keyword="university,architecture"
                onError={handleImageError}
                alt="Architecture" 
              />
            </div>
            <div className="relative z-10">
              <h4 className="text-3xl font-bold mb-4 tracking-tight">The Academic Edge</h4>
              <p className="text-on-surface-variant max-w-md">Our teaching methodology combines theoretical rigor with the rapid execution of a Silicon Valley startup.</p>
            </div>
          </div>
          <div className="glass-card p-10 rounded-2xl bg-gradient-to-br from-secondary/10 to-transparent flex flex-col items-center justify-center text-center border border-white/5">
            <div className="text-5xl font-black text-secondary mb-4">98%</div>
            <div className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Placement Rate</div>
            <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">Our graduates are currently working at world-leading tech giants and unicorns.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
