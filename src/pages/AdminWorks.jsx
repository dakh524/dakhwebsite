import React, { useEffect, useState } from 'react';
import { supabase } from "../lib/supabase";
import ImageUpload from "../components/ImageUpload";

export default function AdminWorks() {
  const [works, setWorks] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', image_url: '', is_active: true });
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getWorks();
  }, []);

  const getWorks = async () => {
    const { data, error } = await supabase
      .from("works")
      .select("*")
      .order('id', { ascending: false });

    if (data) {
      setWorks(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (editingId) {
      const { error } = await supabase
        .from("works")
        .update(formData)
        .eq('id', editingId);

      if (error) alert("Error updating: " + error.message);
      else {
        setEditingId(null);
        setFormData({ title: '', description: '', image_url: '', is_active: true });
        getWorks();
      }
    } else {
      const { error } = await supabase
        .from("works")
        .insert([formData]);

      if (error) alert("Error adding: " + error.message);
      else {
        setFormData({ title: '', description: '', image_url: '', is_active: true });
        getWorks();
      }
    }
    
    setIsSubmitting(false);
  };

  const startEdit = (work) => {
    setEditingId(work.id);
    setFormData({
      title: work.title,
      description: work.description || '',
      image_url: work.image_url || '',
      is_active: work.is_active
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleActive = async (id, currentStatus) => {
    const { error } = await supabase
      .from("works")
      .update({ is_active: !currentStatus })
      .eq('id', id);

    if (error) alert("Error: " + error.message);
    else getWorks();
  };

  const deleteWork = async (id) => {
    if (!confirm("Remove this work from portfolio?")) return;
    const { error } = await supabase.from("works").delete().eq('id', id);
    if (error) alert("Error deleting: " + error.message);
    else getWorks();
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-white tracking-tight underline decoration-primary decoration-4 underline-offset-8">Manage Portfolio (Works)</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#151a21]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl space-y-6 max-w-2xl">
        <h3 className="text-xl font-bold text-white mb-2">{editingId ? "Edit Project" : "Add New Work"}</h3>
        
        <input 
          type="text" 
          placeholder="Project Title" 
          required 
          value={formData.title} 
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="w-full bg-[#0f141a] border border-white/5 focus:border-primary/50 rounded-xl px-5 py-3 text-white outline-none transition-all placeholder:text-slate-600"
        />

        <textarea 
          placeholder="Short description of the work..." 
          required 
          rows={3}
          value={formData.description} 
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="w-full bg-[#0f141a] border border-white/5 focus:border-primary/50 rounded-xl px-5 py-3 text-white outline-none transition-all resize-none placeholder:text-slate-600"
        />

        <ImageUpload
          value={formData.image_url}
          onChange={(url) => setFormData({...formData, image_url: url})}
          placeholder="Featured Image URL"
          required
        />

        <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            id="is_active"
            checked={formData.is_active} 
            onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
            className="w-5 h-5 accent-primary bg-[#0f141a] border-white/5 rounded"
          />
          <label htmlFor="is_active" className="text-on-surface-variant font-medium">Show in Portfolio</label>
        </div>

        <div className="flex gap-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-primary to-primary-container text-[#004050] font-black py-4 px-8 rounded-xl hover:shadow-[0_0_30px_rgba(0,209,255,0.3)] transition-all disabled:opacity-50 active:scale-95"
          >
            {isSubmitting ? "Syncing..." : (editingId ? "Update Portfolio" : "Add to Portfolio")}
          </button>
          
          {editingId && (
            <button 
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ title: '', description: '', image_url: '', is_active: true });
              }}
              className="px-8 py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {works.map((work) => (
          <div key={work.id} className={`group bg-[#151a21]/80 backdrop-blur-xl border border-white/10 p-0 rounded-3xl shadow-xl overflow-hidden hover:border-primary/40 transition-all ${!work.is_active ? 'opacity-50' : ''}`}>
            <div className="relative h-48 overflow-hidden">
               <img src={work.image_url || work.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt={work.title} />
               <div className="absolute inset-0 bg-gradient-to-t from-[#151a21] to-transparent"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2 leading-tight">{work.title}</h3>
              <p className="text-on-surface-variant text-sm line-clamp-3 mb-6">{work.description}</p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => startEdit(work)}
                  className="flex-1 bg-white/5 border border-white/10 text-white py-2 rounded-lg text-xs font-bold hover:bg-primary hover:text-[#004050] hover:border-primary transition-all"
                >
                  Edit
                </button>
                <button 
                  onClick={() => toggleActive(work.id, work.is_active)}
                  className={`flex-1 border text-xs font-bold py-2 rounded-lg transition-all ${work.is_active ? 'border-orange-500/30 text-orange-500 hover:bg-orange-500 hover:text-white' : 'border-green-500/30 text-green-500 hover:bg-green-500 hover:text-white'}`}
                >
                  {work.is_active ? 'Hide' : 'Show'}
                </button>
                <button 
                  onClick={() => deleteWork(work.id)}
                  className="p-2 border border-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
        {works.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-500 border border-white/5 rounded-3xl border-dashed">
            No projects found in portfolio. Start building!
          </div>
        )}
      </div>
    </div>
  );
}
