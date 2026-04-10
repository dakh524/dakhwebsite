import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ChevronRight } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    const result = await login(email, password);
    if (result.success) {
      navigate('/admin');
    } else {
      setMessage(result.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0e14] relative overflow-hidden">
      {/* 3D Particle Background Simulation placeholders */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#69daff]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#b884ff]/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8">
        <div className="backdrop-blur-xl border border-white/10 bg-[#151a21]/80 rounded-[32px] p-10 shadow-2xl overflow-hidden relative">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00cffc]/20 rounded-full blur-[60px]"></div>
          
          <div className="text-center mb-10 relative z-10">
            <h1 className="text-[#00D1FF] text-2xl font-black tracking-tighter mb-2">DAKH EDU SOLUTIONS</h1>
            <p className="text-slate-400 text-sm font-medium tracking-widest uppercase">Admin Operations</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Admin Email"
                  className="w-full bg-[#0f141a] border border-white/5 focus:border-[#69daff]/50 focus:ring-1 focus:ring-[#69daff]/50 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 transition-all outline-none"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Security Key"
                  className="w-full bg-[#0f141a] border border-white/5 focus:border-[#69daff]/50 focus:ring-1 focus:ring-[#69daff]/50 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 transition-all outline-none"
                  required
                />
              </div>
            </div>

            {message && (
              <div className="bg-[#ff716c]/10 text-[#ff716c] text-sm py-3 px-4 rounded-xl border border-[#ff716c]/20">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full group bg-gradient-to-r from-[#69daff] to-[#00cffc] text-[#004050] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,209,255,0.3)] transition-all active:scale-[0.98] disabled:opacity-75 disabled:pointer-events-none"
            >
              {isLoading ? 'Authenticating...' : 'Initiate Sequence'}
              {!isLoading && <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
