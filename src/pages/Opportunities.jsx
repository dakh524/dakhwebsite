import React from 'react';
import { supabase } from '../lib/supabase';
import Footer from '../components/Footer';

export default function Opportunities() {
  const [siteSettings, setSiteSettings] = React.useState(null);
  const [opportunities, setOpportunities] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const { data: settings } = await supabase.from('site_settings').select('*').single();
      if (settings) setSiteSettings(settings);

      const { data: opps } = await supabase.from('opportunities').select('*').eq('is_active', true).order('id', { ascending: true });
      if (opps && opps.length > 0) setOpportunities(opps);
    };
    fetchData();
  }, []);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    details: '',
    other: ''
  });

  const handleApply = (role) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const handleWhatsApp = () => {
    window.open(siteSettings?.whatsapp_link || 'https://chat.whatsapp.com/LkKyo7np9oVJXo8LhtrzQA', '_blank');
  };

  const submitApplication = (e) => {
    e.preventDefault();
    const message = `Application for ${selectedRole}\n\n` +
                    `Name: ${formData.name}\n` +
                    `Email: ${formData.email}\n` +
                    `College/Working Details: ${formData.details}\n` +
                    `Other Details: ${formData.other}\n\n` +
                    `He is applied for this and his details are above. Kindly contact me asap.`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918667399640?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsModalOpen(false);
    setFormData({ name: '', email: '', details: '', other: '' });
  };

  const currentOpportunities = opportunities.length > 0 ? opportunities : [
    { title: 'Campus Ambassador', desc: 'Lead your college community, organize technical summits, and master executive leadership.', icon: 'campaign', color: 'primary', label: 'Apply Protocol' },
    { title: 'Developer / Creator', desc: 'Architect real-world applications and expand your technical neural network with live projects.', icon: 'terminal', color: 'secondary', label: 'Initiate Build' },
    { title: 'Marketing Partner', desc: 'Promote our ecosystem via WhatsApp and scale our mission while earning performance rewards.', icon: 'share', color: 'green-500', label: 'Join Network', special: true },
    { title: 'Freelancer', desc: 'Deploy your expertise remotely on mission-specific tasks and earn dimensional rewards.', icon: 'work_history', color: 'tertiary', label: 'Secure Task' }
  ];

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
          {currentOpportunities.map((opp, index) => (
            <div 
              key={opp.id || index}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className={`glass-panel p-10 rounded-[2.5rem] flex flex-col group hover-tilt glow-border ${opp.special ? 'border-l-4 border-l-green-500' : ''}`}
            >
              <div className={`w-14 h-14 bg-${opp.color === 'green-500' ? 'green-500' : opp.color}/10 rounded-2xl flex items-center justify-center mb-8 border border-${opp.color === 'green-500' ? 'green-500' : opp.color}/20`}>
                <span className={`material-symbols-outlined text-${opp.color === 'green-500' ? 'green-500' : opp.color} text-3xl`}>{opp.icon}</span>
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">{opp.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-10 flex-grow">
                {opp.desc || opp.description}
              </p>
              <button 
                onClick={() => opp.special ? handleWhatsApp() : handleApply(opp.title)}
                className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all btn-vibrate ${
                  opp.special 
                    ? 'bg-green-500 text-black shadow-[0_10px_30px_rgba(34,197,94,0.3)] hover:scale-105 active:scale-95' 
                    : `bg-white/5 border border-white/10 text-white hover:bg-${opp.color === 'green-500' ? 'green-500' : opp.color} hover:text-${opp.color === 'primary' ? '[#004050]' : 'white'} hover:border-${opp.color === 'green-500' ? 'green-500' : opp.color}`
                }`}
              >
                {opp.label || (opp.special ? 'Join Network' : 'Apply Now')}
              </button>
            </div>
          ))}
        </div>

        {/* Application Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
            <div className="relative glass-panel w-full max-w-lg p-10 rounded-[3rem] border-white/10 animate-in fade-in zoom-in duration-300">
              <div className="mb-8 text-center">
                <h3 className="text-3xl font-black mb-2 tracking-tight">Apply for {selectedRole}</h3>
                <p className="text-slate-400 text-sm font-medium">Please provide your coordinates below.</p>
              </div>
              <form onSubmit={submitApplication} className="space-y-4">
                <input 
                  required type="text" placeholder="Full Name" 
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary transition-colors"
                />
                <input 
                  required type="email" placeholder="Email Address" 
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary transition-colors"
                />
                <input 
                  required type="text" placeholder="College / Working Details" 
                  value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary transition-colors"
                />
                <textarea 
                  placeholder="Other Details (Experience, Skills, Portfolio...)" 
                  value={formData.other} onChange={e => setFormData({...formData, other: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary transition-colors h-32 resize-none"
                />
                <div className="flex gap-4 pt-4">
                  <button 
                    type="button" onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 rounded-xl border border-white/10 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] py-4 rounded-xl bg-primary text-[#004050] font-black uppercase tracking-widest text-[10px] shadow-[0_10px_30px_rgba(105,218,255,0.3)] hover:scale-105 active:scale-95 transition-all btn-vibrate"
                  >
                    Confirm & Contact
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <section className="text-center py-20 border-t border-white/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none"></div>
          <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tightest leading-tight">
            Start Your Dimensional <br /> <span className="text-gradient">Journey Today.</span>
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-6 relative z-10">
            <button 
              onClick={() => handleApply('Dimensional Journey')}
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
      <Footer />
    </>
  );
}
