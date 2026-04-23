import React from 'react';

const LevelUpModal = ({ isOpen, level, reward, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 sm:p-0">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-500" onClick={onClose}></div>
            
            <div className="relative w-full max-w-md glass-panel bg-[#05070a]/90 border border-white/10 rounded-[2.5rem] p-10 overflow-hidden shadow-[0_0_100px_rgba(105,218,255,0.2)] animate-in zoom-in-95 duration-500">
                {/* Background Glows */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-[50px] pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-[50px] pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(105,218,255,0.4)]">
                        <span className="material-symbols-outlined text-4xl text-white">keyboard_double_arrow_up</span>
                    </div>

                    <h2 className="text-4xl font-black text-white uppercase tracking-tightest mb-2">Level Up!</h2>
                    <p className="text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-8">Neural Synchronization Elevated</p>

                    <div className="w-full bg-white/5 rounded-3xl p-6 border border-white/5 mb-8">
                        <div className="flex flex-col items-center">
                            <span className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1">New Rank</span>
                            <span className="text-5xl font-black text-white italic">LVL {level}</span>
                        </div>
                    </div>

                    {reward && (
                        <div className="w-full space-y-4 mb-8">
                            <div className="flex flex-col items-center">
                                <span className="material-symbols-outlined text-secondary mb-2">redeem</span>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">Reward Unlocked</h3>
                                <p className="text-slate-400 text-xs mt-1">{reward.label}</p>
                            </div>

                            {reward.coupon && (
                                <div className="bg-[#020617] p-4 rounded-xl border border-dashed border-secondary/50 flex flex-col items-center">
                                    <span className="text-[8px] font-black text-secondary uppercase tracking-[0.3em] mb-2 text-center">Coupon Code</span>
                                    <span className="text-xl font-mono font-black text-white tracking-widest select-all">{reward.coupon}</span>
                                </div>
                            )}
                        </div>
                    )}

                    <button 
                        onClick={onClose}
                        className="w-full bg-white text-black py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
                    >
                        Accept Protocol
                    </button>
                    
                    <p className="text-[8px] font-medium text-slate-600 mt-6 uppercase tracking-widest">Rewards stored in simulation dashboard</p>
                </div>
            </div>
        </div>
    );
};

export default LevelUpModal;
