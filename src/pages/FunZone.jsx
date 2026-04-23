import React, { useEffect, useState } from 'react';
import SkillRunnerGame from '../components/SkillRunnerGame';
import TypedFlowGame from '../components/TypedFlowGame';
import LogicVaultGame from '../components/LogicVaultGame';
import SyntaxZapGame from '../components/SyntaxZapGame';
import PlayerDashboard from '../components/FunZone/PlayerDashboard';
import GameCard from '../components/FunZone/GameCard';
import LevelUpModal from '../components/FunZone/LevelUpModal';
import Footer from '../components/Footer';
import { getStats } from '../utils/gamification';

export default function FunZone() {
  const [stats, setStats] = useState(getStats());
  const [levelUpData, setLevelUpData] = useState({ isOpen: false, level: 1, reward: null });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const refreshStats = () => {
      setStats(getStats());
  };

  const handleLevelUp = (level, reward) => {
    setLevelUpData({ isOpen: true, level, reward });
  };

  const sections = [
    {
      id: 'skill-games',
      title: 'Skill Games',
      subtitle: 'Technical accuracy and rapid debugging',
      icon: 'terminal',
      color: 'primary',
      games: [
        { 
            component: <SyntaxZapGame />, 
            id: 'syntax-zap',
            title: 'SyntaxZap'
        },
        { 
            component: <TypedFlowGame />, 
            id: 'typed-flow',
            title: 'TypedFlow'
        }
      ]
    },
    {
      id: 'reflex-games',
      title: 'Reflex Games',
      subtitle: 'Response time and cognitive speed',
      icon: 'bolt',
      color: 'secondary',
      games: [
        { 
            component: <SkillRunnerGame />, 
            id: 'skill-runner',
            title: 'Skill Runner'
        }
      ]
    },
    {
      id: 'brain-games',
      title: 'Brain Games',
      subtitle: 'Pattern recognition and abstract logic',
      icon: 'psychology',
      color: 'tertiary',
      games: [
        { 
            component: <LogicVaultGame />, 
            id: 'logic-vault',
            title: 'Logic Vault'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-32 bg-[#020617]">
      <LevelUpModal 
        isOpen={levelUpData.isOpen} 
        level={levelUpData.level} 
        reward={levelUpData.reward} 
        onClose={() => setLevelUpData({ ...levelUpData, isOpen: false })}
      />

      {/* Hero Section */}
      <section className="relative py-12 flex flex-col items-center justify-center overflow-hidden mb-12">
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 text-center">
          <div className="mb-6 flex justify-center">
            <span className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black tracking-[0.4em] uppercase shadow-[0_0_20px_rgba(105,218,255,0.05)]">
              Modular Laboratory
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-6 leading-[0.9] tracking-tightest glow">
            FUN ZONE
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            A gamified ecosystem designed to sharpen your technical instincts and cognitive velocity.
          </p>
        </div>

        {/* Ambient Background Lights */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-full max-w-3xl aspect-square bg-primary/5 rounded-full blur-[160px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-full max-w-3xl aspect-square bg-secondary/5 rounded-full blur-[160px] animate-pulse"></div>
        </div>
      </section>

      {/* Player Stats Dashboard */}
      <PlayerDashboard stats={stats} />

      {/* Structured Games Sections */}
      <div className="relative z-10 pb-32">
        {sections.map((section) => (
          <div key={section.id} className="mb-32">
            {/* Section Header */}
            <div className="max-w-7xl mx-auto px-6 md:px-8 mb-16">
              <div className="flex items-end gap-6 border-b border-white/5 pb-8 relative">
                <div className={`w-16 h-16 rounded-2xl bg-${section.color}/10 flex items-center justify-center border border-${section.color}/20 shadow-[0_0_30px_rgba(0,0,0,0.5)]`}>
                  <span className={`material-symbols-outlined text-${section.color} text-4xl`}>{section.icon}</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tightest uppercase mb-1">
                    {section.title}
                  </h2>
                  <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.3em]">
                    {section.subtitle}
                  </p>
                </div>
                {/* Visual Accent */}
                <div className={`absolute bottom-0 left-0 w-32 h-[2px] bg-${section.color} shadow-[0_0_10px_var(--${section.color})]`}></div>
              </div>
            </div>

            {/* Section Games List */}
            <div className="space-y-0 relative">
              {/* Subtle Connection Line */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent z-0 hidden lg:block"></div>

              {section.games.length > 0 ? (
                section.games.map((game) => (
                  <GameCard 
                    key={game.id} 
                    gameId={game.id} 
                    title={game.title}
                    onResult={refreshStats}
                    onLevelUp={handleLevelUp}
                  >
                    {game.component}
                  </GameCard>
                ))
              ) : (
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                  <div className="glass-panel bg-white/5 border border-white/5 rounded-[2.5rem] p-20 flex flex-col items-center justify-center text-center opacity-40">
                    <span className="material-symbols-outlined text-6xl mb-6 text-slate-600">construction</span>
                    <h3 className="text-xl font-black uppercase tracking-widest text-slate-400">Expansion in Progress</h3>
                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-600 mt-2">New challenges coming soon to this module</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
