import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import logo from '../assets/logo.png';

export default function Footer() {
  const [siteSettings, setSiteSettings] = useState(null);

  useEffect(() => {
    const fetchSiteSettings = async () => {
      const { data } = await supabase.from('site_settings').select('*').single();
      if (data) setSiteSettings(data);
    };
    fetchSiteSettings();
  }, []);

  return (
    <footer className="w-full border-t border-white/5 bg-[#0a0e14]">
      <div className="w-full px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <img src={logo} alt="DAKH Logo" className="w-8 h-8 object-contain" />
            <div className="text-lg font-bold text-white uppercase tracking-tighter">DAKH EDU SOLUTIONS</div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs font-medium">
            Forging the architectural backbone of the next web. We don't just teach code; we craft creators.
          </p>
        </div>
        
        <div>
          <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-8">Ecosystem</h4>
          <ul className="space-y-4">
            <li><Link className="text-xs text-slate-400 hover:text-primary transition-colors font-bold" to="/courses">Courses</Link></li>
            <li><Link className="text-xs text-slate-400 hover:text-primary transition-colors font-bold" to="/services">Services</Link></li>
            <li><Link className="text-xs text-slate-400 hover:text-primary transition-colors font-bold" to="/internships">Internships</Link></li>
            <li><Link className="text-xs text-slate-400 hover:text-primary transition-colors font-bold" to="/opportunities">Growth Nodes</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-8">Resources</h4>
          <ul className="space-y-4">
            <li><Link className="text-xs text-slate-400 hover:text-primary transition-colors font-bold" to="/tools">Engineering Suite</Link></li>
            <li><Link className="text-xs text-slate-400 hover:text-primary transition-colors font-bold" to="/useful-tools">Assets Library</Link></li>
            <li><a className="text-xs text-slate-400 hover:text-primary transition-colors font-bold" href="#">Documentation</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-8">Connection</h4>
          <ul className="space-y-4">
            <li><Link className="text-xs text-slate-400 hover:text-primary transition-colors font-bold" to="/privacy-policy">Privacy Policy</Link></li>
            <li>
              <a 
                className="text-xs text-slate-400 hover:text-primary transition-colors font-bold" 
                href={siteSettings?.whatsapp_link || "https://wa.me/918667399640"} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Direct Signal (WhatsApp)
              </a>
            </li>
            <li>
              <a 
                className="text-xs text-slate-400 hover:text-primary transition-colors font-bold" 
                href={`mailto:${siteSettings?.contact_email || 'dakhedusolution@gmail.com'}`}
              >
                Official Channel (Email)
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-8 py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-600">
        <p>© 2024 {siteSettings?.site_title || 'DAKH EDU SOLUTIONS'}. All rights reserved.</p>
        <div className="flex gap-6">
          <span className="material-symbols-outlined text-sm hover:text-white cursor-pointer transition-colors">language</span>
          <span className="material-symbols-outlined text-sm hover:text-white cursor-pointer transition-colors">public</span>
        </div>
      </div>
    </footer>
  );
}
