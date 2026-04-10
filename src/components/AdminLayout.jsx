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
    <div className="flex min-h-screen bg-[#0a0e14] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#151a21]/50 backdrop-blur-xl border-r border-white/5 flex flex-col relative z-20">
        <div className="p-6">
          <Link to="/" className="text-xl font-black tracking-tighter text-[#00D1FF]">
            DAKH EDU SOLUTIONS<span className="text-[#b884ff] text-sm ml-2">ADMIN</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-[#69daff]/10 text-[#69daff] font-bold border border-[#69daff]/20' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-[#ff716c]/10 hover:text-[#ff716c] transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-bold">Logout</span>
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
