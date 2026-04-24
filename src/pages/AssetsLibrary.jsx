import React, { useState } from 'react';
import { BookOpen, Download, Search, Filter, FileText, Image, Video, Music, Archive, ExternalLink } from 'lucide-react';
import { useToast } from '../components/ToastProvider';

const categories = ['All', 'Documents', 'Templates', 'Images', 'Videos', 'Guides'];

const assets = [
  {
    id: 1,
    title: 'Resume Template – Fresher',
    description: 'ATS-friendly resume template designed for freshers and recent graduates.',
    category: 'Templates',
    type: 'DOCX',
    icon: FileText,
    color: 'from-blue-500/20 to-blue-600/10',
    border: 'border-blue-500/20',
    iconColor: 'text-blue-400',
    tag: 'Popular',
    tagColor: 'bg-blue-500/20 text-blue-300',
  },
  {
    id: 2,
    title: 'Interview Preparation Guide',
    description: 'Comprehensive guide covering HR, technical, and aptitude rounds for top MNCs.',
    category: 'Guides',
    type: 'PDF',
    icon: BookOpen,
    color: 'from-[#69daff]/20 to-[#69daff]/5',
    border: 'border-[#69daff]/20',
    iconColor: 'text-[#69daff]',
    tag: 'Free',
    tagColor: 'bg-[#69daff]/20 text-[#69daff]',
  },
  {
    id: 3,
    title: 'TCS NQT Study Material',
    description: 'Topic-wise study notes and practice questions for TCS National Qualifier Test.',
    category: 'Documents',
    type: 'PDF',
    icon: FileText,
    color: 'from-purple-500/20 to-purple-600/10',
    border: 'border-purple-500/20',
    iconColor: 'text-purple-400',
    tag: 'New',
    tagColor: 'bg-purple-500/20 text-purple-300',
  },
  {
    id: 4,
    title: 'LinkedIn Profile Checklist',
    description: 'Step-by-step checklist to optimize your LinkedIn profile for recruiter visibility.',
    category: 'Guides',
    type: 'PDF',
    icon: FileText,
    color: 'from-green-500/20 to-green-600/10',
    border: 'border-green-500/20',
    iconColor: 'text-green-400',
    tag: 'Free',
    tagColor: 'bg-green-500/20 text-green-300',
  },
  {
    id: 5,
    title: 'Cover Letter Template Pack',
    description: 'Professional cover letter templates for software, marketing, and design roles.',
    category: 'Templates',
    type: 'DOCX',
    icon: FileText,
    color: 'from-yellow-500/20 to-yellow-600/10',
    border: 'border-yellow-500/20',
    iconColor: 'text-yellow-400',
    tag: 'Popular',
    tagColor: 'bg-yellow-500/20 text-yellow-300',
  },
  {
    id: 6,
    title: 'Aptitude Formula Sheet',
    description: 'Quick reference sheet of all important formulas for quantitative aptitude.',
    category: 'Documents',
    type: 'PDF',
    icon: FileText,
    color: 'from-red-500/20 to-red-600/10',
    border: 'border-red-500/20',
    iconColor: 'text-red-400',
    tag: 'Free',
    tagColor: 'bg-red-500/20 text-red-300',
  },
  {
    id: 7,
    title: 'Python Programming Cheat Sheet',
    description: 'A handy one-pager covering Python syntax, built-ins, and common patterns.',
    category: 'Documents',
    type: 'PDF',
    icon: FileText,
    color: 'from-orange-500/20 to-orange-600/10',
    border: 'border-orange-500/20',
    iconColor: 'text-orange-400',
    tag: 'New',
    tagColor: 'bg-orange-500/20 text-orange-300',
  },
  {
    id: 8,
    title: 'HR Interview Q&A Bank',
    description: '100+ commonly asked HR interview questions with model answers.',
    category: 'Guides',
    type: 'PDF',
    icon: BookOpen,
    color: 'from-pink-500/20 to-pink-600/10',
    border: 'border-pink-500/20',
    iconColor: 'text-pink-400',
    tag: 'Popular',
    tagColor: 'bg-pink-500/20 text-pink-300',
  },
  {
    id: 9,
    title: 'Internship Application Email Templates',
    description: 'Ready-to-use email templates for applying to internships and follow-ups.',
    category: 'Templates',
    type: 'DOCX',
    icon: FileText,
    color: 'from-teal-500/20 to-teal-600/10',
    border: 'border-teal-500/20',
    iconColor: 'text-teal-400',
    tag: 'Free',
    tagColor: 'bg-teal-500/20 text-teal-300',
  },
];

export default function AssetsLibrary() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const { showToast } = useToast();

  const filtered = assets.filter(a => {
    const matchCat = activeCategory === 'All' || a.category === activeCategory;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleDownload = () => {
    showToast('⚙️ We are upgrading this feature. It will be available soon.', {
      type: 'warning',
      duration: 3500,
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#69daff]/10 border border-[#69daff]/20 text-[#69daff] text-xs font-bold uppercase tracking-widest mb-6">
            <Archive size={14} />
            Assets Library
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Free <span className="text-[#69daff]">Learning</span> Resources
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Download templates, guides, cheat sheets, and study material to accelerate your career.
          </p>
        </div>

        {/* Search + Filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#69daff]/40 focus:bg-white/[0.05] transition-all"
            />
          </div>

          {/* Category chips */}
          <div className="flex gap-2 flex-wrap sm:flex-nowrap overflow-x-auto pb-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-[#69daff] text-[#020617] shadow-[0_0_20px_rgba(105,218,255,0.3)]'
                    : 'bg-white/[0.04] text-slate-400 border border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-6 mb-10 text-sm text-slate-500">
          <span><span className="text-white font-bold">{filtered.length}</span> resources found</span>
          <span>•</span>
          <span>All resources are <span className="text-green-400 font-bold">100% Free</span></span>
        </div>

        {/* Asset Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-slate-500">
            <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-semibold text-slate-400">No resources found</p>
            <p className="text-sm mt-1">Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(asset => {
              const Icon = asset.icon;
              return (
                <div
                  key={asset.id}
                  className={`group relative bg-gradient-to-br ${asset.color} border ${asset.border} rounded-2xl p-6 flex flex-col gap-4
                    hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300`}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-black/30 flex items-center justify-center ${asset.iconColor}`}>
                      <Icon size={22} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg ${asset.tagColor}`}>
                        {asset.tag}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg bg-white/5 text-slate-400">
                        {asset.type}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-base leading-snug mb-2">{asset.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{asset.description}</p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                    <span className="text-xs text-slate-500 font-medium">{asset.category}</span>
                    <span className="flex-1"></span>
                    <button
                      onClick={handleDownload}
                      className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition-all
                        bg-white/[0.06] text-white border border-white/10
                        hover:bg-white/10 hover:border-white/20 active:scale-95`}
                    >
                      <Download size={13} />
                      Download
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center p-10 rounded-3xl border border-[#69daff]/10 bg-[#69daff]/[0.03]">
          <h2 className="text-white text-2xl font-black mb-2">More Resources Coming Soon</h2>
          <p className="text-slate-400 text-sm mb-6">
            We are constantly adding new study materials, templates, and guides. Stay tuned!
          </p>
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#69daff] text-[#020617] px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all"
          >
            <ExternalLink size={14} />
            Request a Resource
          </a>
        </div>
      </div>
    </div>
  );
}
