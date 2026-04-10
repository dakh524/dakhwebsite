import React, { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [text, setText] = useState('');
  const [showSubtext, setShowSubtext] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  const mainTitle = "DAKH EDU SOLUTIONS";
  const subTitle = "Loading modules...";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= mainTitle.length) {
        setText(mainTitle.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowSubtext(true), 500);
        
        // Auto-fade out after complete
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => setShouldRender(false), 800);
        }, 3000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#0a0e14] transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="text-center relative">
        {/* Main Title with 3D Shadow */}
        <h1 className="text-4xl md:text-6xl font-black tracking-[0.3em] text-white mb-6 uppercase drop-shadow-3d select-none">
          {text}
          <span className="animate-blink border-r-4 border-primary ml-2 h-12 inline-block align-middle"></span>
        </h1>

        {/* Subtext */}
        <div className={`h-8 transition-all duration-1000 transform ${showSubtext ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-xs font-bold tracking-[0.5em] text-slate-500 uppercase">
            {subTitle}
          </p>
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      </div>
    </div>
  );
}
