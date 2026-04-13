import React, { useState } from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, BookOpen, Briefcase, Settings, Wrench, 
  LogOut, Calendar, Users, Share2, Eye, Menu, X 
} from 'lucide-react';
import logo from '../assets/logo.png';

export default function AdminLayout() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Events', path: '/admin/events', icon: Calendar },
    { name: 'Manage Courses', path: '/admin/courses', icon: BookOpen },
    { name: 'Manage Internships', path: '/admin/internships', icon: Briefcase },
    { name: 'Manage Services', path: '/admin/services', icon: Settings },
    { name: 'Manage Tools', path: '/admin/tools', icon: Wrench },
    { name: 'Manage Team', path: '/admin/team', icon: Users },
    { name: 'Manage Partners', path: '/admin/partners', icon: Share2 },
    { name: 'Manage Works', path: '/admin/works', icon: Eye },
    { name: 'Manage Growth', path: '/admin/opportunities', icon: Share2 },
    { name: 'Site Constants', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[#0a0e14] text-white font-['Outfit',sans-serif]">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-6 left-6 z-[60]">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-3 bg-primary text-[#004050] rounded-xl shadow-lg"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      <div 
        className={`fixed inset-0 bg-[#0a0e14]/80 backdrop-blur-md z-[50] transition-opacity duration-300 lg:hidden ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 w-72 bg-[#0a0e14] border-r border-white/5 flex flex-col z-[55] transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-8">
          <Link to="/" className="text-xl font-black tracking-tighter text-white flex items-center gap-3">
            <img src={logo} alt="DAKH Logo" className="w-5 h-5 object-contain" />
            DAKH<span className="text-primary italic">ADMIN</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-4 px-6 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  isActive 
                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_20px_rgba(105,218,255,0.05)]' 
                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-primary' : 'text-slate-500'} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-500/70 hover:text-red-500 hover:bg-red-500/5 transition-all"
          >
            <LogOut size={16} />
            Termination
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 lg:p-16 max-w-full overflow-x-hidden pt-24 lg:pt-16">
        <Outlet />
      </main>
    </div>
  );
}
