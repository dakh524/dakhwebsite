import React from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, BookOpen, Briefcase, Settings, Wrench, LogOut, Calendar, Users, Share2, Eye } from 'lucide-react';

export default function AdminLayout() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Manage Courses', path: '/admin/courses', icon: BookOpen },
    { name: 'Manage Events (Timer)', path: '/admin/events', icon: Calendar },
    { name: 'Manage Internships', path: '/admin/internships', icon: Briefcase },
    { name: 'Manage Services', path: '/admin/services', icon: Settings },
    { name: 'Manage Tools', path: '/admin/tools', icon: Wrench },
    { name: 'Manage Team', path: '/admin/team', icon: Users },
    { name: 'Manage Partners', path: '/admin/partners', icon: Share2 },
    { name: 'Manage Works', path: '/admin/works', icon: Eye },
  ];

  return (
    <div className="flex min-h-screen bg-[#0a0e14] text-white font-['Outfit',sans-serif]">
      {/* Sidebar */}
      <aside className="w-68 bg-[#0a0e14] border-r border-white/5 flex flex-col relative z-20">
        <div className="p-8">
          <Link to="/" className="text-xl font-black tracking-tighter text-white flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary"></div>
            DAKH<span className="text-primary italic">ADMIN</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-4 px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  isActive 
                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_20px_rgba(105,218,255,0.05)]' 
                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-primary' : 'text-slate-500'} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest text-red-500/70 hover:text-red-500 hover:bg-red-500/5 transition-all"
          >
            <LogOut size={18} />
            Termination
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-x-hidden">
        {/* Background flares */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#69daff]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#b884ff]/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10 p-8 max-w-7xl mx-auto min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
