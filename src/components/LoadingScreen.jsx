import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create particles
      const particlesCount = 50;
      const particles = [];
      for (let i = 0; i < particlesCount; i++) {
        const p = document.createElement('div');
        p.className = 'absolute w-1 h-1 bg-primary rounded-full opacity-0';
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${Math.random() * 100}%`;
        particlesRef.current.appendChild(p);
        particles.push(p);
      }

      // Initial state
      gsap.set(logoRef.current, { 
        opacity: 0, 
        scale: 0.8, 
        filter: 'blur(20px)',
        z: -1000 
      });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut',
            onComplete: onComplete
          });
        }
      });

      // Animation sequence
      tl.to(particles, {
        opacity: () => Math.random() * 0.5 + 0.2,
        duration: 2,
        stagger: 0.02,
      }, 0)
      .to(logoRef.current, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        z: 0,
        duration: 2.5,
        ease: 'expo.out'
      }, 0.5)
      .to(logoRef.current, {
        scale: 1.1,
        duration: 4,
        ease: 'none'
      }, 0.5)
      .to(particles, {
        y: '-=100',
        x: '+=50',
        duration: 10,
        ease: 'none'
      }, 0);

      // 3D Floating effect
      gsap.to(logoRef.current, {
        y: '20px',
        rotationX: 5,
        rotationY: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[1000] bg-[#0a0e14] flex items-center justify-center overflow-hidden perspective-1000"
    >
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px]"></div>
      </div>

      {/* Particles Container */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none"></div>

      {/* 3D Logo Text */}
      <div 
        ref={logoRef}
        className="relative z-10 text-center select-none"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <h1 className="text-4xl md:text-7xl font-black tracking-tightest uppercase text-white drop-shadow-[0_0_30px_rgba(105,218,255,0.5)]">
          DAKH EDU SOLUTIONS
        </h1>
        <div className="mt-4 flex justify-center gap-2">
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
        </div>
      </div>
    </div>
  );
}
