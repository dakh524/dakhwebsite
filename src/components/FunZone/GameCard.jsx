import React, { useState } from 'react';
import { addGameResult } from '../../utils/gamification';
import GameResultModal from './GameResultModal';

const GameCard = ({ children, gameId, title, onResult, onLevelUp }) => {
    const [lastResult, setLastResult] = useState(null);
    const [isResultOpen, setIsResultOpen] = useState(false);

    const [gameKey, setGameKey] = useState(0);

    const handleGameOver = (score, analytics = {}) => {
        const result = addGameResult(gameId, score);
        const finalResult = { 
            ...result, 
            score, 
            feedback: analytics.feedback || "Good effort! Keep practicing to improve your consistency.",
            recommendation: analytics.recommendation || "Software Development Essentials"
        };
        
        setLastResult(finalResult);
        setIsResultOpen(true);
        
        // Notify parent of total stat change
        if (onResult) onResult();
        
        // Special Level Up Modal trigger
        if (result.leveledUp && onLevelUp) {
            onLevelUp(result.newLevel, result.unlockedReward);
        }
    };

    return (
        <div className="relative group/game">
            {/* Inject onGameOver into children and force reset via key */}
            {React.cloneElement(children, { 
                key: gameKey,
                onGameOver: handleGameOver 
            })}

            {/* Premium Result Modal */}
            <GameResultModal 
                isOpen={isResultOpen}
                gameId={gameId}
                stats={lastResult || {}}
                onClose={() => {
                    setIsResultOpen(false);
                    setLastResult(null);
                }}
                onTryAgain={() => {
                    setIsResultOpen(false);
                    setLastResult(null);
                    setGameKey(prev => prev + 1); // Force whole game component to remount/reset
                }}
            />

            {/* Floating Toast (only for mobile or quick feedback) */}
            {lastResult && !isResultOpen && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 z-[150] animate-in slide-in-from-top-4 fade-in duration-500 pointer-events-none">
                    <div className="glass-panel bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl px-8 py-4 shadow-2xl flex flex-col items-center gap-1">
                        <div className="flex items-center gap-3">
                            <span className="text-primary font-black text-xs uppercase tracking-widest">+{lastResult.earnedXP} XP</span>
                            {lastResult.leveledUp && (
                                <span className="bg-secondary text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest animate-pulse">Rank Up!</span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GameCard;
