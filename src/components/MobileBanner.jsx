import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'dakh_mobile_banner_dismissed';

export default function MobileBanner() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (dismissed) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      // Small delay so the page can settle first
      const t = setTimeout(() => {
        setMounted(true);
        requestAnimationFrame(() => setVisible(true));
      }, 800);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, '1');
    setTimeout(() => setMounted(false), 400);
  };

  if (!mounted) return null;

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-[9998] px-4 pb-4 flex justify-center pointer-events-none
        transition-all duration-500 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="
        pointer-events-auto
        bg-[#0d1117]/95 backdrop-blur-2xl
        border border-[#69daff]/20
        rounded-2xl shadow-[0_-8px_40px_rgba(0,0,0,0.7)]
        px-5 py-4 flex items-center gap-4
        max-w-sm w-full
      ">
        {/* Icon */}
        <div className="w-10 h-10 shrink-0 rounded-xl bg-[#69daff]/10 flex items-center justify-center text-xl">
          🚀
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-semibold leading-snug">
            Best experience on Desktop
          </p>
          <p className="text-slate-400 text-xs mt-0.5 leading-snug">
            Please switch to Desktop mode for full features.
          </p>
        </div>

        {/* Continue button */}
        <button
          onClick={dismiss}
          className="
            shrink-0 bg-[#69daff] text-[#020617]
            px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest
            hover:brightness-110 active:scale-95 transition-all
          "
        >
          Continue
        </button>
      </div>
    </div>
  );
}
