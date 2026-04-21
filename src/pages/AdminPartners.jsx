import React, { useEffect, useState } from 'react';
import { supabase } from "../lib/supabase";
import ImageUpload from "../components/ImageUpload";

export default function AdminPartners() {
  const [partners, setPartners] = useState([]);
  const [formData, setFormData] = useState({ name: '', logo_url: '', is_active: true });
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getPartners();
  }, []);

  const getPartners = async () => {
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .order('id', { ascending: false });

    if (data) {
      setPartners(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (editingId) {
      const { error } = await supabase
        .from("partners")
        .update(formData)
        .eq('id', editingId);

      if (error) alert("Error updating: " + error.message);
      else {
        setEditingId(null);
        setFormData({ name: '', logo_url: '', is_active: true });
        getPartners();
      }
    } else {
      const { error } = await supabase
        .from("partners")
        .insert([formData]);

      if (error) alert("Error adding: " + error.message);
      else {
        setFormData({ name: '', logo_url: '', is_active: true });
        getPartners();
      }
    }
    
    setIsSubmitting(false);
  };

  const startEdit = (partner) => {
    setEditingId(partner.id);
    setFormData({
      name: partner.name,
      logo_url: partner.logo_url || '',
      is_active: partner.is_active
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleActive = async (id, currentStatus) => {
    const { error } = await supabase
      .from("partners")
      .update({ is_active: !currentStatus })
      .eq('id', id);

    if (error) alert("Error: " + error.message);
    else getPartners();
  };

  const deletePartner = async (id) => {
    if (!confirm("Are you sure you want to remove this partner?")) return;
    const { error } = await supabase.from("partners").delete().eq('id', id);
    if (error) alert("Error deleting: " + error.message);
    else getPartners();
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-white tracking-tight underline decoration-primary decoration-4 underline-offset-8">Manage Partners</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#151a21]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl space-y-6 max-w-2xl">
        <h3 className="text-xl font-bold text-white mb-2">{editingId ? "Edit Partner" : "Add Partner Logo"}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input 
            type="text" 
            placeholder="Partner Name" 
            required 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full bg-[#0f141a] border border-white/5 focus:border-primary/50 rounded-xl px-5 py-3 text-white outline-none transition-all placeholder:text-slate-600"
          />
          <ImageUpload
            value={formData.logo_url}
            onChange={(url) => setFormData({...formData, logo_url: url})}
            placeholder="Logo Image URL"
            required
          />
        </div>

        <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            id="is_active"
            checked={formData.is_active} 
            onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
            className="w-5 h-5 accent-primary bg-[#0f141a] border-white/5 rounded"
          />
          <label htmlFor="is_active" className="text-on-surface-variant font-medium">Show in Frontend</label>
        </div>

        <div className="flex gap-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-primary to-primary-container text-[#004050] font-black py-4 px-8 rounded-xl hover:shadow-[0_0_30px_rgba(0,209,255,0.3)] transition-all disabled:opacity-50 active:scale-95"
          >
            {isSubmitting ? "Processing..." : (editingId ? "Update Partner" : "Add Partner")}
          </button>
          
          {editingId && (
            <button 
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ name: '', logo_url: '', is_active: true });
              }}
              className="px-8 py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {partners.map((partner) => (
          <div key={partner.id} className={`group bg-[#151a21]/80 border border-white/5 p-4 rounded-2xl transition-all relative ${!partner.is_active ? 'opacity-30' : ''}`}>
            <div className="h-16 flex items-center justify-center mb-4">
              <img src={partner.logo_url || partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" />
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-500 truncate">{partner.name}</p>
            </div>
            
            <div className="absolute inset-0 bg-[#0a0e14]/90 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center gap-2 px-2">
              <button 
                onClick={() => startEdit(partner)}
                className="p-2 bg-white/10 rounded-full text-white hover:bg-primary hover:text-[#004050] transition-all"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
              <button 
                onClick={() => toggleActive(partner.id, partner.is_active)}
                className={`p-2 rounded-full transition-all ${partner.is_active ? 'bg-orange-500/20 text-orange-500 hover:bg-orange-500 hover:text-white' : 'bg-green-500/20 text-green-500 hover:bg-green-500 hover:text-white'}`}
              >
                <span className="material-symbols-outlined text-sm">{partner.is_active ? 'visibility_off' : 'visibility'}</span>
              </button>
              <button 
                onClick={() => deletePartner(partner.id)}
                className="p-2 bg-red-500/20 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
              </button>
            </div>
          </div>
        ))}
        {partners.length === 0 && (
          <div className="col-span-full py-10 text-center text-slate-500 border border-dashed border-white/5 rounded-3xl">
            No partner data found.
          </div>
        )}
      </div>
    </div>
  );
}
