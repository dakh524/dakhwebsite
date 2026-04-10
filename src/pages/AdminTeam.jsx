import React, { useEffect, useState } from 'react';
import { supabase } from "../lib/supabase";

export default function AdminTeam() {
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({ name: '', role: '', quote: '', image_url: '', is_active: true });
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getMembers();
  }, []);

  const getMembers = async () => {
    const { data, error } = await supabase
      .from("team")
      .select("*")
      .order('id', { ascending: false });

    if (data) {
      setMembers(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (editingId) {
      const { error } = await supabase
        .from("team")
        .update(formData)
        .eq('id', editingId);

      if (error) alert("Error updating: " + error.message);
      else {
        setEditingId(null);
        setFormData({ name: '', role: '', quote: '', image_url: '', is_active: true });
        getMembers();
      }
    } else {
      const { error } = await supabase
        .from("team")
        .insert([formData]);

      if (error) alert("Error adding: " + error.message);
      else {
        setFormData({ name: '', role: '', quote: '', image_url: '', is_active: true });
        getMembers();
      }
    }
    
    setIsSubmitting(false);
  };

  const startEdit = (member) => {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      role: member.role || '',
      quote: member.quote || '',
      image_url: member.image_url || '',
      is_active: member.is_active
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleActive = async (id, currentStatus) => {
    const { error } = await supabase
      .from("team")
      .update({ is_active: !currentStatus })
      .eq('id', id);

    if (error) alert("Error: " + error.message);
    else getMembers();
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-white tracking-tight underline decoration-[#b884ff] decoration-4 underline-offset-8">Manage Team</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#151a21]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl space-y-6 max-w-3xl">
        <h3 className="text-xl font-bold text-white mb-2">{editingId ? "Edit Team Member" : "Add New Member"}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input 
            type="text" 
            placeholder="Full Name" 
            required 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full bg-[#0f141a] border border-white/5 focus:border-[#b884ff]/50 rounded-xl px-5 py-3 text-white outline-none transition-all placeholder:text-slate-600"
          />
          <input 
            type="text" 
            placeholder="Role (e.g. CTO, Lead Designer)" 
            required 
            value={formData.role} 
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            className="w-full bg-[#0f141a] border border-white/5 focus:border-[#b884ff]/50 rounded-xl px-5 py-3 text-white outline-none transition-all placeholder:text-slate-600"
          />
        </div>

        <textarea 
          placeholder="Member Quote / Philosophy" 
          required 
          rows={3}
          value={formData.quote} 
          onChange={(e) => setFormData({...formData, quote: e.target.value})}
          className="w-full bg-[#0f141a] border border-white/5 focus:border-[#b884ff]/50 rounded-xl px-5 py-3 text-white outline-none transition-all resize-none placeholder:text-slate-600"
        />

        <input 
          type="url" 
          placeholder="Profile Image URL" 
          required 
          value={formData.image_url} 
          onChange={(e) => setFormData({...formData, image_url: e.target.value})}
          className="w-full bg-[#0f141a] border border-white/5 focus:border-[#b884ff]/50 rounded-xl px-5 py-3 text-white outline-none transition-all placeholder:text-slate-600"
        />

        <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            id="is_active"
            checked={formData.is_active} 
            onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
            className="w-5 h-5 accent-[#b884ff] bg-[#0f141a] border-white/5 rounded"
          />
          <label htmlFor="is_active" className="text-on-surface-variant font-medium">Show in Frontend (Active)</label>
        </div>

        <div className="flex gap-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-[#b884ff] to-[#ff85e4] text-white font-black py-4 px-8 rounded-xl hover:shadow-[0_0_30px_rgba(184,132,255,0.3)] transition-all disabled:opacity-50 active:scale-95"
          >
            {isSubmitting ? "Deploying..." : (editingId ? "Update Member" : "Add to Team")}
          </button>
          
          {editingId && (
            <button 
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ name: '', role: '', quote: '', image_url: '', is_active: true });
              }}
              className="px-8 py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <div key={member.id} className={`group bg-[#151a21]/80 backdrop-blur-xl border border-white/10 p-0 rounded-3xl shadow-xl overflow-hidden hover:border-[#b884ff]/40 transition-all ${!member.is_active ? 'opacity-50' : ''}`}>
            <div className="relative h-64">
              {member.image_url && <img src={member.image_url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={member.name} />}
              <div className="absolute inset-0 bg-gradient-to-t from-[#151a21] to-transparent"></div>
              <div className="absolute bottom-4 left-6">
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-[#b884ff] text-xs font-black uppercase tracking-widest">{member.role}</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-slate-400 text-sm italic mb-6">"{member.quote}"</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => startEdit(member)}
                  className="flex-1 bg-white/5 border border-white/10 text-white py-2 rounded-lg text-xs font-bold hover:bg-[#b884ff] hover:text-white hover:border-[#b884ff] transition-all"
                >
                  Edit
                </button>
                <button 
                  onClick={() => toggleActive(member.id, member.is_active)}
                  className={`flex-1 border text-xs font-bold py-2 rounded-lg transition-all ${member.is_active ? 'border-orange-500/30 text-orange-500 hover:bg-orange-500 hover:text-white' : 'border-green-500/30 text-green-500 hover:bg-green-500 hover:text-white'}`}
                >
                  {member.is_active ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          </div>
        ))}
        {members.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-500 border border-white/5 rounded-3xl border-dashed">
            The registry is empty. Deploy your core team members.
          </div>
        )}
      </div>
    </div>
  );
}
