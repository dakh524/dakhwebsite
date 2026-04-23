import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SkillRunnerGame = ({ onGameOver }) => {
    const canvasRef = useRef(null);
    const [gameState, setGameState] = useState('idle'); // idle, playing, gameover
    const [score, setScore] = useState(0);
    const [hasReportedScore, setHasReportedScore] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (gameState === 'gameover' && onGameOver && !hasReportedScore) {
            console.log(`[SkillRunner] Reporting score: ${score}`);
            onGameOver(score);
            setHasReportedScore(true);
        }
    }, [gameState, onGameOver, score, hasReportedScore]);

    useEffect(() => {
        if (gameState !== 'playing') return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;

        // Game constants
        const gravity = 0.6;
        const jumpForce = -12;
        const playerSize = 30;
        const obstacleBaseSpeed = 5;

        // Game entities
        const player = {
            x: 50,
            y: canvas.height - playerSize - 20,
            vy: 0,
            isJumping: false,
            color: '#69daff' // Primary
        };

        let items = [];
        let frameCount = 0;

        const createItem = () => {
            const isReward = Math.random() > 0.4;
            const labels = isReward 
                ? ["Skills", "Projects", "Internships", "Money", "Success", "Promotion"] 
                : ["No Skills", "No Experience", "No Guidance", "Burnout"];
            
            return {
                x: canvas.width,
                y: isReward && Math.random() > 0.5 ? canvas.height - 150 : canvas.height - 50,
                width: 110,
                height: 35,
                label: labels[Math.floor(Math.random() * labels.length)],
                isReward,
                speed: obstacleBaseSpeed + (score / 50) // Increased difficulty scaling
            };
        };

        const update = () => {
            frameCount++;

            // Player physics
            player.vy += gravity;
            player.y += player.vy;

            if (player.y > canvas.height - playerSize - 20) {
                player.y = canvas.height - playerSize - 20;
                player.vy = 0;
                player.isJumping = false;
            }

            // Spawn items
            if (frameCount % 100 === 0) {
                items.push(createItem());
            }

            // Update items
            items.forEach((item, index) => {
                item.x -= item.speed;

                // Collision detection
                if (
                    player.x < item.x + item.width &&
                    player.x + playerSize > item.x &&
                    player.y < item.y + item.height &&
                    player.y + playerSize > item.y
                ) {
                    if (item.isReward) {
                        setScore(s => s + 10);
                        items.splice(index, 1);
                    } else {
                        setGameState('gameover');
                    }
                }

                // Remove off-screen
                if (item.x + item.width < 0) {
                    items.splice(index, 1);
                    if (item.isReward === false) setScore(s => s + 5); // Dodge bonus
                }
            });

            draw();
            animationId = requestAnimationFrame(update);
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Ground
            ctx.strokeStyle = 'rgba(255,255,255,0.1)';
            ctx.beginPath();
            ctx.moveTo(0, canvas.height - 20);
            ctx.lineTo(canvas.width, canvas.height - 20);
            ctx.stroke();

            // Player
            drawPlayer(ctx, player.x, player.y, playerSize);
            ctx.shadowBlur = 0;

            // Items
            items.forEach(item => {
                ctx.fillStyle = item.isReward ? 'rgba(105, 218, 255, 0.2)' : 'rgba(255, 113, 108, 0.2)';
                ctx.strokeStyle = item.isReward ? '#69daff' : '#ff716c';
                ctx.lineWidth = 1;
                
                ctx.beginPath();
                ctx.roundRect(item.x, item.y, item.width, item.height, 15);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = '#fff';
                ctx.font = 'bold 10px Inter';
                ctx.textAlign = 'center';
                ctx.fillText(item.label, item.x + item.width / 2, item.y + 19);
            });
        };

        const handleInput = () => {
            if (!player.isJumping) {
                player.vy = jumpForce;
                player.isJumping = true;
            }
        };

        const handleKeyDown = (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                e.preventDefault();
                handleInput();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleInput();
        }, { passive: false });
        
        // Add click to jump during play
        canvas.addEventListener('mousedown', handleInput);

        update();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('keydown', handleKeyDown);
            canvas.removeEventListener('mousedown', handleInput);
        };
    }, [gameState]);

    const drawPlayer = (ctx, x, y, size) => {
        ctx.fillStyle = '#69daff';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#69daff';
        
        // Simple "Man" character (Stick figure style)
        // Head
        ctx.beginPath();
        ctx.arc(x + size/2, y + size/4, size/4, 0, Math.PI * 2);
        ctx.fill();
        
        // Body
        ctx.beginPath();
        ctx.moveTo(x + size/2, y + size/2);
        ctx.lineTo(x + size/2, y + size*0.8);
        ctx.strokeStyle = '#69daff';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Arms
        ctx.beginPath();
        ctx.moveTo(x + size/4, y + size*0.6);
        ctx.lineTo(x + size*0.75, y + size*0.6);
        ctx.stroke();
        
        // Legs (animated effect)
        const walkCycle = Math.sin(Date.now() / 100) * 5;
        ctx.beginPath();
        ctx.moveTo(x + size/2, y + size*0.8);
        ctx.lineTo(x + size/4 - walkCycle, y + size);
        ctx.moveTo(x + size/2, y + size*0.8);
        ctx.lineTo(x + size*0.75 + walkCycle, y + size);
        ctx.stroke();
        
        ctx.shadowBlur = 0;
    };

    const startGame = () => {
        setScore(0);
        setHasReportedScore(false);
        setGameState('playing');
    };

    return (
        <section className="max-w-7xl mx-auto px-6 md:px-8 py-20" id="skill-game">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Game Container */}
                <div className="relative glass-panel rounded-[2.5rem] p-4 aspect-[16/9] overflow-hidden group border border-white/10 shadow-[0_0_50px_rgba(105,218,255,0.1)] bg-[#05070a]">
                    <canvas 
                        ref={canvasRef} 
                        width={600} 
                        height={337} 
                        className="w-full h-full block rounded-2xl"
                    />
                    
                    {gameState === 'idle' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0e14]/80 backdrop-blur-md transition-all group-hover:bg-[#0a0e14]/60">
                            <div 
                                onClick={startGame}
                                className="relative group/play cursor-pointer text-center"
                            >
                                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-6 transition-all group-hover/play:scale-110 group-hover/play:bg-primary/30 shadow-[0_0_40px_rgba(105,218,255,0.2)]">
                                    <span className="material-symbols-outlined text-primary text-6xl">directions_run</span>
                                </div>
                                <h3 className="text-2xl font-black text-white tracking-widest uppercase mb-2">Initialize Path</h3>
                                <p className="text-primary/60 text-[10px] font-black uppercase tracking-[0.3em]">Click to Start Running</p>
                            </div>
                        </div>
                    )}

                    {gameState === 'gameover' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-500 text-center px-6">
                            <h3 className="text-6xl font-black text-error mb-4 italic tracking-tighter">❌ YOU LOSE</h3>
                            <p className="text-white font-black text-xs uppercase tracking-[0.3em] mb-8">Improve your skills with DAKH EDU SOLUTION</p>
                            <div className="flex gap-4">
                                <button 
                                    onClick={startGame}
                                    className="bg-white text-black px-12 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl font-black"
                                >
                                    Retry Sequence
                                </button>
                                <button 
                                    onClick={() => window.open('/internships', '_blank')}
                                    className="bg-primary text-black px-12 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl font-black"
                                >
                                    Internships
                                </button>
                            </div>
                        </div>
                    )}

                    {gameState === 'playing' && (
                        <>
                            <div className="absolute top-8 right-8">
                                <span className="text-primary font-black text-2xl tracking-tighter shadow-lg">{score}</span>
                            </div>
                            {/* Mobile Jump Button */}
                            <button 
                                onTouchStart={(e) => { e.preventDefault(); canvasRef.current.dispatchEvent(new Event('touchstart')); }}
                                className="md:hidden absolute bottom-6 right-6 w-20 h-20 bg-primary/20 border-2 border-primary/40 rounded-full flex items-center justify-center backdrop-blur-md active:scale-90 active:bg-primary/40 transition-all z-50 touch-none"
                            >
                                <span className="material-symbols-outlined text-primary text-4xl">north</span>
                            </button>
                        </>
                    )}
                </div>

                {/* CTA Content */}
                <div className="space-y-8 animate-in slide-in-from-right duration-700">
                    <div>
                        <span className="text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Interactive Career Path</span>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tightest leading-none mb-6">
                            Level Up Your <br />
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic">Skills 🚀</span>
                        </h2>
                        <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-md">
                            Don’t just scroll through opportunities. Build, learn, and grow with the DAKH neural network.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <button 
                            onClick={() => navigate('/courses')}
                            className="bg-white text-black px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all btn-vibrate shadow-2xl"
                        >
                            Start Learning
                        </button>
                        <div className="hidden md:flex items-center gap-2 text-[10px] text-slate-500 font-black uppercase tracking-widest px-4">
                            <span className="material-symbols-outlined text-sm">keyboard_capslock</span>
                            Use Space to Jump
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SkillRunnerGame;
