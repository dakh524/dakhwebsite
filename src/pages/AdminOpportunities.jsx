import React, { useEffect, useState } from 'react';
import { supabase } from "../lib/supabase";
import { Plus, Edit, Trash, Eye, EyeOff } from 'lucide-react';

export default function AdminOpportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', icon: '', color: 'primary', apply_link: '', is_active: true, special: false });
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    const { data } = await supabase.from('opportunities').select('*').order('id', { ascending: true });
    if (data) setOpportunities(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (editingId) {
      const { error } = await supabase.from('opportunities').update(formData).eq('id', editingId);
      if (!error) {
        setEditingId(null);
        setFormData({ title: '', description: '', icon: '', color: 'primary', apply_link: '', is_active: true, special: false });
        fetchOpportunities();
      }
    } else {
      const { error } = await supabase.from('opportunities').insert([formData]);
      if (!error) {
        setFormData({ title: '', description: '', icon: '', color: 'primary', apply_link: '', is_active: true, special: false });
        fetchOpportunities();
      }
    }
    setIsSubmitting(false);
  };

  const startEdit = (opp) => {
    setEditingId(opp.id);
    setFormData(opp);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleActive = async (id, currentStatus) => {
    await supabase.from('opportunities').update({ is_active: !currentStatus }).eq('id', id);
    fetchOpportunities();
  };

  return (
    <div className="max-w-5xl">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-black text-white">Manage Opportunities</h1>
      </div>

      <form onSubmit={handleSubmit} className="saas-card p-10 space-y-6 mb-16">
        <h3 className="text-xl font-bold">{editingId ? 'Edit Opportunity' : 'Create New Opportunity Card'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input className="bg-[#0a0e14] border border-white/5 rounded-xl px-5 py-3" placeholder="Title (e.g. Campus Ambassador)" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          <input className="bg-[#0a0e14] border border-white/5 rounded-xl px-5 py-3" placeholder="Material Icon Name" required value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} />
        </div>
        <textarea className="w-full bg-[#0a0e14] border border-white/5 rounded-xl px-5 py-3" rows={3} placeholder="Description" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <select className="bg-[#0a0e14] border border-white/5 rounded-xl px-5 py-3" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})}>
            <option value="primary">Cyan (Primary)</option>
            <option value="secondary">Purple (Secondary)</option>
            <option value="tertiary">Pink (Tertiary)</option>
            <option value="outline">White (Outline)</option>
          </select>
          <input className="bg-[#0a0e14] border border-white/5 rounded-xl px-5 py-3" placeholder="Specific Application Link (Optional)" value={formData.apply_link} onChange={e => setFormData({...formData, apply_link: e.target.value})} />
          <div className="flex items-center gap-4 px-4">
             <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
               <input type="checkbox" checked={formData.special} onChange={e => setFormData({...formData, special: e.target.checked})} className="accent-green-500 w-4 h-4" />
               WhatsApp Style
             </label>
          </div>
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-[#004050] font-black py-4 rounded-xl hover:shadow-2xl transition-all">
          {isSubmitting ? 'Syncing...' : (editingId ? 'Update Role Card' : 'Add Role Card')}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {opportunities.map(opp => (
          <div key={opp.id} className={`saas-card p-8 flex flex-col justify-between ${!opp.is_active ? 'opacity-40' : ''}`}>
            <div>
              <div className="flex justify-between items-start mb-6">
                 <div className={`w-12 h-12 rounded-xl bg-${opp.color}/10 flex items-center justify-center border border-${opp.color}/20`}>
                   <span className="material-symbols-outlined">{opp.icon}</span>
                 </div>
                 <button onClick={() => toggleActive(opp.id, opp.is_active)} className="text-slate-500 hover:text-white">
                   {opp.is_active ? <Eye size={18} /> : <EyeOff size={18} />}
                 </button>
              </div>
              <h4 className="text-xl font-bold mb-2">{opp.title}</h4>
              <p className="text-xs text-slate-500 line-clamp-2 mb-4">{opp.description}</p>
            </div>
            <div className="flex gap-4 mt-6">
              <button onClick={() => startEdit(opp)} className="flex-1 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase hover:bg-white/10 transition-all">Edit</button>
              {opp.special && <span className="text-[8px] font-black text-green-500 uppercase flex items-center">WA Protocol Active</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 border border-dashed border-white/10 rounded-3xl bg-white/2">
        <h4 className="text-xs font-black uppercase text-slate-500 mb-4">Database Requirement</h4>
        <p className="text-[10px] text-slate-600 leading-relaxed font-mono">
          Table: 'opportunities' <br/>
          Columns: title (text), description (text), icon (text), color (text), apply_link (text), special (boolean), is_active (boolean)
        </p>
      </div>
    </div>
  );
}
