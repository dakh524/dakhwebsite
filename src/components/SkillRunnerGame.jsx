import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SkillRunnerGame = () => {
    const canvasRef = useRef(null);
    const [gameState, setGameState] = useState('idle'); // idle, playing, gameover
    const [score, setScore] = useState(0);
    const navigate = useNavigate();

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
                ? ["Skills", "Projects", "Internships"] 
                : ["No Skills", "No Experience", "No Guidance"];
            
            return {
                x: canvas.width,
                y: isReward && Math.random() > 0.5 ? canvas.height - 120 : canvas.height - 50,
                width: 100,
                height: 30,
                label: labels[Math.floor(Math.random() * labels.length)],
                isReward,
                speed: obstacleBaseSpeed + (score / 100)
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
            ctx.fillStyle = player.color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = player.color;
            ctx.beginPath();
            ctx.roundRect(player.x, player.y, playerSize, playerSize, 8);
            ctx.fill();
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

        window.addEventListener('keydown', (e) => e.code === 'Space' && handleInput());
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleInput();
        });

        update();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('keydown', handleInput);
        };
    }, [gameState]);

    const startGame = () => {
        setScore(0);
        setGameState('playing');
    };

    return (
        <section className="max-w-7xl mx-auto px-6 md:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Game Container */}
                <div className="relative glass-panel rounded-[2.5rem] p-4 aspect-[16/9] overflow-hidden group border border-white/5 shadow-2xl">
                    <canvas 
                        ref={canvasRef} 
                        width={600} 
                        height={337} 
                        className="w-full h-full block rounded-2xl cursor-pointer"
                        onClick={() => gameState === 'playing' ? null : startGame()}
                    />
                    
                    {gameState === 'idle' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm transition-all">
                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6 animate-pulse cursor-pointer shadow-[0_0_30px_rgba(105,218,255,0.4)]" onClick={startGame}>
                                <span className="material-symbols-outlined text-black text-4xl">play_arrow</span>
                            </div>
                            <p className="text-white font-black text-xs uppercase tracking-widest">Click to Start Journey</p>
                        </div>
                    )}

                    {gameState === 'gameover' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-500">
                            <h3 className="text-4xl font-black text-white mb-2">PATH BLOCKED</h3>
                            <p className="text-primary font-black text-xl mb-8">Score: {score}</p>
                            <button 
                                onClick={startGame}
                                className="bg-white text-black px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all"
                            >
                                Retry Sequence
                            </button>
                        </div>
                    )}

                    {gameState === 'playing' && (
                        <div className="absolute top-8 right-8">
                            <span className="text-primary font-black text-2xl tracking-tighter shadow-lg">{score}</span>
                        </div>
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
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-black uppercase tracking-widest px-4">
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
