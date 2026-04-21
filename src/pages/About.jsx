import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import logo from '../assets/logo.png';
import Footer from '../components/Footer';
import { getSupabaseUrl, handleImageError, FALLBACK_IMAGE } from '../utils/imageUrl';

export default function About() {
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
  const [team, setTeam] = useState([]);
  const [partners, setPartners] = useState([]);
  const [works, setWorks] = useState([]);
  const [siteSettings, setSiteSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        { data: teamData }, 
        { data: partnerData },
        { data: worksData },
        { data: settingsData }
      ] = await Promise.all([
        supabase.from('team').select('*').eq('is_active', true).order('id', { ascending: true }),
        supabase.from('partners').select('*').eq('is_active', true).order('id', { ascending: true }),
        supabase.from('works').select('*').eq('is_active', true).order('id', { ascending: true }),
        supabase.from('site_settings').select('*').single()
      ]);

      setTeam(teamData || []);
      setPartners(partnerData || []);
      setWorks(worksData || []);
      if (settingsData) setSiteSettings(settingsData);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="pt-32 pb-20">
        {/*  Hero Section  */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-label text-xs tracking-[0.2em] uppercase font-bold mb-4 block">Our Story</span>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-tight text-white">
                Redefining the <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Digital Learning</span> Frontier.
              </h1>
              <p className="text-on-surface-variant leading-relaxed max-w-xl mb-10 text-lg">
                DAKH EDU SOLUTIONS is more than a platform. We are a dimensional laboratory where technology meets pedagogy, crafting high-performance educational ecosystems for the next generation of global talent.
              </p>
              <div className="flex gap-4">
                <div className="flex flex-col text-center">
                  <span className="text-4xl font-black text-white">15k+</span>
                  <span className="text-[10px] text-primary font-black tracking-widest uppercase">Learners</span>
                </div>
                <div className="w-px h-12 bg-white/10 mx-6"></div>
                <div className="flex flex-col text-center">
                  <span className="text-4xl font-black text-white">98%</span>
                  <span className="text-[10px] text-primary font-black tracking-widest uppercase">Success Rate</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
              <div className="glass-card p-4 rounded-3xl rotate-3 hover:rotate-0 transition-all duration-700 shadow-2xl border border-white/5">
                <img 
                  alt="Team" 
                  className="rounded-2xl w-full h-[450px] object-cover opacity-80" 
                  src={getKeywordImage('startup,team,collaboration')} 
                  data-keyword="startup,team" 
                  onError={handleImageError} 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="max-w-7xl mx-auto px-8 mb-32 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 glass-card p-12 rounded-3xl border border-white/5">
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-primary text-3xl">rocket_launch</span>
              </div>
              <h3 className="text-4xl font-black mb-6 tracking-tight">Our Mission</h3>
              <p className="text-on-surface-variant text-xl leading-relaxed max-w-2xl">
                To bridge the gap between academic theory and industry reality by providing hyper-personalized learning paths and immersive internship experiences.
              </p>
            </div>
            <div className="glass-card p-12 rounded-3xl bg-gradient-to-br from-white/5 to-secondary/10 border border-white/5">
              <div className="w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-secondary text-3xl">visibility</span>
              </div>
              <h3 className="text-3xl font-black mb-6 tracking-tight">Our Vision</h3>
              <p className="text-on-surface-variant leading-relaxed">
                Becoming the global standard for ethereal learning environments.
              </p>
            </div>
          </div>
        </section>

        {/* Meet Our Team Slider */}
        <section className="mb-32 overflow-hidden py-10">
          <div className="max-w-7xl mx-auto px-8 mb-16 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-white">Meet Our Team</h2>
            <p className="text-on-surface-variant text-lg">The people behind DAKH EDU SOLUTIONS</p>
          </div>

          <div className="relative">
            {loading ? (
              <div className="py-20 text-center text-primary animate-pulse font-black uppercase tracking-widest text-xs">Accessing Neural Registry...</div>
            ) : team.length > 0 ? (
              <div className="flex animate-scroll hover:pause gap-8 px-8 pb-10">
                {[...team, ...team].map((member, index) => (
                  <div key={`${member.id}-${index}`} className="flex-shrink-0 w-80 glass-card p-0 rounded-[2rem] border border-white/5 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(184,132,255,0.1)] group">
                    <div className="h-72 relative">
                      <img 
                        src={getSupabaseUrl(member.image_url) || getKeywordImage('person,headshot')} 
                        alt={member.name} 
                        className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                        data-keyword="person,headshot"
                        onError={handleImageError}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e14] via-transparent to-transparent"></div>
                      <div className="absolute bottom-6 left-8">
                        <h4 className="text-2xl font-black text-white">{member.name}</h4>
                        <p className="text-secondary font-black text-[10px] uppercase tracking-widest mt-2">{member.role}</p>
                      </div>
                    </div>
                    <div className="p-8">
                      <p className="text-slate-400 text-sm italic leading-relaxed">"{member.quote}"</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        {/* Our Partners Slider */}
        <section className="mb-32 py-20 border-y border-white/5 bg-white/2">
          <div className="max-w-7xl mx-auto px-6 md:px-8 mb-16">
            <h2 className="text-3xl font-black text-white tracking-tighter text-center mb-2">Our Partners</h2>
            <div className="w-12 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="relative overflow-hidden">
            {!loading && partners.length > 0 ? (
              <div className="flex animate-scroll-fast hover:pause gap-20 items-center">
                {[...partners, ...partners, ...partners].map((partner, index) => (
                  <div key={`${partner.id}-${index}`} className="flex-shrink-0 group">
                    <img 
                      src={getSupabaseUrl(partner.logo_url) || getKeywordImage('company,logo,monochrome')} 
                      alt={partner.name} 
                      title={partner.name}
                      className="h-10 md:h-12 w-auto object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer" 
                      data-keyword="company,logo"
                      onError={handleImageError}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-slate-600 text-[10px] uppercase tracking-[0.3em] font-black">Syncing Industry Nodes...</div>
            )}
          </div>
        </section>

        {/* Our Works Section */}
        <section className="max-w-7xl mx-auto px-8 mb-40">
          <div className="mb-20 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-white">Our Works</h2>
            <p className="text-on-surface-variant text-lg">Projects and initiatives we have built</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading ? (
              <div className="col-span-full py-20 text-center text-primary animate-pulse font-black uppercase tracking-widest text-xs">Reconstructing Portfolio Grid...</div>
            ) : works.length > 0 ? (
              works.map((work) => (
                <article 
                  key={work.id} 
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className="group glass-card p-0 rounded-[2.5rem] border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_40px_80px_rgba(0,209,255,0.15)] hover:border-primary/20 hover-tilt glow-border"
                >
                  <div className="h-64 relative overflow-hidden">
                    <img 
                      src={getSupabaseUrl(work.image_url) || getKeywordImage('technology,software,app')} 
                      alt={work.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                      data-keyword="technology,software"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e14]/60 to-transparent"></div>
                  </div>
                  <div className="p-10">
                    <h3 className="text-2xl font-black text-white mb-4 group-hover:text-primary transition-colors">{work.title}</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-6 line-clamp-3">
                      {work.description}
                    </p>
                    <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
                      Project Verified <span className="material-symbols-outlined text-xs">verified</span>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-slate-600 border border-dashed border-white/5 rounded-3xl">
                The portfolio archive is currently empty.
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section className="max-w-5xl mx-auto px-8 mb-20 text-white">
          <div className="bg-surface-container-highest/40 rounded-[3rem] p-16 border border-white/5 text-center shadow-2xl overflow-hidden relative">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-[100px]"></div>
            <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter leading-tight text-white">Ready to start your <br /><span className="text-primary">evolution</span>?</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto mb-10 text-lg">Connect with us instantly on WhatsApp and start your journey.</p>
            <a 
              className="inline-flex items-center gap-4 bg-[#25D366] hover:bg-[#128C7E] px-12 py-6 rounded-full text-xl font-black transition-all hover:scale-105 btn-vibrate" 
              href={siteSettings?.whatsapp_link || 'https://chat.whatsapp.com/LkKyo7np9oVJXo8LhtrzQA'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-2xl">chat</span> Message us
            </a>
            <div className="mt-8 flex items-center justify-center gap-2 text-on-surface-variant text-sm font-bold">
              <span className="material-symbols-outlined text-primary">location_on</span>
              {siteSettings?.address || 'Chennai, Tamil Nadu, India'}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
