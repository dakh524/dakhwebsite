import React, { useEffect, useState } from 'react';
import { supabase } from "../lib/supabase";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', icon: '', category: '', image_url: '', is_active: true });
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order('id', { ascending: false });

    if (data) {
      setServices(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (editingId) {
      const { error } = await supabase
        .from("services")
        .update(formData)
        .eq('id', editingId);

      if (error) alert("Error updating: " + error.message);
      else {
        setEditingId(null);
        setFormData({ title: '', description: '', icon: '', category: '', image_url: '', is_active: true });
        getServices();
      }
    } else {
      const { error } = await supabase
        .from("services")
        .insert([formData]);

      if (error) alert("Error adding: " + error.message);
      else {
        setFormData({ title: '', description: '', icon: '', category: '', image_url: '', is_active: true });
        getServices();
      }
    }
    
    setIsSubmitting(false);
  };

  const startEdit = (service) => {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon || '',
      category: service.category || '',
      image_url: service.image_url || '',
      is_active: service.is_active
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleActive = async (id, currentStatus) => {
    const { error } = await supabase
      .from("services")
      .update({ is_active: !currentStatus })
      .eq('id', id);

    if (error) alert("Error: " + error.message);
    else getServices();
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-white tracking-tight underline decoration-secondary decoration-4 underline-offset-8">Manage Services</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#151a21]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl space-y-6 max-w-3xl">
        <h3 className="text-xl font-bold text-white mb-2">{editingId ? "Edit Service" : "Create New Service"}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input 
            type="text" 
            placeholder="Service Title" 
            required 
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full bg-[#0f141a] border border-white/5 focus:border-secondary/50 rounded-xl px-5 py-3 text-white outline-none transition-all"
          />
          <input 
            type="text" 
            placeholder="Category" 
            required 
            value={formData.category} 
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full bg-[#0f141a] border border-white/5 focus:border-secondary/50 rounded-xl px-5 py-3 text-white outline-none transition-all"
          />
        </div>

        <textarea 
          placeholder="Service Description" 
          required 
          rows={4}
          value={formData.description} 
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="w-full bg-[#0f141a] border border-white/5 focus:border-secondary/50 rounded-xl px-5 py-3 text-white outline-none transition-all resize-none"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input 
            type="text" 
            placeholder="Material Icon Name (e.g. language, android, school)" 
            required 
            value={formData.icon} 
            onChange={(e) => setFormData({...formData, icon: e.target.value})}
            className="w-full bg-[#0f141a] border border-white/5 focus:border-secondary/50 rounded-xl px-5 py-3 text-white outline-none transition-all"
          />
          <input 
            type="url" 
            placeholder="Header Image URL (Optional)" 
            value={formData.image_url} 
            onChange={(e) => setFormData({...formData, image_url: e.target.value})}
            className="w-full bg-[#0f141a] border border-white/5 focus:border-secondary/50 rounded-xl px-5 py-3 text-white outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            id="is_active"
            checked={formData.is_active} 
            onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
            className="w-5 h-5 accent-secondary bg-[#0f141a] border-white/5 rounded"
          />
          <label htmlFor="is_active" className="text-on-surface-variant font-medium">Show in Frontend (Active)</label>
        </div>

        <div className="flex gap-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-secondary to-secondary-container text-white font-black py-4 px-8 rounded-xl hover:shadow-[0_0_30px_rgba(184,132,255,0.3)] transition-all disabled:opacity-50 active:scale-95"
          >
            {isSubmitting ? "Saving..." : (editingId ? "Update Service" : "Publish Service")}
          </button>
          
          {editingId && (
            <button 
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ title: '', description: '', icon: '', category: '', image_url: '', is_active: true });
              }}
              className="px-8 py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div key={service.id} className={`group bg-[#151a21]/80 backdrop-blur-xl border border-white/10 p-0 rounded-3xl shadow-xl overflow-hidden hover:border-secondary/40 transition-all ${!service.is_active ? 'opacity-50' : ''}`}>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary text-2xl" data-icon={service.icon}>{service.icon || 'star'}</span>
                </div>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${service.is_active ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                  {service.is_active ? 'Active' : 'Hidden'}
                </span>
              </div>
              <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] mb-2 block">{service.category}</span>
              <h3 className="text-xl font-bold text-white mb-2 leading-tight">{service.title}</h3>
              <p className="text-on-surface-variant text-sm line-clamp-3 mb-8">{service.description}</p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => startEdit(service)}
                  className="flex-1 bg-white/5 border border-white/10 text-white py-2 rounded-lg text-xs font-bold hover:bg-secondary hover:text-white hover:border-secondary transition-all"
                >
                  Edit
                </button>
                <button 
                  onClick={() => toggleActive(service.id, service.is_active)}
                  className={`flex-1 border text-xs font-bold py-2 rounded-lg transition-all ${service.is_active ? 'border-orange-500/30 text-orange-500 hover:bg-orange-500 hover:text-white' : 'border-green-500/30 text-green-500 hover:bg-green-500 hover:text-white'}`}
                >
                  {service.is_active ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          </div>
        ))}
        {services.length === 0 && (
          <div className="col-span-full py-20 text-center text-on-surface-variant border border-white/5 rounded-3xl border-dashed">
            No services found. Add one above!
          </div>
        )}
      </div>
    </div>
  );
}
