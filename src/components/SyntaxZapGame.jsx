import React, { useState, useEffect } from 'react';

const CHALLENGES = [
    {
        code: `function greet() {
  console.log("Hello"
}`,
        errorLine: 2,
        type: 'Syntax: Missing Parenthesis',
        recommendation: 'JavaScript Basics: Functions'
    },
    {
        code: `const data = [1, 2, 3]
data.map(item => {
  return <li>{item}<li>
})`,
        errorLine: 3,
        type: 'JSX: Unclosed Tag',
        recommendation: 'React Fundamentals: JSX'
    },
    {
        code: `if (x = 5) {
  console.log("Equality")
}`,
        errorLine: 1,
        type: 'Logic: Single Equals in Condition',
        recommendation: 'JS: Operators & Conditions'
    },
    {
        code: `const [val, setVal] = useState(0)
useEffect(() => {
  setVal(val + 1)
}`,
        errorLine: 3,
        type: 'React: Missing Dep Array',
        recommendation: 'React Hooks: useEffect'
    },
    {
        code: `import { user } from "./User"
export default UserProfile() {
  return <div>{user}</div>
}`,
        errorLine: 2,
        type: 'Syntax: Missing function keyword',
        recommendation: 'ES6+ Syntax'
    }
];

const SyntaxZapGame = ({ onGameOver }) => {
    const [gameState, setGameState] = useState('idle');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [feedback, setFeedback] = useState(null);
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
        return () => clearInterval(timer);
    }, [gameState]);

    useEffect(() => {
        if (gameState === 'gameover' && onGameOver && !hasReportedScore) {
            onGameOver(score, {
                feedback: score > 300 ? "Excellent debugging instincts!" : "You struggled with syntax structure.",
                recommendation: CHALLENGES[currentIndex % CHALLENGES.length].recommendation
            });
            setHasReportedScore(true);
        }
    }, [gameState, onGameOver, score, hasReportedScore, currentIndex]);

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setCurrentIndex(0);
        setTimeLeft(30);
        setHasReportedScore(false);
    };

    const handleZapper = (lineIndex) => {
        if (gameState !== 'playing') return;

        const correctLine = CHALLENGES[currentIndex].errorLine;
        if (lineIndex === correctLine) {
            setScore(prev => prev + 100);
            setFeedback('correct');
            setTimeout(() => {
                setFeedback(null);
                setCurrentIndex(prev => (prev + 1) % CHALLENGES.length);
            }, 500);
        } else if (gameState === 'playing') {
            // Instant Game Over on mistake
            setGameState('gameover');
            setFeedback('wrong');
            if (onGameOver) onGameOver(score);
        }
    };

    return (
        <section className="max-w-7xl mx-auto px-6 md:px-8 py-20" id="syntax-zap">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Game Container */}
                <div className="relative glass-panel rounded-[2.5rem] p-8 aspect-[16/9] overflow-hidden group border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)] bg-[#05070a] flex flex-col">
                    
                    {gameState === 'idle' && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                            <div onClick={startGame} className="relative group/play cursor-pointer text-center">
                                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-6 transition-all group-hover/play:scale-110 group-hover/play:bg-primary/30 shadow-[0_0_40px_rgba(105,218,255,0.2)]">
                                    <span className="material-symbols-outlined text-primary text-5xl font-black">bug_report</span>
                                </div>
                                <h3 className="text-2xl font-black text-white tracking-widest uppercase mb-2">Initialize Debugger</h3>
                                <p className="text-primary/60 text-[10px] font-black uppercase tracking-[0.3em]">Locate and Zap the Syntax Error</p>
                            </div>
                        </div>
                    )}

                    {gameState === 'playing' && (
                        <div className="flex-1 flex flex-col">
                            {/* HUD */}
                            <div className="flex justify-between w-full mb-8">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Time</span>
                                    <span className={`text-2xl font-black ${timeLeft < 10 ? 'text-error animate-pulse' : 'text-white'}`}>{timeLeft}s</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Zap Score</span>
                                    <span className="text-2xl font-black text-primary">{score}</span>
                                </div>
                            </div>

                            {/* Code Editor Area */}
                            <div className="flex-1 bg-black/40 rounded-2xl border border-white/5 p-6 font-mono text-sm relative group overflow-hidden">
                                {CHALLENGES[currentIndex].code.split('\n').map((line, i) => (
                                     <div 
                                        key={i}
                                        onClick={() => handleZapper(i + 1)}
                                        className="relative group/line flex items-center gap-4 py-2 md:py-1 hover:bg-white/5 cursor-crosshair transition-colors rounded px-2"
                                    >
                                        <span className="text-white/20 w-4 text-[10px]">{i + 1}</span>
                                        <span className="text-slate-300 group-hover/line:text-white transition-colors text-xs md:text-sm">{line}</span>
                                        {feedback === 'wrong' && i + 1 === CHALLENGES[currentIndex].errorLine && (
                                            <div className="absolute right-4 animate-pulse text-error text-[10px] font-black uppercase tracking-widest">Error Here</div>
                                        )}
                                    </div>
                                ))}

                                {feedback === 'correct' && (
                                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center animate-in fade-in duration-300">
                                        <span className="text-primary font-black text-4xl animate-bounce">ZAPPED!</span>
                                    </div>
                                )}
                            </div>

                            <p className="mt-4 text-[8px] font-black text-white/20 uppercase tracking-[0.5em] text-center italic">Debugging Simulation 1.0.4</p>
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
                                    Re-Init Debugger
                                </button>
                                <button 
                                    onClick={() => window.open('/courses', '_blank')}
                                    className="bg-primary text-black px-12 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
                                >
                                    Go to Courses
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="space-y-8">
                    <div>
                        <span className="text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Simulation Module 04</span>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tightest leading-none mb-6">
                            Syntax<br />
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic">Zapper ⚡</span>
                        </h2>
                        <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-md">
                            Identify and fix common syntax errors across JS and React snippets before the simulation crashes.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-black uppercase tracking-widest bg-white/5 px-6 py-4 rounded-2xl border border-white/5">
                            <span className="material-symbols-outlined text-sm text-primary">psychology</span>
                            Pattern Recognition
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-black uppercase tracking-widest bg-white/5 px-6 py-4 rounded-2xl border border-white/5">
                            <span className="material-symbols-outlined text-sm text-primary">bolt</span>
                            Reflexive Debugging
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SyntaxZapGame;
