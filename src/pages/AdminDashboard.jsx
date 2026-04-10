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
    <div className="max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl font-black tracking-tight text-white mb-2 stagger-1">Dashboard Analytics</h1>
        <div className="flex items-center gap-6 stagger-2">
            <p className="text-slate-500 font-medium">Overview of the DAKH EDU ecosystem.</p>
            <div className="h-4 w-px bg-white/10"></div>
            <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-green-500 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Live Node Connected
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className={`saas-card p-8 group stagger-${idx + 1}`}>
              <div className="flex items-center justify-between mb-8">
                <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-[10px] font-black text-slate-600 tracking-tighter uppercase">RT Sync</div>
              </div>
              <div>
                <div className="text-4xl font-black text-white mb-2 tabular-nums">
                  {loading ? (
                    <div className="w-12 h-8 bg-white/5 rounded animate-pulse"></div>
                  ) : stat.value}
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{stat.name}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 saas-card p-10 bg-gradient-to-br from-[#151a21] to-[#0a0e14] stagger-3">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Settings className="w-4 h-4 text-primary" />
              </span>
              Operational Flux
            </h3>
            <button className="text-[10px] font-black tracking-widest text-primary uppercase bg-primary/5 px-4 py-2 rounded-lg border border-primary/10 hover:bg-primary/20 transition-all">View Full Logs</button>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-5 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/5 transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-2 h-10 bg-primary/40 rounded-full group-hover:bg-primary transition-all"></div>
                <div>
                  <h4 className="text-sm font-bold text-white">Registry Updated</h4>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Database Sync Success</p>
                </div>
              </div>
              <span className="text-[10px] font-black text-slate-600 uppercase">2m ago</span>
            </div>
            
            <div className="flex items-center justify-between p-5 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/5 transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-2 h-10 bg-[#b884ff]/40 rounded-full group-hover:bg-[#b884ff] transition-all"></div>
                <div>
                  <h4 className="text-sm font-bold text-white">New Service Inquiry</h4>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Lead Captured from SF Node</p>
                </div>
              </div>
              <span className="text-[10px] font-black text-slate-600 uppercase">14m ago</span>
            </div>
          </div>
        </div>

        <div className="saas-card p-10 bg-primary/5 border-primary/10 flex flex-col justify-center text-center stagger-4">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 relative">
            <Users className="w-10 h-10 text-primary" />
            <div className="absolute inset-0 rounded-full border border-primary animate-ping opacity-20"></div>
          </div>
          <h4 className="text-2xl font-black text-white mb-4">Ethereal Core</h4>
          <p className="text-xs text-slate-400 leading-relaxed mb-10 px-4 font-medium opacity-80">
            You are currently authorized at Level 4. All architectural changes propagate in real-time.
          </p>
          <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-center gap-4">
            <div className="text-center">
                <div className="text-xl font-black text-white">99.9</div>
                <div className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Uptime</div>
            </div>
            <div className="w-px h-8 bg-white/10"></div>
            <div className="text-center">
                <div className="text-xl font-black text-white">12ms</div>
                <div className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Latency</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
