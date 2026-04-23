import React, { useState, useEffect, useRef } from 'react';

const WORDS = [
    'REACT', 'JAVASCRIPT', 'SUPABASE', 'DIMENSION', 'LABORATORY', 
    'FRONTEND', 'BACKEND', 'FULLSTACK', 'SYSTEMS', 'INTERFACE',
    'ALGORITHM', 'DATABASE', 'NETWORK', 'PROTOCOL', 'NEURAL',
    'WORKSPACE', 'CREATOR', 'DYNAMIC', 'ETHEREAL', 'FUTURE'
];

const TypedFlowGame = ({ onGameOver }) => {
    const [gameState, setGameState] = useState('idle'); // idle, playing, gameover
    const [currentWord, setCurrentWord] = useState('');
    const [userInput, setUserInput] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [hasReportedScore, setHasReportedScore] = useState(false);
    const inputRef = useRef(null);

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
            console.log(`[TypedFlow] Reporting score: ${score}`);
            onGameOver(score);
            setHasReportedScore(true);
        }
    }, [gameState, onGameOver, score, hasReportedScore]);

    useEffect(() => {
        if (gameState === 'playing' && inputRef.current) {
            inputRef.current.focus();
        }
    }, [gameState]);

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setTimeLeft(30);
        setUserInput('');
        setHasReportedScore(false);
        setNextWord();
    };

    const setNextWord = () => {
        const randomIndex = Math.floor(Math.random() * WORDS.length);
        setCurrentWord(WORDS[randomIndex]);
    };

    const handleInputChange = (e) => {
        if (gameState !== 'playing') return;

        const val = e.target.value.toUpperCase();
        
        // Check for immediate mistake
        if (val.length > userInput.length) {
            const lastChar = val[val.length - 1];
            const expectedChar = currentWord[val.length - 1];
            
            if (lastChar !== expectedChar) {
                setGameState('gameover');
                if (onGameOver) onGameOver(score);
                return;
            }
        }

        setUserInput(val);

        if (val === currentWord) {
            setScore(prev => prev + currentWord.length * 10);
            setTimeLeft(prev => prev + 2); // Bonus time
            setUserInput('');
            setNextWord();
        }
    };

    return (
        <section className="max-w-7xl mx-auto px-6 md:px-8 py-20" id="typed-flow">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* CTA Content (Now on the left for variety) */}
                <div className="space-y-8 lg:order-1 order-2">
                    <div>
                        <span className="text-secondary font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Focus Protocol</span>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tightest leading-none mb-6">
                            Master the <br />
                            <span className="bg-gradient-to-r from-secondary to-tertiary bg-clip-text text-transparent italic">Typed Flow ⌨️</span>
                        </h2>
                        <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-md">
                            Precision meets velocity. Type the technical signatures to synchronize with the neural network.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-black uppercase tracking-widest bg-white/5 px-6 py-4 rounded-2xl border border-white/5">
                            <span className="material-symbols-outlined text-sm text-secondary">timer</span>
                            +2s per success
                        </div>
                    </div>
                </div>

                {/* Game Container */}
                <div className="lg:order-2 order-1 relative glass-panel rounded-[2.5rem] p-8 aspect-[16/9] overflow-hidden group border border-white/10 shadow-[0_0_50px_rgba(184,132,255,0.1)] bg-[#05070a] flex flex-col items-center justify-center">
                    
                    {gameState === 'idle' && (
                        <div className="flex flex-col items-center justify-center text-center">
                            <div 
                                onClick={startGame}
                                className="relative group/play cursor-pointer text-center"
                            >
                                <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mb-6 transition-all group-hover/play:scale-110 group-hover/play:bg-secondary/30 shadow-[0_0_40px_rgba(184,132,255,0.2)]">
                                    <span className="material-symbols-outlined text-secondary text-5xl">keyboard</span>
                                </div>
                                <h3 className="text-2xl font-black text-white tracking-widest uppercase mb-2">Initiate Typestack</h3>
                                <p className="text-secondary/60 text-[10px] font-black uppercase tracking-[0.3em]">Click to Synchronize</p>
                            </div>
                        </div>
                    )}

                    {gameState === 'playing' && (
                        <div className="w-full flex flex-col items-center space-y-12">
                            <div className="flex justify-between w-full absolute top-8 px-8">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Time Remaining</span>
                                    <span className={`text-2xl font-black ${timeLeft < 10 ? 'text-error animate-pulse' : 'text-white'}`}>{timeLeft}s</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Neural Score</span>
                                    <span className="text-2xl font-black text-secondary">{score}</span>
                                </div>
                            </div>

                            <div className="text-center">
                                <div className="flex justify-center gap-1 mb-2">
                                    {currentWord.split('').map((char, i) => (
                                        <span 
                                            key={i}
                                            className={`text-4xl md:text-6xl font-black tracking-widest ${
                                                i < userInput.length 
                                                    ? (char === userInput[i] ? 'text-secondary' : 'text-error') 
                                                    : 'text-white/20'
                                            }`}
                                        >
                                            {char}
                                        </span>
                                    ))}
                                </div>
                                <div className="h-1 w-24 bg-secondary/30 mx-auto rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-secondary transition-all duration-300" 
                                        style={{ width: `${(userInput.length / currentWord.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <input 
                                ref={inputRef}
                                type="text"
                                value={userInput}
                                onChange={handleInputChange}
                                className="opacity-0 absolute"
                                autoFocus
                            />
                            
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em] animate-pulse">Start Typing Now</p>
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
                                    Reboot Sequence
                                </button>
                                <button 
                                    onClick={() => window.open('/courses', '_blank')}
                                    className="bg-secondary text-white px-12 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
                                >
                                    Go to Courses
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TypedFlowGame;
