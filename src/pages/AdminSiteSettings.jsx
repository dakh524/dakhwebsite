import React, { useEffect, useState } from 'react';
import { supabase } from "../lib/supabase";
import { Save, Globe, Phone, Mail, MapPin, Link as LinkIcon } from 'lucide-react';

export default function AdminSiteSettings() {
  const [settings, setSettings] = useState({
    default_apply_link: '',
    whatsapp_link: '',
    contact_email: '',
    contact_phone: '',
    address: '',
    site_title: 'DAKH EDU SOLUTIONS'
  });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (data) {
        setSettings(data);
      } else if (error && error.code === 'PGRST116') {
        // Table exists but no data, we'll allow saving to create first record
        console.log("No settings found, ready to initialize.");
      } else {
        console.error("Settings fetch error:", error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      // Try to update the first record, if it fails, insert it
      const { data: existing } = await supabase.from('site_settings').select('id').limit(1).single();

      let error;
      if (existing) {
        const { error: updateError } = await supabase
          .from('site_settings')
          .update(settings)
          .eq('id', existing.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('site_settings')
          .insert([settings]);
        error = insertError;
      }

      if (error) {
        setMessage({ type: 'error', text: 'Operation failed: ' + error.message });
      } else {
        setMessage({ type: 'success', text: 'Site architecture values updated successfully.' });
        fetchSettings();
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Error: ' + err.message });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="py-20 text-center text-primary animate-pulse font-bold">LOADING SITE ARCHITECTURE...</div>;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-2">Site Settings</h1>
          <p className="text-slate-500 font-medium">Configure global dimensional constants and external link protocols.</p>
        </div>
      </div>

      {message.text && (
        <div className={`mb-8 p-4 rounded-2xl border ${message.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-red-500/10 border-red-500/30 text-red-500'} text-xs font-bold uppercase tracking-widest`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Apply Links */}
          <div className="saas-card p-8 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-[#00D1FF] flex items-center gap-2">
              <LinkIcon size={16} /> Connection Nodes
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-600">Global Google Form (Apply Now)</label>
                <input 
                  type="url" 
                  value={settings.default_apply_link}
                  onChange={(e) => setSettings({...settings, default_apply_link: e.target.value})}
                  className="w-full bg-[#0a0e14] border border-white/5 focus:border-primary/50 rounded-xl px-5 py-3 text-white outline-none transition-all placeholder:text-slate-800"
                  placeholder="https://forms.gle/..."
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-600">WhatsApp Community Link</label>
                <input 
                  type="url" 
                  value={settings.whatsapp_link}
                  onChange={(e) => setSettings({...settings, whatsapp_link: e.target.value})}
                  className="w-full bg-[#0a0e14] border border-white/5 focus:border-primary/50 rounded-xl px-5 py-3 text-white outline-none transition-all placeholder:text-slate-800"
                  placeholder="https://chat.whatsapp.com/..."
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="saas-card p-8 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-[#b884ff] flex items-center gap-2">
              <Phone size={16} /> Signal Credentials
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-600">Contact Email</label>
                <input 
                  type="email" 
                  value={settings.contact_email}
                  onChange={(e) => setSettings({...settings, contact_email: e.target.value})}
                  className="w-full bg-[#0a0e14] border border-white/5 focus:border-primary/50 rounded-xl px-5 py-3 text-white outline-none transition-all placeholder:text-slate-800"
                  placeholder="contact@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-600">Contact Phone (+91 ...)</label>
                <input 
                  type="text" 
                  value={settings.contact_phone}
                  onChange={(e) => setSettings({...settings, contact_phone: e.target.value})}
                  className="w-full bg-[#0a0e14] border border-white/5 focus:border-primary/50 rounded-xl px-5 py-3 text-white outline-none transition-all placeholder:text-slate-800"
                  placeholder="+91 00000 00000"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Branding & Location */}
        <div className="saas-card p-8 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
            <Globe size={16} /> Static Identity
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-600">Base Station (Address)</label>
              <textarea 
                rows={3}
                value={settings.address}
                onChange={(e) => setSettings({...settings, address: e.target.value})}
                className="w-full bg-[#0a0e14] border border-white/5 focus:border-primary/50 rounded-xl px-5 py-3 text-white outline-none transition-all placeholder:text-slate-800 resize-none"
                placeholder="HQ Coordination, City, State"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-600">Organization Title</label>
              <input 
                type="text" 
                value={settings.site_title}
                onChange={(e) => setSettings({...settings, site_title: e.target.value})}
                className="w-full bg-[#0a0e14] border border-white/5 focus:border-primary/50 rounded-xl px-5 py-3 text-white outline-none transition-all placeholder:text-slate-800"
                placeholder="DAKH EDU SOLUTIONS"
              />
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSaving}
          className="w-full bg-gradient-to-r from-primary to-primary-container text-[#004050] font-black uppercase tracking-widest py-6 rounded-2xl shadow-xl hover:shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {isSaving ? "Synchronizing..." : (
            <>
              Update Site Constants
              <Save size={18} />
            </>
          )}
        </button>
      </form>

      <div className="mt-12 p-8 border border-dashed border-white/10 rounded-3xl bg-white/2">
        <h4 className="text-xs font-black uppercase text-slate-500 mb-4">Database Requirement</h4>
        <p className="text-[10px] text-slate-600 leading-relaxed font-mono">
          Ensure you have a 'site_settings' table with: <br/>
          default_apply_link (text), whatsapp_link (text), contact_email (text), contact_phone (text), address (text), site_title (text)
        </p>
      </div>
    </div>
  );
}
