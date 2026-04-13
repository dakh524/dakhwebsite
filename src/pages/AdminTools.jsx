import React, { useEffect, useState } from 'react';
import { supabase } from "../lib/supabase";

export default function AdminTools() {
  const [tools, setTools] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', category: '', image_url: '', tool_link: '', is_active: true });
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getTools();
  }, []);

  const getTools = async () => {
    const { data, error } = await supabase
      .from("tools")
      .select("*")
      .order('id', { ascending: false });

    if (data) {
      setTools(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (editingId) {
      const { error } = await supabase
        .from("tools")
        .update(formData)
        .eq('id', editingId);

      if (error) alert("Error updating: " + error.message);
      else {
        setEditingId(null);
        setFormData({ title: '', description: '', category: '', image_url: '', tool_link: '', is_active: true });
        getTools();
      }
    } else {
      const { error } = await supabase
        .from("tools")
        .insert([formData]);

      if (error) alert("Error adding: " + error.message);
      else {
        setFormData({ title: '', description: '', category: '', image_url: '', tool_link: '', is_active: true });
        getTools();
      }
    }
    
    setIsSubmitting(false);
  };

  const startEdit = (tool) => {
    setEditingId(tool.id);
    setFormData({
      title: tool.title,
      description: tool.description,
      category: tool.category || '',
      image_url: tool.image_url || '',
      tool_link: tool.tool_link || '',
      is_active: tool.is_active
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleActive = async (id, currentStatus) => {
    const { error } = await supabase
      .from("tools")
      .update({ is_active: !currentStatus })
      .eq('id', id);

    if (error) alert("Error: " + error.message);
    else getTools();
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-white tracking-tight underline decoration-primary decoration-4 underline-offset-8">Manage Proprietary Tools</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#151a21]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl space-y-6 max-w-3xl">
        <h3 className="text-xl font-bold text-white mb-2">{editingId ? "Edit Tool" : "Release New Tool"}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input 
            type="text" 
            placeholder="Tool Title" 
            required 
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full bg-[#0f141a] border border-white/5 focus:border-primary/50 rounded-xl px-5 py-3 text-white outline-none transition-all"
          />
          <input 
            type="text" 
            placeholder="Category (e.g. Enterprise Suite, Dev Intelligence)" 
            required 
            value={formData.category} 
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full bg-[#0f141a] border border-white/5 focus:border-primary/50 rounded-xl px-5 py-3 text-white outline-none transition-all"
          />
        </div>

        <textarea 
          placeholder="Tool Description" 
          required 
          rows={3}
          value={formData.description} 
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="w-full bg-[#0f141a] border border-white/5 focus:border-primary/50 rounded-xl px-5 py-3 text-white outline-none transition-all resize-none"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input 
            type="url" 
            placeholder="Preview Image URL" 
            required
            value={formData.image_url} 
            onChange={(e) => setFormData({...formData, image_url: e.target.value})}
            className="w-full bg-[#0f141a] border border-white/5 focus:border-primary/50 rounded-xl px-5 py-3 text-white outline-none transition-all"
          />
          <input 
            type="url" 
            placeholder="Active Tool Link / Redirect" 
            required
            value={formData.tool_link} 
            onChange={(e) => setFormData({...formData, tool_link: e.target.value})}
            className="w-full bg-[#0f141a] border border-white/5 focus:border-primary/50 rounded-xl px-5 py-3 text-white outline-none transition-all"
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
          <label htmlFor="is_active" className="text-on-surface-variant font-medium">Show in Frontend (Active)</label>
        </div>

        <div className="flex gap-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-primary to-primary-container text-[#004050] font-black py-4 px-8 rounded-xl hover:shadow-[0_0_30px_rgba(105,218,255,0.3)] transition-all disabled:opacity-50 active:scale-95"
          >
            {isSubmitting ? "Deploying..." : (editingId ? "Update Tool" : "Deploy Tool")}
          </button>
          
          {editingId && (
            <button 
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ title: '', description: '', category: '', image_url: '', tool_link: '', is_active: true });
              }}
              className="px-8 py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <div key={tool.id} className={`group bg-[#151a21]/80 backdrop-blur-xl border border-white/10 p-0 rounded-3xl shadow-xl overflow-hidden hover:border-primary/40 transition-all ${!tool.is_active ? 'opacity-50' : ''}`}>
            {(tool.image_url || tool.image) && <img src={tool.image_url || tool.image} className="w-full h-40 object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={tool.title} />}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{tool.category}</span>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${tool.is_active ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                  {tool.is_active ? 'Active' : 'Hidden'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 leading-tight">{tool.title}</h3>
              <p className="text-on-surface-variant text-sm line-clamp-2 mb-6">{tool.description}</p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => startEdit(tool)}
                  className="flex-1 bg-white/5 border border-white/10 text-white py-2 rounded-lg text-xs font-bold hover:bg-primary hover:text-[#004050] hover:border-primary transition-all"
                >
                  Edit
                </button>
                <button 
                  onClick={() => toggleActive(tool.id, tool.is_active)}
                  className={`flex-1 border text-xs font-bold py-2 rounded-lg transition-all ${tool.is_active ? 'border-orange-500/30 text-orange-500 hover:bg-orange-500 hover:text-white' : 'border-green-500/30 text-green-500 hover:bg-green-500 hover:text-white'}`}
                >
                  {tool.is_active ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          </div>
        ))}
        {tools.length === 0 && (
          <div className="col-span-full py-20 text-center text-on-surface-variant border border-white/5 rounded-3xl border-dashed">
            No proprietary tools in database. Release your first tool above.
          </div>
        )}
      </div>
    </div>
  );
}
