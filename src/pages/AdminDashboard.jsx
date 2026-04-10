import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Briefcase, Settings, Wrench, Users, MessageSquare } from 'lucide-react';

export default function AdminDashboard() {
  const [statsData, setStatsData] = useState({
    courses: 0,
    internships: 0,
    services: 0,
    tools: 0,
    team: 0,
    partners: 0,
    works: 0,
    leads: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [
        { count: coursesCount },
        { count: internshipsCount },
        { count: servicesCount },
        { count: toolsCount },
        { count: teamCount },
        { count: leadsCount }
      ] = await Promise.all([
        supabase.from('courses').select('id', { count: 'exact', head: true }),
        supabase.from('internships').select('id', { count: 'exact', head: true }),
        supabase.from('services').select('id', { count: 'exact', head: true }),
        supabase.from('tools').select('id', { count: 'exact', head: true }),
        supabase.from('team').select('id', { count: 'exact', head: true }),
        supabase.from('partners').select('id', { count: 'exact', head: true }),
        supabase.from('works').select('id', { count: 'exact', head: true }),
        supabase.from('service_inquiries').select('id', { count: 'exact', head: true })
      ]);

      setStatsData({
        courses: coursesCount || 0,
        internships: internshipsCount || 0,
        services: servicesCount || 0,
        tools: toolsCount || 0,
        team: teamCount || 0,
        partners: partnersCount || 0,
        works: worksCount || 0,
        leads: leadsCount || 0
      });
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { name: 'Total Courses', value: statsData.courses, icon: BookOpen, color: 'text-[#00cffc]', bg: 'bg-[#00cffc]/10' },
    { name: 'Internships', value: statsData.internships, icon: Briefcase, color: 'text-[#b884ff]', bg: 'bg-[#b884ff]/10' },
    { name: 'Services', value: statsData.services, icon: Settings, color: 'text-[#ff59e3]', bg: 'bg-[#ff59e3]/10' },
    { name: 'Total Leads', value: statsData.leads, icon: MessageSquare, color: 'text-primary', bg: 'bg-primary/10' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tighter">System Overview</h1>
        <p className="text-slate-400 mt-1">Real-time synchronization with DAKH Control Systems.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="glass-panel p-6 rounded-2xl bg-[#151a21]/80 border border-white/5 backdrop-blur-xl hover:-translate-y-1 transition-transform group">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                {loading && <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>}
              </div>
              <div>
                <h3 className="text-4xl font-black mb-1">{loading ? '...' : stat.value}</h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black">{stat.name}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-3xl bg-[#151a21]/80 border border-white/5 backdrop-blur-xl flex flex-col justify-center items-center text-center py-16">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <Users className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Master Controls</h2>
          <p className="text-slate-400 max-w-xs mb-8">
            You are currently connected to the Antigravity high-speed data stream. All changes are propagated instantly to the landing page.
          </p>
          <div className="flex items-center gap-2 px-4 py-2 border border-green-500/20 bg-green-500/5 rounded-full text-[10px] font-black tracking-widest text-green-500 uppercase">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            System Online
          </div>
        </div>

        <div className="glass-panel p-8 rounded-3xl bg-[#151a21]/80 border border-white/5 backdrop-blur-xl">
          <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">bolt</span>
            Quick Access Flux
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <button onClick={() => navigate('/admin/courses')} className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-4 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all group scale-active">
              <BookOpen className="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors" />
              <span className="text-xs font-black uppercase tracking-widest">Courses</span>
            </button>
            <button onClick={() => navigate('/admin/internships')} className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-4 hover:bg-[#b884ff]/10 hover:text-[#b884ff] hover:border-[#b884ff]/30 transition-all group scale-active">
              <Briefcase className="w-6 h-6 text-slate-400 group-hover:text-[#b884ff] transition-colors" />
              <span className="text-xs font-black uppercase tracking-widest">Internships</span>
            </button>
            <button onClick={() => navigate('/admin/services')} className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-4 hover:bg-[#ff59e3]/10 hover:text-[#ff59e3] hover:border-[#ff59e3]/30 transition-all group scale-active">
              <Settings className="w-6 h-6 text-slate-400 group-hover:text-[#ff59e3] transition-colors" />
              <span className="text-xs font-black uppercase tracking-widest">Services</span>
            </button>
            <button onClick={() => navigate('/admin/tools')} className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-4 hover:bg-[#69daff]/10 hover:text-[#69daff] hover:border-[#69daff]/30 transition-all group scale-active">
              <Wrench className="w-6 h-6 text-slate-400 group-hover:text-[#69daff] transition-colors" />
              <span className="text-xs font-black uppercase tracking-widest">Tools</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
