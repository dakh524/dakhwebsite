import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/neon_logo.png';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Hidden on admin routes
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Internships', path: '/internships' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] bg-[#020617] backdrop-blur-md shadow-2xl shadow-black/80 border-b border-white/[0.02]">
        <div className="flex justify-between items-center px-6 md:px-8 py-3.5 md:py-4 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-4 transition-transform active:scale-95">
            <img src={logo} alt="DAKH" className="w-8 h-8 md:w-9 md:h-9 object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]" />
            <div className="flex items-center whitespace-nowrap">
              <span className="text-lg md:text-xl font-bold text-white uppercase tracking-tighter">DAKH</span>
              <span className="text-lg md:text-xl font-medium text-[#69daff] uppercase tracking-tighter ml-2">EDU SOLUTIONS</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className={`text-[11px] font-black tracking-widest uppercase transition-all ${
                  location.pathname === link.path ? 'text-primary' : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <button onClick={() => navigate('/admin-login')} className="hidden sm:block text-[10px] font-black text-slate-500 hover:text-white transition-colors uppercase tracking-[0.2em]">Portal</button>
            <button 
              onClick={() => navigate('/opportunities')} 
              className="hidden sm:block bg-white text-black px-6 md:px-8 py-2.5 md:py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl btn-vibrate"
            >
              DIVE IN
            </button>
            
            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/5 rounded-lg transition-colors relative z-[110]"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 z-[105] bg-[#0a0e14] transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-10'
        }`}
      >
        <div className="pt-32 p-10 space-y-10 h-full flex flex-col relative">
          {/* Decorative background flare */}
          <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="space-y-6 relative z-10">
            {navLinks.map((link, idx) => (
              <Link 
                key={link.name}
                to={link.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-5xl font-black tracking-tightest transition-all duration-300 ${
                  location.pathname === link.path ? 'text-primary' : 'text-white'
                }`}
                style={{ 
                  transitionDelay: isMobileMenuOpen ? `${idx * 100}ms` : '0ms',
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)'
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="mt-auto space-y-4 pb-10 relative z-10 border-t border-white/5 pt-10">
            <button 
              onClick={() => { navigate('/opportunities'); setIsMobileMenuOpen(false); }}
              className="w-full bg-primary text-[#004050] py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-[0_20px_40px_rgba(105,218,255,0.2)] btn-vibrate"
            >
              DIVE IN
            </button>
            <button 
              onClick={() => { navigate('/admin-login'); setIsMobileMenuOpen(false); }}
              className="w-full bg-white/5 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-white/10 backdrop-blur-xl"
            >
              Authorized Personnel Only
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
