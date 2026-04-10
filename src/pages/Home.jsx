import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';

export default function Home() {
  const [eventData, setEventData] = useState({ title: '', targetDate: null, link: '' });
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      const { data } = await supabase
        .from('events')
        .select('*')
        .eq('is_active', true)
        .order('id', { ascending: false })
        .limit(1);
      
      if (data && data.length > 0) {
        setEventData({
          title: data[0].title || 'Next Event',
          targetDate: new Date(data[0].target_datetime),
          link: data[0].event_link
        });
      }
    };
    fetchEvent();
  }, []);

  useEffect(() => {
    if (!eventData.targetDate) return;

    const calculateTimeLeft = () => {
      const difference = eventData.targetDate.getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft(); // initialize
    const timer = setInterval(calculateTimeLeft, 1000); // Real-time countdown
    return () => clearInterval(timer);
  }, [eventData.targetDate]);

  return (
    <>

{/*  TopNavBar  */}

{/*  Hero Section  */}
<section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
{/*  3D Particle Background Simulation  */}
<div className="absolute inset-0 z-0">
<div className="absolute inset-0 hero-gradient"></div>
<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]"></div>
</div>
 <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 text-center pt-20 md:pt-10">
<div className="mb-6 md:mb-8 stagger-1">
<span className="px-4 md:px-5 py-1.5 md:py-2 rounded-full bg-white/5 border border-white/10 text-primary text-[8px] md:text-[10px] font-black tracking-[0.3em] uppercase">The Architecture of Learning v2.0</span>
</div>
<h1 className="text-[3.5rem] sm:text-[5rem] md:text-display mb-8 md:mb-10 stagger-2 leading-[0.9] font-black tracking-tightest">
                Learn.<br /> 
                <span className="text-gradient">Build.</span><br />
                Launch.
            </h1>
<p className="text-base md:text-xl lg:text-2xl text-on-surface-variant max-w-3xl mx-auto mb-10 md:mb-14 font-medium leading-[1.5] tracking-tight stagger-3 opacity-80 px-4">
                Empowering the next generation of digital architects through precision-engineered education and real-world application.
            </p>

{/*  Master Event Countdown Section  */}
{eventData.targetDate && (
<div className="mb-12 md:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
  <div className="inline-block glass-panel p-0.5 md:p-1 rounded-[2rem] md:rounded-3xl bg-white/5 border border-white/10 shadow-2xl overflow-hidden group max-w-full">
    <div className="bg-surface-container-low/40 rounded-[1.8rem] md:rounded-[22px] px-6 md:px-12 py-8 md:py-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden">
      {/* Background flare */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all pointer-events-none"></div>
      
      <div className="text-center md:text-left relative z-10">
        <div className="flex items-center justify-center md:justify-start gap-2 text-[0.6rem] md:text-[0.7rem] text-primary font-black uppercase tracking-[0.2em] mb-4 md:mb-3">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          MASTER EVENT: {eventData.title}
        </div>
        <div className="flex gap-4 sm:gap-8 items-center justify-center md:justify-start">
          <div className="text-center">
            <span className="text-3xl md:text-5xl font-black block tracking-tighter">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="text-[0.5rem] md:text-[0.6rem] text-on-surface-variant font-bold uppercase tracking-widest mt-1 block">Days</span>
          </div>
          <div className="w-px h-8 md:h-12 bg-outline-variant/30"></div>
          <div className="text-center">
            <span className="text-3xl md:text-5xl font-black block tracking-tighter">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="text-[0.5rem] md:text-[0.6rem] text-on-surface-variant font-bold uppercase tracking-widest mt-1 block">Hours</span>
          </div>
          <div className="w-px h-8 md:h-12 bg-outline-variant/30"></div>
          <div className="text-center">
            <span className="text-3xl md:text-5xl font-black block tracking-tighter">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="text-[0.5rem] md:text-[0.6rem] text-on-surface-variant font-bold uppercase tracking-widest mt-1 block">Mins</span>
          </div>
           <div className="w-px h-8 md:h-12 bg-outline-variant/30 md:block hidden"></div>
          <div className="text-center md:block hidden">
            <span className="text-3xl md:text-5xl font-black block tracking-tighter text-primary">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="text-[0.5rem] md:text-[0.6rem] text-on-surface-variant font-bold uppercase tracking-widest mt-1 block">Secs</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 relative z-10 w-full md:min-w-[200px]">
        {eventData.link && (
          <a 
            href={eventData.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-primary text-[#004050] px-8 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest hover:shadow-[0_0_30px_rgba(105,218,255,0.4)] hover:scale-105 active:scale-95 transition-all w-full"
          >
            Join Event
            <span className="material-symbols-outlined text-base md:text-lg">rocket_launch</span>
          </a>
        )}
        <div className="text-[0.55rem] md:text-[0.6rem] text-on-surface-variant/60 text-center font-bold">
          {new Date(eventData.targetDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>
    </div>
  </div>
</div>
)}

<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16 md:mb-20 stagger-4 w-full max-w-xs sm:max-w-none mx-auto">
<button onClick={() => navigate('/internships')} className="w-full sm:w-auto px-10 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl bg-white text-black font-black text-[10px] md:text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
                    Join Internship
                </button>
<button onClick={() => navigate('/courses')} className="w-full sm:w-auto px-10 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[10px] md:text-xs uppercase tracking-widest transition-all hover:bg-white/10 hover:scale-105 active:scale-95 backdrop-blur-xl">
                    Explore Courses
                </button>
</div>
</div>
</section>
{/*  Services Section  */}
<section className="py-24 relative bg-surface-container-low" id="services">
<div className="max-w-7xl mx-auto px-8">
<div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
<div>
<h2 className="text-primary text-sm font-black tracking-widest uppercase mb-4">Precision Services</h2>
<p className="text-4xl md:text-5xl font-black tracking-tighter">Architecting Digital Mastery</p>
</div>
<p className="text-on-surface-variant max-w-sm mb-2">We provide high-impact technical consulting and deployment services for modern startups.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{/*  Bento Card 1  */}
<div className="group relative overflow-hidden rounded-3xl bg-surface-container p-8 transition-all hover:-translate-y-2">
<div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-all"></div>
<span className="material-symbols-outlined text-4xl text-primary mb-6">rocket_launch</span>
<h3 className="text-2xl font-bold mb-4">Rapid Prototyping</h3>
<p className="text-on-surface-variant text-sm leading-relaxed mb-6">Transforming napkin sketches into production-ready MVPs with lightning speed and precision.</p>
<Link className="text-primary text-xs font-bold flex items-center gap-2 group-hover:gap-4 transition-all" to="/services">
                        LEARN MORE <span className="material-symbols-outlined text-sm">arrow_forward</span>
</Link>
</div>
{/*  Bento Card 2  */}
<div className="group relative overflow-hidden rounded-3xl bg-surface-container p-8 transition-all hover:-translate-y-2 border-t border-white/5">
<div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 blur-3xl group-hover:bg-secondary/20 transition-all"></div>
<span className="material-symbols-outlined text-4xl text-secondary mb-6">auto_awesome</span>
<h3 className="text-2xl font-bold mb-4">UI/UX Craftsmanship</h3>
<p className="text-on-surface-variant text-sm leading-relaxed mb-6">Designing ethereal interfaces that bridge the gap between human intuition and complex data.</p>
<Link className="text-secondary text-xs font-bold flex items-center gap-2 group-hover:gap-4 transition-all" to="/services">
                        VIEW DESIGN <span className="material-symbols-outlined text-sm">arrow_forward</span>
</Link>
</div>
{/*  Bento Card 3  */}
<div className="group relative overflow-hidden rounded-3xl bg-surface-container p-8 transition-all hover:-translate-y-2 border-t border-white/5">
<div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/10 blur-3xl group-hover:bg-tertiary/20 transition-all"></div>
<span className="material-symbols-outlined text-4xl text-tertiary mb-6">terminal</span>
<h3 className="text-2xl font-bold mb-4">Full-Stack Scale</h3>
<p className="text-on-surface-variant text-sm leading-relaxed mb-6">Engineering robust backend ecosystems designed to withstand the gravitational pull of global scale.</p>
<Link className="text-tertiary text-xs font-bold flex items-center gap-2 group-hover:gap-4 transition-all" to="/services">
                        SYSTEMS ARCH <span className="material-symbols-outlined text-sm">arrow_forward</span>
</Link>
</div>
</div>
</div>
</section>
{/*  Courses Section  */}
<section className="py-24" id="courses">
<div className="max-w-7xl mx-auto px-8">
<div className="text-center mb-16">
<h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Knowledge Pipelines</h2>
<h2 className="text-on-surface-variant">Intensive curricula designed for the modern engineer.</h2>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
<div onClick={() => navigate('/courses')} className="glass-panel cursor-pointer bg-surface-container-highest/20 rounded-2xl p-6 flex flex-col items-center text-center transition-all hover:bg-surface-container-highest/40">
<div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-primary text-3xl">code_blocks</span>
</div>
<h4 className="font-bold mb-2">React Mastery</h4>
<p className="text-xs text-on-surface-variant mb-6">Deep dive into hook logic and component state architecture.</p>
<span className="mt-auto text-primary text-[0.65rem] font-bold px-3 py-1 bg-primary/10 rounded-full">ENROLL NOW</span>
</div>
<div onClick={() => navigate('/courses')} className="glass-panel cursor-pointer bg-surface-container-highest/20 rounded-2xl p-6 flex flex-col items-center text-center transition-all hover:bg-surface-container-highest/40">
<div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-secondary text-3xl">database</span>
</div>
<h4 className="font-bold mb-2">Backend Flux</h4>
<p className="text-xs text-on-surface-variant mb-6">Serverless deployments and distributed database systems.</p>
<span className="mt-auto text-secondary text-[0.65rem] font-bold px-3 py-1 bg-secondary/10 rounded-full">JOIN COHORT</span>
</div>
<div onClick={() => navigate('/courses')} className="glass-panel cursor-pointer bg-surface-container-highest/20 rounded-2xl p-6 flex flex-col items-center text-center transition-all hover:bg-surface-container-highest/40">
<div className="w-16 h-16 rounded-full bg-tertiary/20 flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-tertiary text-3xl">brush</span>
</div>
<h4 className="font-bold mb-2">Visual Logic</h4>
<p className="text-xs text-on-surface-variant mb-6">Mastering the intersection of typography and interactivity.</p>
<span className="mt-auto text-tertiary text-[0.65rem] font-bold px-3 py-1 bg-tertiary/10 rounded-full">VIEW SYLLABUS</span>
</div>
<div onClick={() => navigate('/courses')} className="glass-panel cursor-pointer bg-surface-container-highest/20 rounded-2xl p-6 flex flex-col items-center text-center transition-all hover:bg-surface-container-highest/40">
<div className="w-16 h-16 rounded-full bg-outline/20 flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-on-surface-variant text-3xl">cloud_queue</span>
</div>
<h4 className="font-bold mb-2">Cloud Native</h4>
<p className="text-xs text-on-surface-variant mb-6">Docker, Kubernetes, and the future of deployment pipelines.</p>
<span className="mt-auto text-on-surface-variant text-[0.65rem] font-bold px-3 py-1 bg-white/5 rounded-full">PRE-REGISTER</span>
</div>
</div>
</div>
</section>
{/*  Internships Section  */}
<section className="py-24 bg-surface-container-lowest overflow-hidden relative" id="internships">
<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50"></div>
<div className="max-w-7xl mx-auto px-8 relative z-10">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
<div className="space-y-8">
<h2 className="text-primary text-sm font-black tracking-widest uppercase">The Immersion Program</h2>
<h3 className="text-5xl font-black tracking-tighter leading-tight">Forge your identity in the heat of real projects.</h3>
<p className="text-on-surface-variant text-lg">Our internship isn't about coffee runs. It's about contributing to codebase that touches thousands. Work directly with senior mentors in our ethereal laboratory.</p>
<ul className="space-y-4">
<li className="flex items-center gap-4 text-sm font-semibold">
<span className="material-symbols-outlined text-primary">check_circle</span> 3-Month Intensive Mentorship
                        </li>
<li className="flex items-center gap-4 text-sm font-semibold">
<span className="material-symbols-outlined text-primary">check_circle</span> Global Networking with Industry Leaders
                        </li>
<li className="flex items-center gap-4 text-sm font-semibold">
<span className="material-symbols-outlined text-primary">check_circle</span> Direct Placement Track for Top Performers
                        </li>
</ul>
<button onClick={() => navigate('/internships')} className="bg-primary text-on-primary px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:shadow-[0_0_30px_rgba(105,218,255,0.4)] transition-all">
                        Apply for Autumn 2024
                    </button>
</div>
<div className="relative group">
<div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary opacity-20 blur-2xl rounded-[40px]"></div>
<img alt="Team collaborating in a modern neon-lit workspace" className="rounded-[40px] border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-700" data-alt="Modern collaborative tech workspace with neon ambient lighting and young professionals working on complex high-tech monitors and equipment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDf0nhiYOjJzm8ZyX7ARu6ZIhMczKlwcdD6-TVmthJm9eBUth2yfidWDRiB9ZvFubL0C4M6R4MvdbZ74ZDA1rcfV97goA-QGwAbBD-umMSva46oBfyabpdBOL6k4WUPm-t49XwQBGw9vfq7CqQVtjCrdtne6ihTTt3DdkECtauscvByZj-ZS4Yru6xbb-oPLG0Ybpw8_jiqZmo_BKn5jVRMkX0OO0P6K4uEZw3ea4lTDxWJ0Qe8ueDc9fE-umQGgA0s0gmhv-pWDypx"/>
</div>
</div>
</div>
</section>
{/*  Tools Preview Section (Bento Style)  */}
<section className="py-24" id="tools">
<div className="max-w-7xl mx-auto px-8">
<div className="flex items-center justify-between mb-16">
<h2 className="text-4xl font-black tracking-tighter">Engineering Suite</h2>
<div className="flex gap-2">
<div className="w-3 h-3 rounded-full bg-primary/40"></div>
<div className="w-3 h-3 rounded-full bg-secondary/40"></div>
<div className="w-3 h-3 rounded-full bg-tertiary/40"></div>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
{/*  Large Featured Tool  */}
<div className="md:col-span-2 md:row-span-2 glass-panel bg-surface-container-high rounded-3xl p-10 flex flex-col justify-between group">
<div>
<div className="flex justify-between items-start mb-8">
<div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-3xl">analytics</span>
</div>
<span className="text-[0.6rem] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase">Made by Us</span>
</div>
<h3 className="text-3xl font-bold mb-4">DAKH Core Engine</h3>
<p className="text-on-surface-variant leading-relaxed">Our proprietary analytical engine that optimizes learning paths using neural-link feedback loops. Real-time skill gap analysis for every student.</p>
</div>
<button onClick={() => navigate('/tools')} className="mt-8 flex items-center gap-3 text-sm font-bold text-primary group-hover:gap-5 transition-all">
                        LAUNCH ENGINE <span className="material-symbols-outlined">north_east</span>
</button>
</div>
{/*  Secondary Tools  */}
<div onClick={() => navigate('/tools')} className="glass-panel cursor-pointer bg-surface-container rounded-3xl p-8 transition-all hover:bg-surface-container-highest">
<span className="material-symbols-outlined text-secondary mb-6">integration_instructions</span>
<h4 className="font-bold mb-2">Code Diff Tool</h4>
<p className="text-xs text-on-surface-variant">Precision code comparisons for complex migrations.</p>
</div>
<div onClick={() => navigate('/tools')} className="glass-panel cursor-pointer bg-surface-container rounded-3xl p-8 transition-all hover:bg-surface-container-highest">
<span className="material-symbols-outlined text-tertiary mb-6">speed</span>
<h4 className="font-bold mb-2">Performance API</h4>
<p className="text-xs text-on-surface-variant">Latency monitoring for edge deployments.</p>
</div>
<div onClick={() => navigate('/useful-tools')} className="md:col-span-2 glass-panel cursor-pointer bg-surface-container rounded-3xl p-8 flex items-center justify-between group transition-all hover:bg-surface-container-highest border-l-4 border-primary">
<div>
<h4 className="font-bold mb-1">DAKH Assets Library</h4>
<p className="text-xs text-on-surface-variant">Access 5000+ UI components and templates.</p>
</div>
<span className="material-symbols-outlined text-primary opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all">arrow_forward</span>
</div>
</div>
</div>
</section>
{/*  About Section  */}
<section className="py-24 bg-surface-container-low border-y border-white/5" id="about">
<div className="max-w-4xl mx-auto px-8 text-center" onClick={() => navigate('/about')} style={{ cursor: 'pointer' }}>
<h2 className="text-sm font-black text-primary tracking-[0.4em] uppercase mb-8">The Philosophy</h2>
<p className="text-3xl md:text-5xl font-light italic leading-tight text-on-surface mb-12">
                "We don't teach syntax. We teach <span className="text-primary font-black not-italic">Problem Sovereignty</span>. The ability to own a challenge from initial chaos to elegant resolution."
            </p>
<div className="flex justify-center items-center gap-12">
<div>
<div className="text-4xl font-black text-white">50k+</div>
<div className="text-xs text-on-surface-variant uppercase tracking-widest mt-1">Engineers Forged</div>
</div>
<div className="w-px h-12 bg-outline-variant/20"></div>
<div>
<div className="text-4xl font-black text-white">120+</div>
<div className="text-xs text-on-surface-variant uppercase tracking-widest mt-1">Global Partners</div>
</div>
</div>
</div>
</section>
{/*  Contact Section  */}
<section className="py-24 relative overflow-hidden">
<div className="max-w-7xl mx-auto px-8">
<div className="glass-panel bg-surface-container-highest/30 rounded-[48px] p-12 md:p-20 overflow-hidden relative">
<div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
<div>
<h2 className="text-5xl font-black tracking-tighter mb-8">Ready to initiate your sequence?</h2>
<p className="text-on-surface-variant mb-12 max-w-md text-lg">Send a ping to our control center and let's discuss your architectural journey or project requirements.</p>
<div className="space-y-6">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-primary">mail</span>
</div>
<span className="font-bold">dakhedusolution@gmail.com</span>
</div>
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary">call</span>
</div>
<span className="font-bold">+91 8667399640</span>
</div>
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-secondary">location_on</span>
</div>
<span className="font-bold">Chennai, Tamil Nadu, India</span>
</div>
</div>
</div>
<form className="space-y-4" onSubmit={(e) => {e.preventDefault(); alert('Transmission Sent! Our architects will contact you shortly.');}}>
<div className="grid grid-cols-2 gap-4">
<input required className="bg-surface-container-lowest border-0 focus:ring-2 focus:ring-secondary rounded-xl px-6 py-4 placeholder:text-on-surface-variant/40 text-sm" placeholder="Identity" type="text"/>
<input required className="bg-surface-container-lowest border-0 focus:ring-2 focus:ring-secondary rounded-xl px-6 py-4 placeholder:text-on-surface-variant/40 text-sm" placeholder="Signal Link (Email)" type="email"/>
</div>
<select required className="w-full bg-surface-container-lowest border-0 focus:ring-2 focus:ring-secondary rounded-xl px-6 py-4 text-on-surface-variant/40 text-sm">
<option value="">Inquiry Intent</option>
<option>Enrollment Inquiry</option>
<option>Project Deployment</option>
<option>Partnership Protocol</option>
</select>
<textarea required className="w-full bg-surface-container-lowest border-0 focus:ring-2 focus:ring-secondary rounded-xl px-6 py-4 placeholder:text-on-surface-variant/40 text-sm" placeholder="Transmission Details" rows="4"></textarea>
<button type="submit" className="w-full bg-gradient-to-r from-secondary to-secondary-container text-white py-5 rounded-xl font-black uppercase tracking-[0.2em] shadow-xl hover:shadow-secondary/20 transition-all">
                             Send Transmission
                        </button>
</form>
</div>
</div>
</div>
</section>
{/*  Footer  */}
<footer className="w-full border-t border-white/5 bg-[#0a0e14]">
<div className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
<div className="col-span-1 md:col-span-1">
<div className="text-lg font-bold text-white mb-6">DAKH EDU SOLUTIONS</div>
<p className="font-['Inter'] text-xs text-slate-500 leading-relaxed max-w-xs">Forging the architectural backbone of the next web. We don't just teach code; we craft creators.</p>
</div>
<div>
<h4 className="text-xs font-black text-primary uppercase tracking-widest mb-6">Ecosystem</h4>
<ul className="space-y-3">
<li><Link className="font-['Inter'] text-xs text-slate-400 hover:text-[#00D1FF] transition-colors" to="/courses">Courses</Link></li>
<li><Link className="font-['Inter'] text-xs text-slate-400 hover:text-[#00D1FF] transition-colors" to="/services">Services</Link></li>
<li><Link className="font-['Inter'] text-xs text-slate-400 hover:text-[#00D1FF] transition-colors" to="/internships">Internships</Link></li>
</ul>
</div>
<div>
<h4 className="text-xs font-black text-primary uppercase tracking-widest mb-6">Resources</h4>
<ul className="space-y-3">
<li><Link className="font-['Inter'] text-xs text-slate-400 hover:text-[#00D1FF] transition-colors" to="/tools">Tools</Link></li>
<li><Link className="font-['Inter'] text-xs text-slate-400 hover:text-[#00D1FF] transition-colors" to="/useful-tools">Useful Tools</Link></li>
<li><a className="font-['Inter'] text-xs text-slate-400 hover:text-[#00D1FF] transition-colors" href="#">Documentation</a></li>
</ul>
</div>
<div>
<h4 className="text-xs font-black text-primary uppercase tracking-widest mb-6">Legal & Meta</h4>
<ul className="space-y-3">
<li><Link className="font-['Inter'] text-xs text-slate-400 hover:text-[#00D1FF] transition-colors" to="/privacy-policy">Privacy Policy</Link></li>
<li><a className="font-['Inter'] text-xs text-slate-400 hover:text-[#00D1FF] transition-colors" href="#">Terms of Service</a></li>
<li><a className="font-['Inter'] text-xs text-slate-400 hover:text-[#00D1FF] transition-colors" href="https://wa.me/918667399640" target="_blank" rel="noopener noreferrer" onClick={(e) => { alert('Contact: dakhedusolution@gmail.com'); }}>Contact Us</a></li>
</ul>
</div>
</div>
<div className="max-w-7xl mx-auto px-8 py-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
<span className="font-['Inter'] text-xs text-slate-500">© 2024 DAKH EDU SOLUTIONS. All rights reserved.</span>
<div className="flex gap-6">
<a className="text-slate-500 hover:text-white transition-all" href="#"><span className="material-symbols-outlined text-lg">language</span></a>
<a className="text-slate-500 hover:text-white transition-all" href="mailto:dakhedusolution@gmail.com"><span className="material-symbols-outlined text-lg">alternate_email</span></a>
<a className="text-slate-500 hover:text-white transition-all" href="https://dakhedusolutions.in"><span className="material-symbols-outlined text-lg">public</span></a>
      </div>
    </div>
  </footer>
  </>
);
}
