import React, { useState, useEffect } from 'react';

const LogicVaultGame = ({ onGameOver }) => {
    const [gameState, setGameState] = useState('idle'); // idle, playing, gameover
    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [currentPuzzle, setCurrentPuzzle] = useState(null);
    const [feedback, setFeedback] = useState(null); // 'correct', 'wrong'
    const [hasReportedScore, setHasReportedScore] = useState(false);

    useEffect(() => {
        let timer;
        if (gameState === 'playing') {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setGameState('gameover');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [gameState]);

    useEffect(() => {
        if (gameState === 'gameover' && onGameOver && !hasReportedScore) {
            console.log(`[LogicVault] Reporting score: ${score}`);
            onGameOver(score);
            setHasReportedScore(true);
        }
    }, [gameState, onGameOver, score, hasReportedScore]);

    const generatePuzzle = () => {
        // Simple logic: Rotation of squares
        const baseRotation = Math.floor(Math.random() * 4) * 90;
        const step = 45 + (Math.floor(Math.random() * 2) * 45); // 45 or 90
        
        const sequence = [0, 1, 2].map(i => (baseRotation + (i * step)) % 360);
        const correct = (baseRotation + (3 * step)) % 360;
        
        // Generate wrong options
        const options = [
            correct,
            (correct + 90) % 360,
            (correct + 180) % 360
        ].sort(() => Math.random() - 0.5);

        setCurrentPuzzle({ sequence, options, correct });
    };

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setLevel(1);
        setTimeLeft(60);
        setHasReportedScore(false);
        generatePuzzle();
    };

    const handleChoice = (choice) => {
        if (gameState !== 'playing') return;

        if (choice === currentPuzzle.correct) {
            setScore(prev => prev + 100 * level);
            setLevel(prev => prev + 1);
            setFeedback('correct');
            setTimeout(() => {
                setFeedback(null);
                generatePuzzle();
            }, 600);
        } else if (gameState === 'playing') {
            // Instant Fail
            setGameState('gameover');
            setFeedback('wrong');
            if (onGameOver) onGameOver(score);
        }
    };

    const Pattern = ({ rotation, size = "w-16 h-16" }) => (
        <div 
            className={`${size} border-2 border-tertiary/40 rounded-xl flex items-center justify-center bg-tertiary/5 transition-all duration-500`}
            style={{ transform: `rotate(${rotation}deg)` }}
        >
            <div className="w-8 h-8 border-2 border-tertiary rounded-sm"></div>
            <div className="absolute top-1 left-1 w-2 h-2 bg-tertiary rounded-full"></div>
        </div>
    );

    return (
        <section className="max-w-7xl mx-auto px-6 md:px-8 py-20" id="logic-vault">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Game Container */}
                <div className="relative glass-panel rounded-[2.5rem] p-8 aspect-[16/9] overflow-hidden group border border-white/10 shadow-[0_0_50px_rgba(255,5,229,0.1)] bg-[#05070a] flex flex-col items-center justify-center">
                    
                    {gameState === 'idle' && (
                        <div className="flex flex-col items-center justify-center text-center">
                            <div 
                                onClick={startGame}
                                className="relative group/play cursor-pointer text-center"
                            >
                                <div className="w-24 h-24 bg-tertiary/20 rounded-full flex items-center justify-center mb-6 transition-all group-hover/play:scale-110 group-hover/play:bg-tertiary/30 shadow-[0_0_40px_rgba(255,5,229,0.2)]">
                                    <span className="material-symbols-outlined text-tertiary text-5xl">psychology</span>
                                </div>
                                <h3 className="text-2xl font-black text-white tracking-widest uppercase mb-2">Initialize Vault</h3>
                                <p className="text-tertiary/60 text-[10px] font-black uppercase tracking-[0.3em]">Decipher the Sequence</p>
                            </div>
                        </div>
                    )}

                    {gameState === 'playing' && currentPuzzle && (
                        <div className="w-full flex flex-col items-center space-y-12">
                            {/* HUD */}
                            <div className="flex justify-between w-full absolute top-8 px-8">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Logic Cycle</span>
                                    <span className="text-2xl font-black text-white">{level}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Neural Sync</span>
                                    <span className={`text-2xl font-black ${timeLeft < 10 ? 'text-error animate-pulse' : 'text-white'}`}>{timeLeft}s</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Vault Score</span>
                                    <span className="text-2xl font-black text-tertiary">{score}</span>
                                </div>
                            </div>

                            {/* Puzzle Sequence */}
                            <div className="flex items-center gap-8 md:gap-12">
                                {currentPuzzle.sequence.map((rot, i) => (
                                    <React.Fragment key={i}>
                                        <Pattern rotation={rot} />
                                        {i < 2 && <span className="material-symbols-outlined text-white/20">arrow_forward</span>}
                                    </React.Fragment>
                                ))}
                                <span className="material-symbols-outlined text-white/20">arrow_forward</span>
                                <div className="w-16 h-16 border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center bg-white/5">
                                    <span className="text-2xl font-black text-white/20">?</span>
                                </div>
                            </div>

                            {/* Options */}
                            <div className="flex gap-6">
                                {currentPuzzle.options.map((opt, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => handleChoice(opt)}
                                        className={`p-1 rounded-2xl transition-all hover:scale-110 active:scale-95 ${feedback === 'correct' && opt === currentPuzzle.correct ? 'bg-tertiary shadow-[0_0_20px_rgba(255,5,229,0.5)]' : 'bg-white/5 hover:bg-white/10'}`}
                                    >
                                        <Pattern rotation={opt} size="w-20 h-20 md:w-24 md:h-24" />
                                    </button>
                                ))}
                            </div>

                            {feedback === 'wrong' && <p className="text-error font-black uppercase tracking-widest animate-bounce">Sequence Mismatch</p>}
                        </div>
                    )}

                    {gameState === 'gameover' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-500 text-center px-6">
                            <h3 className="text-6xl font-black text-error mb-4 italic tracking-tighter">❌ YOU LOSE</h3>
                            <p className="text-white font-black text-xs uppercase tracking-[0.3em] mb-8">Improve your skills with DAKH EDU SOLUTION</p>
                            <div className="flex gap-4">
                                <button 
                                    onClick={startGame}
                                    className="bg-white text-black px-12 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
                                >
                                    Restart Protocol
                                </button>
                                <button 
                                    onClick={() => window.open('/internships', '_blank')}
                                    className="bg-tertiary text-white px-12 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
                                >
                                    Internships
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* CTA Content */}
                <div className="space-y-8">
                    <div>
                        <span className="text-tertiary font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Cognitive Override</span>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tightest leading-none mb-6">
                            Decipher the <br />
                            <span className="bg-gradient-to-r from-tertiary to-primary bg-clip-text text-transparent italic">Logic Vault 🧠</span>
                        </h2>
                        <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-md">
                            Abstract patterns governed by deep logic. Train your brain to recognize architectural signatures in chaos.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-black uppercase tracking-widest bg-white/5 px-6 py-4 rounded-2xl border border-white/5">
                            <span className="material-symbols-outlined text-sm text-tertiary">trending_up</span>
                            Increases with Cycle
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default LogicVaultGame;
