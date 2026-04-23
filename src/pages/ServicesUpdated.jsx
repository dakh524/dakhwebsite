import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function ServicesUpdated() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error, fallback
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = '10-digit phone number required';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Valid email address required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const openModal = (serviceName) => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
    setStatus('idle');
    setErrors({});
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', message: '' });
        setStatus('idle');
        setErrors({});
    }, 300);
  };

  const submitWithRetry = async (data, retry = true) => {
    const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || 'https://api.dakhedu.com/v1/inquiry';
    
    try {
      if (import.meta.env.DEV) console.log('Submitting inquiry:', data);
      
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('API server error');
      
      const result = await response.json();
      if (import.meta.env.DEV) console.log('API Submission successful:', result);
      return true;
    } catch (err) {
      if (import.meta.env.DEV) console.error('API Submission failed:', err);
      if (retry) {
        if (import.meta.env.DEV) console.log('Retrying submission once...');
        return await submitWithRetry(data, false);
      }
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setStatus('submitting');
    
    const submissionData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      service: selectedService,
      message: formData.message
    };

    try {
      // Primary: Send to Webhook
      await submitWithRetry(submissionData);
      
      // Secondary: Backup to Supabase (keeping existing functionality)
      try {
        await supabase
          .from('service_inquiries')
          .insert([{
            service_type: selectedService,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message
          }]);
      } catch (sbErr) {
        if (import.meta.env.DEV) console.warn('Supabase backup failed, but API succeeded:', sbErr);
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' }); // Clear form fields
      setTimeout(() => {
        // Optional redirect or close after 3 seconds
        // closeModal(); 
      }, 3000);

    } catch (err) {
      if (import.meta.env.DEV) console.error('All submission attempts failed:', err);
      
      // Fallback System: Save to localStorage
      try {
        const pending = JSON.parse(localStorage.getItem('pending_inquiries') || '[]');
        pending.push({ ...submissionData, timestamp: new Date().toISOString() });
        localStorage.setItem('pending_inquiries', JSON.stringify(pending));
        setStatus('fallback');
      } catch (localErr) {
        setStatus('error');
      }
    }
  };

  return (
    <>
      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        {/*  Hero Section  */}
        <header className="mb-20 text-center md:text-left">
          <div className="inline-block px-4 py-1 rounded-full border border-primary/20 bg-primary/5 mb-6">
            <span className="text-xs font-bold tracking-widest text-primary uppercase">Empowering Futures</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
            Dimensional <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Services.</span>
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed">
            Unlock high-energy educational solutions designed for the modern startup ecosystem. We provide the tools, expertise, and guidance to scale your potential.
          </p>
        </header>

        {/*  Services Grid  */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div onClick={() => openModal('Web Development')} className="glass-card p-10 rounded-xl group cursor-pointer transition-all hover:border-[#69daff]/30">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-primary text-3xl" data-icon="language">language</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-on-surface">Web Development</h3>
            <p className="text-on-surface-variant mb-8 line-clamp-3">Modern responsive websites for startups, colleges, and businesses. Includes landing pages, portfolio sites, and full web apps.</p>
            <div className="flex items-center text-primary font-bold text-sm group-hover:gap-3 transition-all duration-300">
              LEARN MORE <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </div>
          </div>

          <div onClick={() => openModal('App Development')} className="glass-card p-10 rounded-xl group cursor-pointer transition-all hover:border-[#b884ff]/30">
            <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-8 group-hover:bg-secondary/20 transition-colors">
              <span className="material-symbols-outlined text-secondary text-3xl" data-icon="android">android</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-on-surface">App Development</h3>
            <p className="text-on-surface-variant mb-8 line-clamp-3">Android apps, educational apps, and startup MVPs. We build and publish apps on Play Store.</p>
            <div className="flex items-center text-secondary font-bold text-sm group-hover:gap-3 transition-all duration-300">
              LEARN MORE <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </div>
          </div>

          <div onClick={() => openModal('Internship Programs')} className="glass-card p-10 rounded-xl group cursor-pointer transition-all hover:border-[#ff716c]/30">
            <div className="w-14 h-14 rounded-xl bg-tertiary/10 flex items-center justify-center mb-8 group-hover:bg-tertiary/20 transition-colors">
              <span className="material-symbols-outlined text-tertiary text-3xl" data-icon="school">school</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-on-surface">Internship Programs</h3>
            <p className="text-on-surface-variant mb-8 line-clamp-3">Hands-on internships with real project experience. Students build live applications with our team.</p>
            <div className="flex items-center text-tertiary font-bold text-sm group-hover:gap-3 transition-all duration-300">
              LEARN MORE <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </div>
          </div>

          <div onClick={() => openModal('Course Development')} className="glass-card p-10 rounded-xl group cursor-pointer transition-all hover:border-[#69daff]/30">
            <div className="w-14 h-14 rounded-xl bg-primary-container/10 flex items-center justify-center mb-8 group-hover:bg-primary-container/20 transition-colors">
              <span className="material-symbols-outlined text-primary-container text-3xl" data-icon="menu_book">menu_book</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-on-surface">Course Development</h3>
            <p className="text-on-surface-variant mb-8 line-clamp-3">Skill-based courses in AI, Web Dev, Programming, and more. Includes live training and recorded content.</p>
            <div className="flex items-center text-primary-container font-bold text-sm group-hover:gap-3 transition-all duration-300">
              LEARN MORE <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </div>
          </div>

          <div onClick={() => openModal('Project Development')} className="glass-card p-10 rounded-xl group cursor-pointer transition-all hover:border-white/20">
            <div className="w-14 h-14 rounded-xl bg-outline/10 flex items-center justify-center mb-8 group-hover:bg-outline/20 transition-colors">
              <span className="material-symbols-outlined text-on-surface text-3xl" data-icon="rocket_launch">rocket_launch</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-on-surface">Project Development</h3>
            <p className="text-on-surface-variant mb-8 line-clamp-3">Final year projects, mini projects, and startup ideas. Complete support from idea to execution.</p>
            <div className="flex items-center text-on-surface font-bold text-sm group-hover:gap-3 transition-all duration-300">
              LEARN MORE <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </div>
          </div>

          <div onClick={() => openModal('Digital Services')} className="glass-card p-10 rounded-xl group cursor-pointer transition-all hover:border-[#b884ff]/30">
            <div className="w-14 h-14 rounded-xl bg-secondary-container/10 flex items-center justify-center mb-8 group-hover:bg-secondary-container/20 transition-colors">
              <span className="material-symbols-outlined text-secondary-container text-3xl" data-icon="psychology">psychology</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-on-surface">Digital Services</h3>
            <p className="text-on-surface-variant mb-8 line-clamp-3">Resume building, portfolio creation, and LinkedIn optimization. Student career support services.</p>
            <div className="flex items-center text-secondary-container font-bold text-sm group-hover:gap-3 transition-all duration-300">
              LEARN MORE <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </div>
          </div>
        </section>
      </main>

      {/* Dynamic React Modal for Inquiry */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-background/80 backdrop-blur-2xl">
          <div className="max-w-xl w-full bg-[#151a21]/95 border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative backdrop-blur-xl animate-scale-in">
            <button onClick={closeModal} className="absolute top-6 right-6 text-slate-400 hover:text-white z-10 transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>

            {status === 'success' ? (
              <div className="p-12 text-center animate-fade-in">
                <div className="w-20 h-20 bg-[#69daff]/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(105,218,255,0.2)]">
                  <span className="material-symbols-outlined text-[#00D1FF] text-4xl">check_circle</span>
                </div>
                <h2 className="text-3xl font-black mb-4 tracking-tight">✅ Request submitted successfully!</h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Thank you for your interest in our {selectedService} services. Our team will contact you shortly to begin the initialization process.
                </p>
                <div className="bg-[#0f141a] p-6 rounded-2xl border border-white/5 mb-8">
                  <p className="text-sm font-bold text-[#00D1FF] tracking-widest uppercase mb-2">Direct Contact</p>
                  <p className="text-2xl font-bold text-white">+91 98765 43210</p>
                </div>
                <button onClick={closeModal} className="w-full bg-[#0f141a] border border-white/10 hover:border-white/30 py-4 rounded-xl font-bold transition-all">
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <div className="p-10">
                <div className="mb-8">
                  <span className="text-[#00D1FF] font-black tracking-widest uppercase text-xs">New Inquiry</span>
                  <h2 className="text-3xl font-black mt-2 tracking-tight">Request <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{selectedService}</span></h2>
                </div>

                {status === 'error' && (
                  <div className="mb-6 p-4 bg-[#ff716c]/10 border border-[#ff716c]/30 rounded-xl text-[#ff716c] text-xs font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">warning</span>
                    ⚠️ Server issue. Please try again later.
                  </div>
                )}

                {status === 'fallback' && (
                  <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-500 text-xs font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">cloud_off</span>
                    Saved locally. We'll retry automatically.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="col-span-2 sm:col-span-1 space-y-1">
                      <input type="text" placeholder="Full Name" disabled={status === 'submitting'} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={`w-full bg-[#0f141a] border ${errors.name ? 'border-[#ff716c]/50' : 'border-white/5'} focus:border-[#69daff]/50 rounded-xl px-5 py-4 text-white outline-none transition-all disabled:opacity-50`} />
                      {errors.name && <p className="text-[10px] text-[#ff716c] font-bold ml-1">{errors.name}</p>}
                    </div>
                    <div className="col-span-2 sm:col-span-1 space-y-1">
                      <input type="tel" placeholder="Phone Number" disabled={status === 'submitting'} value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className={`w-full bg-[#0f141a] border ${errors.phone ? 'border-[#ff716c]/50' : 'border-white/5'} focus:border-[#69daff]/50 rounded-xl px-5 py-4 text-white outline-none transition-all disabled:opacity-50`} />
                      {errors.phone && <p className="text-[10px] text-[#ff716c] font-bold ml-1">{errors.phone}</p>}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <input type="email" placeholder="Email Address" disabled={status === 'submitting'} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className={`w-full bg-[#0f141a] border ${errors.email ? 'border-[#ff716c]/50' : 'border-white/5'} focus:border-[#69daff]/50 rounded-xl px-5 py-4 text-white outline-none transition-all disabled:opacity-50`} />
                    {errors.email && <p className="text-[10px] text-[#ff716c] font-bold ml-1">{errors.email}</p>}
                  </div>
                  <textarea placeholder="Describe your project requirements (Optional)" rows={3} disabled={status === 'submitting'} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-[#0f141a] border border-white/5 focus:border-[#69daff]/50 rounded-xl px-5 py-4 text-white outline-none resize-none transition-all disabled:opacity-50"></textarea>
                  
                  <button type="submit" disabled={status === 'submitting'} className="w-full group bg-gradient-to-r from-[#69daff] to-[#00cffc] text-[#004050] py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,209,255,0.3)] transition-all active:scale-[0.98] mt-4 disabled:opacity-75 disabled:pointer-events-none overflow-hidden relative">
                    {status === 'submitting' ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-[#004050]/20 border-t-[#004050] rounded-full animate-spin"></div>
                        <span>Sending request...</span>
                      </div>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">bolt</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/*  Footer  */}
      <footer className="w-full border-t border-white/5 bg-[#0a0e14]">
        <div className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div className="col-span-1 md:col-span-2">
            <div className="text-lg font-bold text-white mb-4">DAKH EDU SOLUTIONS</div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              Redefining education through dimensional intelligence and ethereal laboratory design.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Quick Links</h4>
            <div className="flex flex-col gap-2 font-['Inter'] text-xs text-slate-500">
              <a className="hover:text-[#00D1FF] transition-colors" href="/privacy-policy">Privacy Policy</a>
              <a className="hover:text-[#00D1FF] transition-colors" href="#">Terms of Service</a>
              <a className="hover:text-[#00D1FF] transition-colors" href="https://wa.me/918667399640" target="_blank" rel="noopener noreferrer" onClick={(e) => { alert('Contact: dakhedusolution@gmail.com'); }}>Contact Us</a>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="text-xs text-slate-500">
              © 2024 DAKH EDU SOLUTIONS. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
