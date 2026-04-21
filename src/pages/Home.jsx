import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';
import SkillRunnerGame from '../components/SkillRunnerGame';
import { getSupabaseUrl, handleImageError, FALLBACK_IMAGE } from '../utils/imageUrl';
import logo from '../assets/logo.png';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
   const [eventData, setEventData] = useState({ title: '', targetDate: null, link: '' });
   const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
   const [activeMainTab, setActiveMainTab] = useState('courses');
    const [isMentorModalOpen, setIsMentorModalOpen] = useState(false);
    const navigate = useNavigate();
    const heroRef = useRef(null);
    const cardsRef = useRef(null);
    const wordRef = useRef(null);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const words = ['Grow', 'Learn', 'Build', 'Innovate'];

  useEffect(() => {
    // Hero Animation
    const ctx = gsap.context(() => {
      // Entry animations removed as per user request to make it "normal"
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (wordRef.current) {
      gsap.fromTo(wordRef.current, 
        { opacity: 0, filter: 'blur(8px)', y: 5 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.8, ease: 'power2.out' }
      );
    }
  }, [currentWordIndex]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('is_active', true)
          .order('id', { ascending: false })
          .limit(1);
        
        if (error) throw error;
        if (data && data.length > 0) {
          const rawDate = data[0].target_datetime;
          // Fix for mobile Safari and generic parsing
          const formattedDate = rawDate ? rawDate.replace(' ', 'T') : null;
          
          setEventData({
            title: data[0].title || 'Next Event',
            targetDate: formattedDate ? new Date(formattedDate) : null,
            link: data[0].event_link
          });
        }
      } catch (err) {
        console.error('Error fetching event:', err);
      }
    };
    fetchEvent();
  }, []);

  useEffect(() => {
    if (!eventData.targetDate || isNaN(eventData.targetDate.getTime())) return;

    const calculateTimeLeft = () => {
      const difference = eventData.targetDate.getTime() - Date.now();
      
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

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [eventData.targetDate]);

  const handleDiveIn = () => {
    navigate('/opportunities');
  };

  const handleGetStarted = () => {
    navigate('/courses');
  };

  const [siteSettings, setSiteSettings] = useState(null);

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const { data, error } = await supabase.from('site_settings').select('*').limit(1);
        if (error) throw error;
        if (data && data.length > 0) setSiteSettings(data[0]);
      } catch (err) {
        console.error('Error fetching site settings:', err);
      }
    };
    fetchSiteSettings();
  }, []);

  const handleApply = () => {
    window.open(siteSettings?.default_apply_link || 'https://forms.gle/PFs1Vyx4FuKerRQW8', '_blank');
  };

  const handleWhatsApp = () => {
    window.open(siteSettings?.whatsapp_link || 'https://chat.whatsapp.com/LkKyo7np9oVJXo8LhtrzQA', '_blank');
  };

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (centerY - y) / 10;
    const rotateY = (x - centerX) / 10;
    
    card.style.setProperty('--rotate-x', `${rotateX}deg`);
    card.style.setProperty('--rotate-y', `${rotateY}deg`);
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty('--rotate-x', `0deg`);
    card.style.setProperty('--rotate-y', `0deg`);
  };

  return (
    <div>

{/*  TopNavBar  */}

{/*  Hero Section  */}
<section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
{/*  3D Particle Background Simulation  */}
<div className="absolute inset-0 z-0">
<div className="absolute inset-0 bg-[#0a0e14]"></div>
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(0,209,255,0.08)_0%,transparent_70%)]"></div>
<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse"></div>
</div>

<div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 text-center">
<div className="mb-8 md:mb-10 flex justify-center">
<span className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black tracking-[0.4em] uppercase shadow-[0_0_20px_rgba(105,218,255,0.05)]">The Future of Growth</span>
</div>
<h1 className="text-5xl md:text-9xl font-black mb-8 leading-[0.9] tracking-tightest glow">
                Join &<br /> 
                <span ref={wordRef} className="text-gradient inline-block min-w-[320px] md:min-w-[700px]">
                  {words[currentWordIndex]}
                </span><br />
                With Us.
</h1>
<p className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
                Build skills, earn experience, and grow through real opportunities in our dimensional laboratory.
</p>

{/*  Master Event Countdown Section  */}
{eventData.targetDate && (
<div className="flex justify-center w-full mb-12 px-4">
  <div className="w-full max-w-3xl glass-panel p-6 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden bg-white/5">
    {/* Background flare */}
    <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
    
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 w-full">
      <div className="text-center md:text-left flex-1">
        <div className="flex items-center justify-center md:justify-start gap-3 text-[10px] text-primary font-black uppercase tracking-[0.4em] mb-4">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          MISSION PROTOCOL: {eventData.title}
        </div>
        
        <div className="flex gap-4 sm:gap-6 items-center justify-center md:justify-start">
          <div className="text-center">
            <span className="text-4xl md:text-5xl font-black block tracking-tightest leading-none">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest mt-2 block">Days</span>
          </div>
          <div className="w-px h-8 bg-white/10"></div>
          <div className="text-center">
            <span className="text-4xl md:text-5xl font-black block tracking-tightest leading-none">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest mt-2 block">Hours</span>
          </div>
          <div className="w-px h-8 bg-white/10"></div>
          <div className="text-center">
            <span className="text-4xl md:text-5xl font-black block tracking-tightest leading-none">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest mt-2 block">Mins</span>
          </div>
          <div className="w-px h-8 bg-white/10"></div>
          <div className="text-center">
            <span className="text-4xl md:text-5xl font-black block tracking-tightest leading-none text-primary">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="text-[8px] text-primary/60 font-black uppercase tracking-widest mt-2 block">Secs</span>
          </div>
        </div>
      </div>

      {eventData.link && (
        <a 
          href={eventData.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-primary/10 border border-primary/20 text-primary px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-[#004050] transition-all flex items-center justify-center gap-2 group w-full md:w-auto"
        >
          Access Beta
          <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">rocket_launch</span>
        </a>
      )}
    </div>
  </div>
</div>
)}

<div className="flex flex-col md:flex-row items-center justify-center gap-6">
<button onClick={handleApply} className="w-full md:w-auto px-12 py-6 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-2xl btn-vibrate">
                    Apply Now
                </button>
<button onClick={handleWhatsApp} className="w-full md:w-auto px-12 py-6 rounded-2xl bg-[#25D366] text-white font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-2xl btn-vibrate flex items-center justify-center gap-3">
                    <span className="material-symbols-outlined text-lg">chat</span>
                    Join Community
                </button>
</div>
</div>
</section>

{/* Interactive Skill Runner Section */}
<SkillRunnerGame />

{/* Interactive Role Cards Section */}
<section ref={cardsRef} className="py-32 relative overflow-hidden" id="opportunities">
<div className="max-w-7xl mx-auto px-6 md:px-8">
<div className="text-center mb-24">
<h2 className="text-primary text-xs font-black tracking-[0.5em] uppercase mb-4">Choose Your Path</h2>
<p className="text-4xl md:text-6xl font-black tracking-tightest">Architect Your Identity</p>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
{[
                { title: 'Campus Ambassador', desc: 'Lead your college community and build executive leadership skills.', icon: 'campaign', color: 'primary' },
                { title: 'Developer / Creator', desc: 'Build real-world projects and showcase your skills in our portfolio.', icon: 'terminal', color: 'secondary' },
                { title: 'Marketing Partner', desc: 'Promote our ecosystem via WhatsApp and earn dimensional rewards.', icon: 'share', color: 'tertiary', special: true },
                { title: 'Freelancer', desc: 'Remote work opportunities in design, writing, and high-end tech.', icon: 'work_history', color: 'outline' }
              ].map((role) => (
<div 
                  key={role.title}
                  onClick={role.special ? handleWhatsApp : handleApply} 
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className={`role-card glass-panel hover-tilt glow-border cursor-pointer bg-white/5 rounded-[2.5rem] p-10 flex flex-col items-center text-center transition-all hover:bg-white/10 border border-white/5 relative group ${role.special ? 'border-l-4 border-l-green-500' : ''}`}
>
<div className={`w-20 h-20 rounded-3xl bg-${role.color}/10 flex items-center justify-center mb-10 border border-${role.color}/20 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(0,0,0,0.3)]`}>
<span className={`material-symbols-outlined text-${role.color} ${role.color === 'outline' ? 'text-white' : ''} text-5xl`}>{role.icon}</span>
</div>
<h4 className="text-2xl font-black mb-4 tracking-tight">{role.title}</h4>
<p className="text-sm text-slate-500 leading-relaxed mb-10 flex-grow font-medium">{role.desc}</p>
<button className={`mt-auto w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-widest border transition-all ${role.special ? 'bg-green-500 border-green-500 text-black hover:bg-green-600' : 'bg-white/5 border-white/10 text-white hover:bg-white hover:text-black'} btn-vibrate`}>
                    {role.special ? 'Join Network' : 'Apply Now'}
</button>
</div>
              ))}
</div>
</div>
</section>
{/*  Services Section  */}
<section className="py-24 relative bg-surface-container-low" id="services">
<div className="max-w-7xl mx-auto px-6 md:px-8">
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
{/*  Opportunities Section (Unified on Mobile)  */}
<section className="py-24" id="mission-center">
<div className="max-w-7xl mx-auto px-6 md:px-8">
{/*  Mobile Tab Header  */}
<div className="flex lg:hidden bg-white/5 p-1 rounded-2xl border border-white/10 mb-10 w-full max-w-sm mx-auto">
<button 
                onClick={() => setActiveMainTab('opportunities')}
                className={`flex-1 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeMainTab === 'opportunities' ? 'bg-white text-black shadow-lg translate-y-[1px]' : 'text-slate-500'
                }`}
>
                Growth
</button>
<button 
                onClick={() => setActiveMainTab('courses')}
                className={`flex-1 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeMainTab === 'courses' ? 'bg-white text-black shadow-lg translate-y-[1px]' : 'text-slate-500'
                }`}
>
                Knowledge
</button>
</div>

{/*  Growth Ecosystem Content (New)  */}
<div className={`transition-all duration-300 ${activeMainTab === 'opportunities' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none hidden lg:block'} mb-24`}>
<div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
<div className="text-center md:text-left w-full md:w-auto">
<h2 className="text-secondary text-[10px] font-black tracking-[0.4em] uppercase mb-4">Growth Ecosystem</h2>
<p className="text-3xl md:text-5xl font-black tracking-tightest leading-none">Join & Build With Us</p>
</div>
<button onClick={() => navigate('/opportunities')} className="text-primary text-[10px] font-black uppercase tracking-widest hidden md:block hover:underline">Explore All Roles</button>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{[
                { title: 'Campus Ambassador', desc: 'Lead your college community and build executive skills.', icon: 'campaign', color: 'primary' },
                { title: 'Core Developer', desc: 'Build production software and scale our technical neural network.', icon: 'terminal', color: 'secondary' },
                { title: 'Marketing Node', desc: 'Activate WhatsApp networks and earn performance rewards.', icon: 'share', color: 'tertiary', special: true },
                { title: 'Tactical Freelancer', desc: 'Work remotely on mission-specific tasks and earn dimensional rewards.', icon: 'work_history', color: 'outline' }
              ].map((role) => (
<div 
                  key={role.title}
                  onClick={role.special ? () => window.open('https://chat.whatsapp.com/LkKyo7np9oVJXo8LhtrzQA', '_blank') : handleApply} 
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className={`glass-panel hover-tilt glow-border cursor-pointer bg-white/5 rounded-3xl p-8 flex flex-col items-center text-center transition-all hover:bg-white/10 border border-white/5 ${role.special ? 'border-l-4 border-l-green-500' : ''}`}
>
<div className={`w-16 h-16 rounded-full bg-${role.color}/10 flex items-center justify-center mb-8 border border-${role.color}/20`}>
<span className={`material-symbols-outlined text-${role.color} ${role.color === 'outline' ? 'text-white' : ''} text-4xl`}>{role.icon}</span>
</div>
<h4 className="text-xl font-black mb-3">{role.title}</h4>
<p className="text-xs text-slate-500 leading-relaxed mb-8">{role.desc}</p>
<span className={`mt-auto ${role.special ? 'text-green-500' : 'text-primary'} text-[9px] font-black px-5 py-2.5 bg-white/5 rounded-full border border-white/10 tracking-widest uppercase btn-glow`}>
  {role.special ? 'Join Network' : 'Apply Now'}
</span>
</div>
              ))}
</div>
</div>

{/*  Knowledge Pipeline Content (Courses)  */}
<div className={`transition-all duration-300 ${activeMainTab === 'courses' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none hidden lg:block'} mb-24`}>
<div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
<div className="text-center md:text-left w-full md:w-auto">
<h2 className="text-primary text-[10px] font-black tracking-[0.4em] uppercase mb-4">Knowledge Pipelines</h2>
<p className="text-3xl md:text-5xl font-black tracking-tightest leading-none">Architecting Your Stack</p>
</div>
<p className="text-slate-400 max-w-sm text-sm text-center md:text-right hidden md:block">Deep-dive technical tracks for the modern engineer.</p>
</div>

{/*  Desktop Grid / Mobile Horizontal Scroll  */}
<div className="flex lg:grid lg:grid-cols-4 gap-6 overflow-x-auto pb-10 lg:pb-0 hide-scrollbar scroll-snap-x px-2 lg:px-0">
{[
                { title: 'React Mastery', desc: 'Hook logic & state architecture', icon: 'code_blocks', color: 'primary', label: 'ENROLL' },
                { title: 'Backend Flux', desc: 'Serverless & distributed systems', icon: 'database', color: 'secondary', label: 'JOIN' },
                { title: 'Visual Logic', desc: 'Typography & Interactivity', icon: 'brush', color: 'tertiary', label: 'VIEW' },
                { title: 'Cloud Native', desc: 'Docker & Kubernetes orchestration', icon: 'cloud_queue', color: 'outline', label: 'PRE-REG' }
              ].map((course) => (
<div 
                  key={course.title}
                  onClick={handleApply} 
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className="min-w-[280px] lg:min-w-0 scroll-snap-child glass-panel hover-tilt glow-border cursor-pointer bg-white/5 rounded-3xl p-8 flex flex-col items-center text-center transition-all hover:bg-white/10 border border-white/5"
>
<div className={`w-16 h-16 rounded-full bg-${course.color}/10 flex items-center justify-center mb-8 border border-${course.color}/20`}>
<span className={`material-symbols-outlined text-${course.color} text-4xl`}>{course.icon}</span>
</div>
<h4 className="text-xl font-black mb-3">{course.title}</h4>
<p className="text-xs text-slate-500 leading-relaxed mb-8">{course.desc}</p>
<span className={`mt-auto text-${course.color} text-[9px] font-black px-5 py-2.5 bg-${course.color}/5 rounded-full border border-${course.color}/10 tracking-widest uppercase btn-glow`}>{course.label} NO-WAIT</span>
</div>
              ))}
</div>
</div>

{/*  Immersion Program Content (Internships)  */}
<div className={`${activeMainTab === 'internships' ? 'block' : 'hidden lg:block'} relative`}>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
<div className="space-y-10 text-center lg:text-left">
<div className="space-y-4">
<h2 className="text-secondary text-[10px] font-black tracking-[0.4em] uppercase">The Immersion Program</h2>
<h3 className="text-4xl md:text-6xl font-black tracking-tightest leading-[0.85]">Forge Your Identity.</h3>
</div>
<p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">Work directly with senior mentors in our ethereal laboratory. Contribute to production code that shapes the digital frontier.</p>
<ul className="space-y-5 flex flex-col items-center lg:items-start">
{[
                  '3-Month Intensive Mentorship',
                  'Global Industry Networking',
                  'Direct Placement Track'
                ].map((item) => (
<li key={item} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white/80">
<div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                    {item}
</li>
                ))}
</ul>
<button 
                  onClick={handleApply} 
                  className="w-full md:w-auto bg-white text-black px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl btn-vibrate"
>
                  INITIATE SEQUENCE: AUTUMN 2024
</button>
</div>
<div className="relative group lg:block hidden">
<div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-secondary/30 opacity-20 blur-3xl rounded-[40px]"></div>
                  <img 
                    alt="Modern workspace" 
                    className="rounded-[40px] border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl" 
                    src={getSupabaseUrl('https://lh3.googleusercontent.com/aida-public/AB6AXuDf0nhiYOjJzm8ZyX7ARu6ZIhMczKlwcdD6-TVmthJm9eBUth2yfidWDRiB9ZvFubL0C4M6R4MvdbZ74ZDA1rcfV97goA-QGwAbBD-umMSva46oBfyabpdBOL6k4WUPm-t49XwQBGw9vfq7CqQVtjCrdtne6ihTTt3DdkECtauscvByZj-ZS4Yru6xbb-oPLG0Ybpw8_jiqZmo_BKn5jVRMkX0OO0P6K4uEZw3ea4lTDxWJ0Qe8ueDc9fE-umQGgA0s0gmhv-pWDypx') || FALLBACK_IMAGE} 
                    onError={handleImageError}
                  />
</div>
</div>
</div>
</div>
</section>
{/*  Tools Preview Section (Bento Style)  */}
<section className="py-24" id="tools">
<div className="max-w-7xl mx-auto px-6 md:px-8">
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
<div className="max-w-7xl mx-auto px-6 md:px-8">
<div className="glass-panel bg-surface-container-highest/30 rounded-[48px] p-12 md:p-20 overflow-hidden relative">
<div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
<div>
<h2 className="text-5xl md:text-8xl font-black tracking-tightest mb-8 glow leading-[0.9]">Ready to start your journey?</h2>
<p className="text-slate-400 mb-12 max-w-md text-lg font-medium leading-relaxed">Join the growth ecosystem and ignite your technical trajectory with our dimensional laboratory.</p>

<div className="flex flex-col sm:flex-row gap-6">
  <button onClick={handleApply} className="bg-white text-black px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-2xl btn-vibrate">
    Get Started
  </button>
  <button onClick={handleWhatsApp} className="bg-[#25D366] text-white px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-2xl flex items-center justify-center gap-3 btn-vibrate">
    <span className="material-symbols-outlined text-lg">chat</span>
    Join WhatsApp
  </button>
</div>
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-primary">mail</span>
</div>
<span className="font-bold">{siteSettings?.contact_email || 'dakhedusolution@gmail.com'}</span>
</div>
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary">call</span>
</div>
<span className="font-bold">{siteSettings?.contact_phone || '+91 8667399640'}</span>
</div>
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-secondary">location_on</span>
</div>
<span className="font-bold">{siteSettings?.address || 'Chennai, Tamil Nadu, India'}</span>
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
<button type="submit" className="w-full bg-gradient-to-r from-secondary to-secondary-container text-white py-5 rounded-xl font-black uppercase tracking-[0.2em] shadow-xl hover:shadow-secondary/20 transition-all btn-vibrate btn-glow">
                             Send Transmission
                        </button>
</form>

<div className="mt-12 flex justify-center">
  <button 
    onClick={() => setIsMentorModalOpen(true)}
    className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all btn-vibrate"
  >
    <span className="material-symbols-outlined text-primary">psychology</span>
    Talk to Mentor
  </button>
</div>

{/* Talk to Mentor Modal */}
{isMentorModalOpen && (
  <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-xl animate-in fade-in duration-300">
    <div className="relative glass-panel bg-surface-container-highest/80 rounded-[32px] p-10 md:p-14 max-w-md w-full shadow-3xl animate-in zoom-in-95 duration-300 border border-white/10">
      <div className="absolute top-6 right-6">
        <button onClick={() => setIsMentorModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      
      <div className="text-center">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(105,218,255,0.2)]">
          <span className="material-symbols-outlined text-primary text-4xl">contact_support</span>
        </div>
        <h3 className="text-3xl font-black mb-4 tracking-tightest">Talk to Mentor</h3>
        <p className="text-slate-400 mb-10 font-medium">Connect directly with our lead architects for a personalized consultation.</p>
        
        <div className="bg-black/20 rounded-2xl p-6 border border-white/5 mb-10">
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2">Direct Channel</p>
          <a href={`tel:${siteSettings?.contact_phone || '+918667399640'}`} className="text-2xl font-black text-white hover:text-primary transition-colors">{siteSettings?.contact_phone || '+91 8667399640'}</a>
        </div>
        
        <div className="flex flex-col gap-4">
          <a 
            href={`tel:${siteSettings?.contact_phone || '+918667399640'}`} 
            className="w-full bg-primary text-[#004050] py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl btn-vibrate flex items-center justify-center gap-3"
          >
            Call Now
            <span className="material-symbols-outlined text-lg">call</span>
          </a>
          <button 
            onClick={() => setIsMentorModalOpen(false)}
            className="w-full bg-white/5 text-slate-300 py-5 rounded-2xl font-black uppercase tracking-widest text-xs border border-white/10 hover:bg-white/10 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}
</div>
</div>
</div>
</section>
  <Footer />
  </div>
);
}
