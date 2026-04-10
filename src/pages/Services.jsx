import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('id', { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (err) {
      console.error('Error fetching services:', err);
      // Fallback to empty if table doesn't exist yet
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (serviceName) => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
    setStatus('idle');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', message: '' });
        setStatus('idle');
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const { error } = await supabase
        .from('service_inquiries')
        .insert([{
          service_type: selectedService,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        }]);

      if (error) throw error;
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <>
      <main className="pt-32 pb-24 px-6 md:px-8 max-w-7xl mx-auto">
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

        {loading ? (
          <div className="py-20 text-center text-primary animate-pulse font-bold">LOADING GLOBAL SERVICES...</div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} onClick={() => openModal(service.title)} className="glass-card p-10 rounded-xl group cursor-pointer transition-all hover:border-primary/30">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined text-primary text-3xl">{service.icon || 'star'}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-on-surface-variant mb-8 line-clamp-3">{service.description}</p>
                <div className="flex items-center text-primary font-bold text-sm tracking-widest group-hover:gap-3 transition-all duration-300">
                  REQUEST QUOTE <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </div>
              </div>
            ))}
            {services.length === 0 && (
              <div className="col-span-full py-20 text-center text-slate-500 border border-white/5 border-dashed rounded-3xl">
                No active services found in database. Contact admin for initialization.
              </div>
            )}
          </section>
        )}
      </main>

      {/* Inquiry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-background/80 backdrop-blur-2xl">
          <div className="max-w-xl w-full bg-[#151a21]/95 border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative backdrop-blur-xl animate-scale-in">
            <button onClick={closeModal} className="absolute top-6 right-6 text-slate-400 hover:text-white z-10 transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>

            {status === 'success' ? (
              <div className="p-12 text-center animate-fade-in">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(105,218,255,0.2)]">
                  <span className="material-symbols-outlined text-[#00D1FF] text-4xl">check_circle</span>
                </div>
                <h2 className="text-3xl font-black mb-4 tracking-tight">Request Received</h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Thank you for your interest in our {selectedService} services. Our team will contact you shortly to begin the initialization process.
                </p>
                <div className="bg-[#0f141a] p-6 rounded-2xl border border-white/5 mb-8">
                  <p className="text-sm font-bold text-[#00D1FF] tracking-widest uppercase mb-2">Direct Contact</p>
                  <p className="text-2xl font-bold text-white">+91 8667399640</p>
                </div>
                <button onClick={closeModal} className="w-full bg-[#0f141a] border border-white/10 hover:border-white/30 py-4 rounded-xl font-bold transition-all">
                  Close Dashboard
                </button>
              </div>
            ) : (
              <div className="p-10">
                <div className="mb-8">
                  <span className="text-[#00D1FF] font-black tracking-widest uppercase text-xs">New Inquiry</span>
                  <h2 className="text-3xl font-black mt-2 tracking-tight">Request <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{selectedService}</span></h2>
                </div>

                {status === 'error' && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-sm font-medium">
                    Unexpected error during transmission. Please try again.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <input type="text" placeholder="Full Name" required disabled={status === 'submitting'} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="col-span-2 sm:col-span-1 w-full bg-[#0f141a] border border-white/5 focus:border-primary/50 rounded-xl px-5 py-4 text-white outline-none transition-all disabled:opacity-50" />
                    <input type="tel" placeholder="Phone Number" required disabled={status === 'submitting'} value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="col-span-2 sm:col-span-1 w-full bg-[#0f141a] border border-white/5 focus:border-primary/50 rounded-xl px-5 py-4 text-white outline-none transition-all disabled:opacity-50" />
                  </div>
                  <input type="email" placeholder="Email Address" required disabled={status === 'submitting'} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-[#0f141a] border border-white/5 focus:border-primary/50 rounded-xl px-5 py-4 text-white outline-none transition-all disabled:opacity-50" />
                  <textarea placeholder="Describe your project requirements (Optional)" rows={3} disabled={status === 'submitting'} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-[#0f141a] border border-white/5 focus:border-primary/50 rounded-xl px-5 py-4 text-white outline-none resize-none transition-all disabled:opacity-50"></textarea>
                  
                  <button type="submit" disabled={status === 'submitting'} className="w-full group bg-gradient-to-r from-primary to-primary-container text-[#004050] py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,209,255,0.3)] transition-all active:scale-[0.98] mt-4 disabled:opacity-75 disabled:pointer-events-none">
                    {status === 'submitting' ? 'Transmitting Data...' : 'Submit Inquiry'}
                    {status !== 'submitting' && <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">bolt</span>}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full border-t border-white/5 bg-[#0a0e14]">
        <div className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto text-slate-500">
          <div className="col-span-1 md:col-span-2">
            <div className="text-lg font-bold text-white mb-4">DAKH EDU SOLUTIONS</div>
            <p className="text-sm max-w-xs leading-relaxed">
              Redefining education through dimensional intelligence and ethereal laboratory design.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Quick Links</h4>
            <div className="flex flex-col gap-2 font-['Inter'] text-xs">
              <a className="hover:text-primary transition-colors" href="/privacy-policy">Privacy Policy</a>
              <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
              <a className="hover:text-primary transition-colors" href="https://wa.me/918667399640" target="_blank" rel="noopener noreferrer" onClick={(e) => { alert('Contact: dakhedusolution@gmail.com'); }}>Contact Us</a>
            </div>
          </div>
          <div className="flex items-end text-xs">
            © 2024 DAKH EDU SOLUTIONS. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
