import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [targetDatetime, setTargetDatetime] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("id", { ascending: false });
    if (data) setEvents(data);
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // 1. Set all others to inactive
    await supabase
      .from("events")
      .update({ is_active: false })
      .not("id", "is", null);

    // 2. Insert new active event
    const { error } = await supabase.from("events").insert([{ 
        title, 
        target_datetime: new Date(targetDatetime).toISOString(),
        event_link: eventLink || null,
        is_active: true
    }]);

    if (!error) {
      setTitle("");
      setTargetDatetime("");
      setEventLink("");
      getEvents();
    } else {
      alert("Database error: " + error.message + "\n\nPlease ensure your 'events' table has: title, target_datetime, event_link, is_active.");
    }
    setLoading(false);
  };

  const toggleEventStatus = async (id, currentStatus) => {
    if (!currentStatus) {
      // If we are activating this, deactivate others
      await supabase.from("events").update({ is_active: false }).not("id", "is", null);
    }
    
    const { error } = await supabase
      .from("events")
      .update({ is_active: !currentStatus })
      .eq('id', id);
    
    if (error) alert(error.message);
    else getEvents();
  };

  return (
    <div className="space-y-12">
      <h1 className="text-3xl font-black tracking-tight mb-8">Master <span className="text-[#00D1FF]">Event Protocol</span></h1>
      
      <form onSubmit={handleAddEvent} className="bg-[#151a21]/80 backdrop-blur-md border border-white/10 p-10 rounded-3xl space-y-8 shadow-2xl max-w-4xl">
        <div className="flex items-center gap-3 border-b border-white/5 pb-6">
          <span className="material-symbols-outlined text-[#00D1FF]">shutter_speed</span>
          <h2 className="text-2xl font-bold">Set Next Master Event</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[2px] text-slate-500 ml-1">Event Title</label>
            <input 
              className="w-full bg-[#0f141a] border border-white/5 focus:border-[#00D1FF]/50 rounded-2xl p-4 text-white outline-none transition-all placeholder:text-slate-700" 
              required 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              type="text" 
              placeholder="Masterclass: Building 3D Interfaces" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[2px] text-slate-500 ml-1">Target Date & Time</label>
            <input 
              className="w-full bg-[#0f141a] border border-white/5 focus:border-[#00D1FF]/50 rounded-2xl p-4 text-white outline-none transition-all" 
              required 
              value={targetDatetime} 
              onChange={e => setTargetDatetime(e.target.value)} 
              type="datetime-local" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[2px] text-slate-500 ml-1">Event Link (Optional)</label>
          <input 
            className="w-full bg-[#0f141a] border border-white/5 focus:border-[#00D1FF]/50 rounded-2xl p-4 text-white outline-none transition-all placeholder:text-slate-700" 
            value={eventLink} 
            onChange={e => setEventLink(e.target.value)} 
            type="url" 
            placeholder="https://zoom.us/j/unique-id or YouTube/Meet link" 
          />
        </div>

        <button disabled={loading} type="submit" className="bg-gradient-to-r from-[#00c0ea] to-[#00D1FF] text-[#004050] font-black uppercase tracking-[2px] w-full py-5 rounded-2xl shadow-[0_10px_30px_rgba(0,209,255,0.2)] hover:shadow-[0_15px_40px_rgba(0,209,255,0.3)] transition-all transform active:scale-[0.98] disabled:opacity-50">
          {loading ? "Transmitting Binary Data..." : "Initialize Countdown Timer"}
        </button>
      </form>
      
      <div className="space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-slate-400">history</span>
          Event Registry
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {events.length === 0 ? (
             <p className="text-slate-500 italic p-12 text-center border border-dashed border-white/10 rounded-3xl">Registry empty. No future events scheduled.</p>
          ) : events.map((ev) => (
            <div key={ev.id} className={`p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all ${ev.is_active ? 'bg-[#00D1FF]/5 border-[#00D1FF]/30 shadow-[0_0_40px_rgba(0,209,255,0.05)]' : 'bg-surface-container-lowest border-white/5 opacity-60 hover:opacity-100'}`}>
              <div className="flex items-center gap-4">
                 <div className={`w-3 h-3 rounded-full ${ev.is_active ? 'bg-[#00D1FF] animate-pulse' : 'bg-slate-700'}`}></div>
                 <div>
                    <h3 className="font-bold text-lg text-white leading-none mb-1">{ev.title}</h3>
                    <p className="text-xs text-slate-500 truncate max-w-sm">{ev.event_link || 'No external link provided'}</p>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Target Date</div>
                  <div className="text-sm font-mono text-[#00D1FF]">{new Date(ev.target_datetime).toLocaleString()}</div>
                </div>
                <button 
                  onClick={() => toggleEventStatus(ev.id, ev.is_active)}
                  className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${ev.is_active ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white' : 'bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500 hover:text-white'}`}
                >
                  {ev.is_active ? 'Kill' : 'Live'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
