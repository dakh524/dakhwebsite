import React, { useEffect, useState } from 'react';

/**
 * Toast — a non-blocking popup that auto-dismisses after `duration` ms.
 * Props:
 *   message   : string  – the text to display
 *   duration  : number  – ms before auto-close (default 3500)
 *   onClose   : fn      – called when toast should be removed
 *   type      : 'info' | 'warning' | 'success' (default 'info')
 */
export default function Toast({ message, duration = 3500, onClose, type = 'info' }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Mount → trigger fade-in
    const show = requestAnimationFrame(() => setVisible(true));

    // Auto-dismiss
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 400); // wait for fade-out
    }, duration);

    return () => {
      cancelAnimationFrame(show);
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  const borderColor =
    type === 'warning' ? 'border-yellow-500/40' :
    type === 'success' ? 'border-green-500/40' :
    'border-[#69daff]/30';

  const iconBg =
    type === 'warning' ? 'bg-yellow-500/10 text-yellow-400' :
    type === 'success' ? 'bg-green-500/10 text-green-400' :
    'bg-[#69daff]/10 text-[#69daff]';

  return (
    <div
      className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border ${borderColor}
        bg-[#0d1117]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)]
        text-white text-sm font-medium max-w-xs w-full pointer-events-auto
        transition-all duration-400 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      role="alert"
    >
      <span className={`text-xl shrink-0 w-8 h-8 flex items-center justify-center rounded-xl ${iconBg}`}>
        {type === 'warning' ? '⚙️' : type === 'success' ? '✅' : '📱'}
      </span>
      <span className="leading-snug">{message}</span>
      <button
        onClick={() => { setVisible(false); setTimeout(onClose, 400); }}
        className="ml-auto shrink-0 text-slate-500 hover:text-white transition-colors text-lg leading-none"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}
