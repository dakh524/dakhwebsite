import React from 'react';
import { BADGE_DETAILS, getXPForNextLevel, REWARDS } from '../../utils/gamification';

const PlayerDashboard = ({ stats }) => {
    const nextLevelXP = getXPForNextLevel(stats.level);
    const prevLevelXP = stats.level > 1 ? getXPForNextLevel(stats.level - 1) : 0;
    const progress = ((stats.xp - prevLevelXP) / (nextLevelXP - prevLevelXP)) * 100;

    return (
        <section className="max-w-7xl mx-auto px-6 md:px-8 mb-24 animate-in fade-in slide-in-from-top duration-700">
            <div className="glass-panel bg-white/[0.03] border border-white/10 rounded-[3rem] p-10 md:p-14 overflow-hidden relative">
                {/* Background Glows */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
                    
                    {/* Level & XP Info */}
                    <div className="lg:col-span-4 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5 pb-12 lg:pb-0 lg:pr-12">
                        <div className="flex items-center gap-6 mb-8 text-center lg:text-left">
                            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center p-0.5 shadow-[0_0_40px_rgba(105,218,255,0.3)]">
                                <div className="w-full h-full bg-[#05070a] rounded-[22px] flex flex-col items-center justify-center">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Level</span>
                                    <span className="text-4xl font-black text-white italic">{stats.level}</span>
                                </div>
                            </div>
                            <div className="flex-1 text-left">
                                <h3 className="text-xl font-black uppercase tracking-tightest mb-2">Neural Synergy</h3>
                                <p className="text-slate-500 text-xs font-medium">Total XP: <span className="text-primary">{stats.xp}</span> / {nextLevelXP}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                <span className="text-slate-500">Synchronization Progress</span>
                                <span className="text-primary">{Math.max(0, Math.min(100, Math.floor(progress)))}%</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                <div 
                                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 shadow-[0_0_15px_rgba(105,218,255,0.5)]" 
                                    style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col items-center justify-center text-center p-6 bg-white/5 rounded-3xl border border-white/5">
                            <span className="material-symbols-outlined text-secondary text-3xl mb-3">sports_esports</span>
                            <span className="text-2xl font-black text-white">{stats.gamesPlayed}</span>
                            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-2">Simulations</span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center p-6 bg-white/5 rounded-3xl border border-white/5">
                            <span className="material-symbols-outlined text-primary text-3xl mb-3">local_fire_department</span>
                            <span className="text-2xl font-black text-white">{stats.streak}</span>
                            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-2">Day Streak</span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center p-6 bg-white/5 rounded-3xl border border-white/5 overflow-hidden">
                            <span className="material-symbols-outlined text-tertiary text-3xl mb-1">confirmation_number</span>
                            <div className="flex flex-col">
                                <span className="text-xl font-black text-white">{stats.coupons?.length || 0}</span>
                                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Coupons</span>
                            </div>
                        </div>
                    </div>

                    {/* Rewards/Badges Toggle Style */}
                    <div className="lg:col-span-3 flex flex-col justify-center gap-6">
                        <div>
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Milestone Progress</h4>
                            <div className="flex gap-2">
                                {REWARDS.map((r, i) => {
                                    const isUnlocked = stats.level >= r.level;
                                    return (
                                        <div 
                                            key={i}
                                            title={r.label}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${isUnlocked ? 'bg-secondary/20 border-secondary text-secondary shadow-[0_0_10px_rgba(184,132,255,0.3)]' : 'bg-white/5 border-white/10 text-white/20'}`}
                                        >
                                            <span className="text-[10px] font-black">{r.level}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {stats.coupons?.length > 0 && (
                            <div>
                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3">Recent Coupon</h4>
                                <div className="bg-white/5 px-4 py-3 rounded-2xl border border-white/10 flex justify-between items-center group cursor-copy" onClick={() => {
                                    navigator.clipboard.writeText(stats.coupons[stats.coupons.length-1].code);
                                }}>
                                    <div>
                                        <p className="text-[8px] font-black text-secondary tracking-widest uppercase">{stats.coupons[stats.coupons.length-1].label}</p>
                                        <p className="text-xs font-mono font-black text-white mt-1">{stats.coupons[stats.coupons.length-1].code}</p>
                                    </div>
                                    <span className="material-symbols-outlined text-white/20 group-hover:text-white transition-colors text-sm">content_copy</span>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PlayerDashboard;
