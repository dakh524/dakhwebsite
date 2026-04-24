import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../assets/brand_logo.png';
import { useToast } from './ToastProvider';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

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

  // Close on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Hidden on admin routes
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const handleComingSoon = () => {
    showToast('⚙️ We are upgrading this feature. It will be available soon.', {
      type: 'warning',
      duration: 3500,
    });
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    {
      name: 'Learn',
      dropdown: [
        { name: 'Courses', path: '/courses' },
        { name: 'Fun Zone', path: '/funzone' },
      ],
    },
    {
      name: 'Career',
      dropdown: [
        { name: 'Internships', path: '/internships' },
        { name: 'Placement Zone', path: '/placement-zone' },
      ],
    },
    {
      name: 'Services',
      dropdown: [
        { name: 'All Services', path: '/services' },
        { name: 'Assets Library', path: '/assets-library' },
        { name: 'Useful Tools', path: '/useful-tools' },
      ],
    },
    { name: 'About', path: '/about' },
  ];

  const toggleMobileDropdown = (name) => {
    setMobileDropdownOpen(mobileDropdownOpen === name ? '' : name);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setMobileDropdownOpen('');
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] bg-[#020617] backdrop-blur-md shadow-2xl shadow-black/80 border-b border-white/[0.02] no-print">
        <div className="flex justify-between items-center px-6 md:px-8 py-3.5 md:py-4 max-w-7xl mx-auto">
          <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-1 md:gap-2 transition-transform active:scale-95 shrink-0">
            <img src={logo} alt="DAKH" className="w-10 h-10 md:w-16 md:h-16 object-cover mix-blend-screen -ml-2" />
            <div className="flex items-center whitespace-nowrap">
              <span className="text-sm md:text-xl font-bold text-white uppercase tracking-tighter">DAKH</span>
              <span className="text-sm md:text-xl font-medium text-[#69daff] uppercase tracking-tighter ml-1 md:ml-2">EDU</span>
              <span className="hidden xs:inline text-sm md:text-xl font-medium text-[#69daff] uppercase tracking-tighter ml-1">SOLUTIONS</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.name} className="relative group">
                  <button
                    className={`text-[11px] font-black tracking-widest uppercase transition-all py-1 flex items-center gap-1 ${
                      link.dropdown.some((item) => item.path && location.pathname === item.path)
                        ? 'text-primary'
                        : 'text-slate-400 hover:text-white group-hover:text-white'
                    }`}
                  >
                    {link.name}
                    <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                  <div className="absolute left-0 mt-4 w-56 bg-[#0a0e14]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 overflow-hidden z-50">
                    <div className="p-2 space-y-1">
                      {link.dropdown.map((subItem) =>
                        subItem.action ? (
                          <button
                            key={subItem.name}
                            onClick={subItem.action}
                            className="w-full text-left block px-4 py-3 text-xs font-bold rounded-xl transition-all text-slate-300 hover:text-white hover:bg-white/5 hover:translate-x-1"
                          >
                            {subItem.name}
                          </button>
                        ) : (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            className={`block px-4 py-3 text-xs font-bold rounded-xl transition-all ${
                              location.pathname === subItem.path
                                ? 'text-primary bg-primary/10'
                                : 'text-slate-300 hover:text-white hover:bg-white/5 hover:translate-x-1'
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                  {/* Invisible spacer to prevent hover loss */}
                  <div className="absolute top-full left-0 w-full h-4"></div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[11px] font-black tracking-widest uppercase transition-all relative py-1 ${
                    location.pathname === link.path ? 'text-primary' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary animate-in fade-in slide-in-from-left-2 duration-300 shadow-[0_0_8px_var(--primary)]"></span>
                  )}
                </Link>
              )
            )}
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={() => navigate('/admin-login')}
              className="hidden sm:block text-[10px] font-black text-slate-500 hover:text-white transition-colors uppercase tracking-[0.2em]"
            >
              Portal
            </button>
            <button
              onClick={() => navigate('/opportunities')}
              className="hidden sm:block bg-white text-black px-6 md:px-8 py-2.5 md:py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl btn-vibrate"
            >
              DIVE IN
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-4 -mr-2 text-white hover:bg-white/5 rounded-lg transition-colors relative z-[110]"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
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
        <div className="pt-28 p-8 space-y-8 h-full flex flex-col relative overflow-y-auto custom-scrollbar">
          {/* Decorative background flare */}
          <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="space-y-2 relative z-10">
            {navLinks.map((link, idx) => (
              <div
                key={link.name}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${idx * 50}ms` : '0ms',
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                  transition: 'all 0.4s ease-out',
                }}
              >
                {link.dropdown ? (
                  <div className="py-2">
                    <button
                      onClick={() => toggleMobileDropdown(link.name)}
                      className="w-full flex items-center justify-between text-3xl sm:text-4xl font-black tracking-tightest transition-colors text-white hover:text-primary"
                    >
                      {link.name}
                      <ChevronDown
                        size={28}
                        className={`transition-transform duration-300 ${mobileDropdownOpen === link.name ? 'rotate-180 text-primary' : ''}`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        mobileDropdownOpen === link.name ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                      }`}
                    >
                      <div className="flex flex-col gap-4 pl-4 border-l-2 border-white/10 ml-2">
                        {link.dropdown.map((subItem) =>
                          subItem.action ? (
                            <button
                              key={subItem.name}
                              onClick={subItem.action}
                              className="text-left text-xl sm:text-2xl font-bold transition-colors text-slate-400 hover:text-white"
                            >
                              {subItem.name}
                            </button>
                          ) : (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              onClick={closeMobileMenu}
                              className={`text-xl sm:text-2xl font-bold transition-colors ${
                                location.pathname === subItem.path ? 'text-primary' : 'text-slate-400 hover:text-white'
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-2">
                    <Link
                      to={link.path}
                      onClick={closeMobileMenu}
                      className={`block text-3xl sm:text-4xl font-black tracking-tightest transition-colors ${
                        location.pathname === link.path ? 'text-primary' : 'text-white hover:text-primary'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-auto space-y-3 pb-8 relative z-10 border-t border-white/5 pt-8">
            <button
              onClick={() => { navigate('/opportunities'); closeMobileMenu(); }}
              className="w-full bg-primary text-[#004050] py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-[0_20px_40px_rgba(105,218,255,0.2)] btn-vibrate"
            >
              DIVE IN
            </button>
            <button
              onClick={() => { navigate('/admin-login'); closeMobileMenu(); }}
              className="w-full bg-white/5 text-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px] border border-white/10 backdrop-blur-xl"
            >
              Authorized Personnel Only
            </button>
          </div>
        </div>
      </div>

    </>
  );
}

