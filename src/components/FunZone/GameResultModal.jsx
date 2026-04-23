import React from 'react';

const GameResultModal = ({ isOpen, gameId, stats, onClose, onTryAgain }) => {
    if (!isOpen) return null;

    const { score, earnedXP } = stats;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 sm:p-0">
            {/* Background Blur Overlay */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-in fade-in duration-700" onClick={onClose}></div>
            
            <div className="relative w-full max-w-lg glass-panel bg-[#05070a]/95 border border-white/10 rounded-[2.5rem] p-10 overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.05)] animate-in zoom-in-95 duration-500">
                {/* Decorative Red Glow */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-error/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 shadow-[0_0_20px_rgba(255,50,50,0.2)]">
                        <span className="material-symbols-outlined text-4xl text-error font-black">error</span>
                    </div>

                    {/* Motivational Header */}
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 glow-title animate-in slide-in-from-bottom-4 duration-500">
                        ❌ You Lost
                    </h2>
                    <p className="text-white text-lg font-black uppercase tracking-tight mb-2">You need to improve your skills.</p>
                    <p className="text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-10 italic">Build your future with DAKH EDU SOLUTION 🚀</p>

                    {/* Stats Display */}
                    <div className="w-full flex gap-4 mb-10">
                        <div className="flex-1 bg-white/5 rounded-2xl py-5 border border-white/5 shadow-inner">
                            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block mb-1">Session Score</span>
                            <span className="text-3xl font-black text-white">{score || 0}</span>
                        </div>
                        <div className="flex-1 bg-white/5 rounded-2xl py-5 border border-white/5 shadow-inner">
                            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block mb-1">XP Earned</span>
                            <span className="text-3xl font-black text-primary">+{earnedXP || 0}</span>
                        </div>
                    </div>

                    {/* Motivational Quote */}
                    <div className="w-full mb-10 relative">
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                        <span className="relative bg-[#05070a] px-4 text-[10px] font-medium text-slate-500 uppercase tracking-[0.3em]">
                            "Every expert was once a beginner"
                        </span>
                    </div>

                    {/* Interactive Action Buttons */}
                    <div className="w-full space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button 
                                onClick={() => window.open('/courses', '_blank')}
                                className="group relative bg-white text-black py-4 px-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-[1.03] active:scale-95 shadow-[0_4px_20px_rgba(255,255,255,0.2)] overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform"></div>
                                Go to Courses
                            </button>
                            <button 
                                onClick={() => window.open('/internships', '_blank')}
                                className="group relative bg-primary text-black py-4 px-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-[1.03] active:scale-95 shadow-[0_4px_20px_rgba(105,218,255,0.2)] overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform"></div>
                                Explore Internships
                            </button>
                        </div>
                        
                        <button 
                            onClick={onTryAgain}
                            className="w-full bg-white/5 hover:bg-white/10 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] border border-white/10 transition-all flex items-center justify-center gap-3 hover:border-white/20"
                        >
                            <span className="material-symbols-outlined text-sm">replay</span>
                            Retry Simulation
                        </button>
                    </div>

                    <p className="mt-8 text-[8px] font-black text-slate-700 uppercase tracking-[0.4em] animate-pulse">Neural Synchronization Interrupted</p>
                </div>
            </div>

            <style jsx>{`
                .glow-title {
                    text-shadow: 0 0 20px rgba(255, 50, 50, 0.4);
                }
            `}</style>
        </div>
    );
};

export default GameResultModal;
