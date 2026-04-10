import React from 'react';

export default function UsefulTools() {
  return (
    <>

{/*  Top Navigation Shell  */}

<main className="pt-32 pb-24 px-6 md:px-8 max-w-7xl mx-auto min-h-screen">
{/*  Hero Section  */}
<header className="mb-20 text-center md:text-left max-w-3xl">
<div className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[0.7rem] font-bold uppercase tracking-widest mb-6">
                Resource Ecosystem
            </div>
<h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter mb-6 leading-tight">
                Dimensional <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Intelligence.</span>
</h1>
<p className="text-on-surface-variant text-lg md:text-xl leading-relaxed font-light">
                Unlock your potential with our curated suite of precision educational tools. Engineered for clarity, efficiency, and high-performance learning.
            </p>
</header>
{/*  Tool Grid (Bento Style)  */}
<div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
{/*  Featured: Resume Builder (Large)  */}
<div className="kinetic-card md:col-span-6 lg:col-span-8 glass-panel rounded-xl p-8 flex flex-col justify-between overflow-hidden relative group">
<div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] -mr-32 -mt-32"></div>
<div>
<div className="w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center mb-6 border border-white/10 text-primary">
<span className="material-symbols-outlined">description</span>
</div>
<h3 className="text-2xl font-bold text-on-surface mb-3 tracking-tight">Professional Resume Builder</h3>
<p className="text-on-surface-variant text-sm leading-relaxed max-w-md mb-8">
                        Craft industry-standard resumes with our AI-powered structuring tool. Dynamic layouts designed to bypass ATS filters and impress top recruiters.
                    </p>
</div>
<div className="flex items-center gap-4">
<button className="bg-primary text-on-primary font-bold px-6 py-3 rounded-lg text-sm hover:bg-primary-dim transition-colors">
                        Open Tool
                    </button>
<span className="text-on-surface-variant text-xs font-medium">Free for students</span>
</div>
</div>
{/*  Tool: QR Generator (Small)  */}
<div className="kinetic-card md:col-span-6 lg:col-span-4 glass-panel rounded-xl p-8 flex flex-col justify-between group">
<div>
<div className="w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center mb-6 border border-white/10 text-secondary">
<span className="material-symbols-outlined">qr_code_2</span>
</div>
<h3 className="text-xl font-bold text-on-surface mb-3 tracking-tight">QR Generator</h3>
<p className="text-on-surface-variant text-sm leading-relaxed">
                        Instant, high-resolution QR codes for documents, portfolios, and academic links.
                    </p>
</div>
<button className="mt-8 border border-outline-variant hover:border-secondary text-on-surface font-semibold px-4 py-3 rounded-lg text-sm transition-all flex items-center justify-center gap-2">
                    Open Tool
                    <span className="material-symbols-outlined text-sm">arrow_outward</span>
</button>
</div>
{/*  Tool: AI Tools (Medium)  */}
<div className="kinetic-card md:col-span-6 lg:col-span-4 glass-panel rounded-xl p-8 flex flex-col justify-between group">
<div>
<div className="w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center mb-6 border border-white/10 text-tertiary">
<span className="material-symbols-outlined">auto_awesome</span>
</div>
<h3 className="text-xl font-bold text-on-surface mb-3 tracking-tight">AI Academic Suite</h3>
<p className="text-on-surface-variant text-sm leading-relaxed">
                        Summarizers, concept generators, and citation assistants powered by advanced LLMs.
                    </p>
</div>
<button className="mt-8 border border-outline-variant hover:border-tertiary text-on-surface font-semibold px-4 py-3 rounded-lg text-sm transition-all flex items-center justify-center gap-2">
                    Open Tool
                    <span className="material-symbols-outlined text-sm">arrow_outward</span>
</button>
</div>
{/*  Tool: Student Tools (Large)  */}
<div className="kinetic-card md:col-span-6 lg:col-span-5 glass-panel rounded-xl p-8 flex flex-col justify-between relative overflow-hidden">
<div className="absolute bottom-0 right-0 p-4 opacity-5 pointer-events-none">
<span className="material-symbols-outlined text-[120px]">school</span>
</div>
<div>
<div className="w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center mb-6 border border-white/10 text-primary-dim">
<span className="material-symbols-outlined">school</span>
</div>
<h3 className="text-2xl font-bold text-on-surface mb-3 tracking-tight">Student Essentials</h3>
<p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                        GPA calculators, study planners, and subject-specific resource maps designed for modern learners.
                    </p>
<ul className="space-y-3 mb-8">
<li className="flex items-center gap-2 text-xs text-on-surface-variant">
<span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                            GPA &amp; CGPA Calculator
                        </li>
<li className="flex items-center gap-2 text-xs text-on-surface-variant">
<span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                            Interactive Study Timetable
                        </li>
</ul>
</div>
<button className="bg-surface-container-highest text-on-surface font-semibold px-6 py-3 rounded-lg text-sm border border-outline-variant hover:bg-surface-bright transition-all">
                    Access Library
                </button>
</div>
{/*  Tool: Productivity (Small/Medium)  */}
<div className="kinetic-card md:col-span-12 lg:col-span-3 glass-panel rounded-xl p-8 flex flex-col justify-between group border-l-4 border-l-secondary">
<div>
<div className="w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center mb-6 border border-white/10 text-secondary-dim">
<span className="material-symbols-outlined">speed</span>
</div>
<h3 className="text-xl font-bold text-on-surface mb-3 tracking-tight">Focus Engine</h3>
<p className="text-on-surface-variant text-sm leading-relaxed">
                        Pomodoro timers, ambient noise generators, and distraction blockers.
                    </p>
</div>
<button className="mt-8 bg-secondary/10 hover:bg-secondary/20 text-secondary font-bold px-4 py-3 rounded-lg text-sm transition-all">
                    Start Session
                </button>
</div>
</div>
{/*  Secondary Section: Featured Integration  */}
<section className="mt-32 glass-panel rounded-[2rem] p-12 relative overflow-hidden">
<div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary/10 blur-[120px]"></div>
<div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
<div className="md:w-1/2">
<h2 className="text-3xl font-black tracking-tight mb-6 text-on-surface">Streamline Your Academic Journey</h2>
<p className="text-on-surface-variant leading-relaxed mb-8">
                        Our tools are designed to work together. Export your resume, link your portfolio QR, and manage your study time all from a single unified dashboard.
                    </p>
<div className="flex flex-wrap gap-4">
<div className="px-4 py-2 bg-white/5 rounded-full text-xs font-semibold border border-white/10">Cloud Storage Sync</div>
<div className="px-4 py-2 bg-white/5 rounded-full text-xs font-semibold border border-white/10">PDF Export Support</div>
<div className="px-4 py-2 bg-white/5 rounded-full text-xs font-semibold border border-white/10">Mobile Optimized</div>
</div>
</div>
<div className="md:w-1/2 relative">
<div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-surface-container-lowest">
<img alt="Dashboard interface" className="w-full h-full object-cover opacity-60" data-alt="Modern clean dark mode software dashboard with minimalist graphs, glowing blue accents, and glass cards layout" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrVDM7knhhI3JbHWi74cgeoJ9MExKZnt_Ex1t49cMyNll9ja5yOr-ujWAigCF3qUqFCndguWHupwJTzH4tHAJFYBKJ7zkThVXIFNjAuuLv24f3-kpjnIY-ZFr0k5RIm6dDtke7jYE0tMf7uqWY1HqhIQPdXcRwYEtSxZPjQGcFiq6K1ypykjPjwrSW8HzAJ4OGyey_mVxGAGON6BxW5TTyEwJL7VKzNJjdi4wj1Jh0p-Nb69Cf4o5iIkgT1CS878VMQcHxupu-9veM"/>
</div>
{/*  Floating Accent  */}
<div className="absolute -bottom-6 -right-6 w-32 h-32 glass-panel rounded-2xl border border-primary/30 flex items-center justify-center p-4">
<span className="material-symbols-outlined text-primary text-4xl" >verified</span>
</div>
</div>
</div>
</section>
</main>
{/*  Footer  */}
<footer className="w-full border-t border-white/5 bg-[#0a0e14]">
<div className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
<div className="col-span-1 md:col-span-2">
<div className="text-lg font-bold text-white mb-6">DAKH EDU SOLUTIONS</div>
<p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                    Elevating educational standards through dimensional design and intelligent learning tools for the next generation of innovators.
                </p>
</div>
<div>
<h4 className="text-on-surface font-bold text-sm mb-6 uppercase tracking-widest">Resources</h4>
<div className="flex flex-col gap-4">
<a className="text-slate-400 hover:text-[#00D1FF] transition-colors text-xs font-['Inter']" href="#">Documentation</a>
<a className="text-slate-400 hover:text-[#00D1FF] transition-colors text-xs font-['Inter']" href="#">API Access</a>
<a className="text-slate-400 hover:text-[#00D1FF] transition-colors text-xs font-['Inter']" href="#">Community</a>
</div>
</div>
<div>
<h4 className="text-on-surface font-bold text-sm mb-6 uppercase tracking-widest">Legal</h4>
<div className="flex flex-col gap-4">
<a className="text-slate-400 hover:text-[#00D1FF] transition-colors text-xs font-['Inter']" href="/privacy-policy">Privacy Policy</a>
<a className="text-slate-400 hover:text-[#00D1FF] transition-colors text-xs font-['Inter']" href="#">Terms of Service</a>
<a className="text-slate-400 hover:text-[#00D1FF] transition-colors text-xs font-['Inter']" href="https://wa.me/918667399640" target="_blank" rel="noopener noreferrer" onClick={(e) => { alert('Contact: dakhedusolution@gmail.com'); }}>Contact Us</a>
</div>
</div>
</div>
<div className="max-w-7xl mx-auto px-8 py-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
<div className="font-['Inter'] text-xs text-slate-500">© 2024 DAKH EDU SOLUTIONS. All rights reserved.</div>
<div className="flex gap-6">
<span className="material-symbols-outlined text-slate-500 hover:text-primary transition-colors cursor-pointer">language</span>
<span className="material-symbols-outlined text-slate-500 hover:text-primary transition-colors cursor-pointer">public</span>
</div>
</div>
</footer>

    </>
  );
}
