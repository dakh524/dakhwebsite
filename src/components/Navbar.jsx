import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hidden on admin routes
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0a0e14]/60 backdrop-blur-2xl border-b border-white/5">
      <div className="flex justify-between items-center px-8 py-5 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
             <div className="w-4 h-4 rounded-sm bg-primary shadow-[0_0_15px_rgba(105,218,255,1)]"></div>
          </div>
          DAKH<span className="text-primary">EDU</span>
        </Link>
        <div className="hidden lg:flex items-center gap-10">
          <Link to="/" className={`text-[13px] font-bold tracking-widest uppercase transition-all ${location.pathname === '/' ? 'text-primary' : 'text-slate-400 hover:text-white'}`}>Home</Link>
          <Link to="/courses" className={`text-[13px] font-bold tracking-widest uppercase transition-all ${location.pathname === '/courses' ? 'text-primary' : 'text-slate-400 hover:text-white'}`}>Courses</Link>
          <Link to="/internships" className={`text-[13px] font-bold tracking-widest uppercase transition-all ${location.pathname === '/internships' ? 'text-primary' : 'text-slate-400 hover:text-white'}`}>Internships</Link>
          <Link to="/services" className={`text-[13px] font-bold tracking-widest uppercase transition-all ${location.pathname.startsWith('/services') ? 'text-primary' : 'text-slate-400 hover:text-white'}`}>Services</Link>
          <Link to="/about" className={`text-[13px] font-bold tracking-widest uppercase transition-all ${location.pathname === '/about' ? 'text-primary' : 'text-slate-400 hover:text-white'}`}>About Team</Link>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin-login')} className="text-xs font-black text-slate-500 hover:text-white transition-colors uppercase tracking-[0.2em]">Portal</button>
          <button onClick={() => navigate('/internships')} className="bg-white text-black px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
