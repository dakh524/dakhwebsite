import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hidden on admin routes
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0f141a]/80 backdrop-blur-xl shadow-[0_0_40px_rgba(0,209,255,0.1)] border-b border-white/5">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <Link to="/" className="text-xl font-bold tracking-tighter text-[#00D1FF]">
          DAKH EDU SOLUTIONS
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`font-['Inter'] text-sm font-medium tracking-tight transition-colors ${location.pathname === '/' ? 'text-[#00D1FF] border-b-2 border-[#00D1FF] pb-1' : 'text-slate-400 hover:text-white'}`}>Home</Link>
          <Link to="/courses" className={`font-['Inter'] text-sm font-medium tracking-tight transition-colors ${location.pathname === '/courses' ? 'text-[#00D1FF] border-b-2 border-[#00D1FF] pb-1' : 'text-slate-400 hover:text-white'}`}>Courses</Link>
          <Link to="/internships" className={`font-['Inter'] text-sm font-medium tracking-tight transition-colors ${location.pathname === '/internships' ? 'text-[#00D1FF] border-b-2 border-[#00D1FF] pb-1' : 'text-slate-400 hover:text-white'}`}>Internships</Link>
          <Link to="/services" className={`font-['Inter'] text-sm font-medium tracking-tight transition-colors ${location.pathname.startsWith('/services') ? 'text-[#00D1FF] border-b-2 border-[#00D1FF] pb-1' : 'text-slate-400 hover:text-white'}`}>Services</Link>
          <Link to="/tools" className={`font-['Inter'] text-sm font-medium tracking-tight transition-colors ${location.pathname.startsWith('/tools') ? 'text-[#00D1FF] border-b-2 border-[#00D1FF] pb-1' : 'text-slate-400 hover:text-white'}`}>Tools</Link>
          <Link to="/about" className={`font-['Inter'] text-sm font-medium tracking-tight transition-colors ${location.pathname === '/about' ? 'text-[#00D1FF] border-b-2 border-[#00D1FF] pb-1' : 'text-slate-400 hover:text-white'}`}>About</Link>
        </div>
        <button onClick={() => navigate('/internships')} className="bg-gradient-to-r from-[#69daff] to-[#00cffc] text-[#004050] px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,209,255,0.3)]">
          Get Started
        </button>
      </div>
    </nav>
  );
}
