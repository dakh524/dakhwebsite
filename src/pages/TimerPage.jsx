import React, { useState, useEffect } from 'react';
import ToolLayout from '../components/ToolLayout';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function TimerPage() {
   const [timeLeft, setTimeLeft] = useState(25 * 60);
   const [isRunning, setIsRunning] = useState(false);
   const [isBreak, setIsBreak] = useState(false);

   useEffect(() => {
      let interval;
      if (isRunning && timeLeft > 0) {
         interval = setInterval(() => {
            setTimeLeft(prev => prev - 1);
         }, 1000);
      } else if (isRunning && timeLeft === 0) {
         if (!isBreak) {
            setTimeLeft(5 * 60);
            setIsBreak(true);
         } else {
            setTimeLeft(25 * 60);
            setIsBreak(false);
            setIsRunning(false);
         }
      }
      return () => clearInterval(interval);
   }, [isRunning, timeLeft, isBreak]);

   const toggleTimer = () => setIsRunning(!isRunning);
   const resetTimer = () => {
      setIsRunning(false);
      setIsBreak(false);
      setTimeLeft(25 * 60);
   };

   const formatTime = (seconds) => {
      const m = Math.floor(seconds / 60).toString().padStart(2, '0');
      const s = (seconds % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
   };

   const totalTime = isBreak ? 5 * 60 : 25 * 60;
   const progress = ((totalTime - timeLeft) / totalTime) * 100;

   return (
      <ToolLayout title="Pomodoro Timer">
         <div className="glass-panel p-10 rounded-[2rem] max-w-md mx-auto flex flex-col items-center">
            
            <div className="flex gap-4 mb-10 w-full p-1 bg-black/40 rounded-xl">
                <button 
                   onClick={() => { setIsBreak(false); setTimeLeft(25*60); setIsRunning(false); }}
                   className={`flex-1 py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all ${!isBreak ? 'bg-primary text-[#004050] shadow-md' : 'text-slate-400 hover:text-white'}`}
                >Focus</button>
                <button 
                   onClick={() => { setIsBreak(true); setTimeLeft(5*60); setIsRunning(false); }}
                   className={`flex-1 py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all ${isBreak ? 'bg-secondary text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                >Break</button>
            </div>

            <div className="relative w-64 h-64 rounded-full flex items-center justify-center mb-10 shadow-[0_0_40px_rgba(0,0,0,0.3)] bg-surface border border-white/5">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                    <circle cx="50" cy="50" r="48" fill="none" stroke={isBreak ? '#b884ff' : '#69daff'} strokeWidth="4" strokeDasharray="301.59" strokeDashoffset={301.59 - (progress / 100) * 301.59} className="transition-all duration-1000 ease-linear" strokeLinecap="round" />
                </svg>
                <div className="flex flex-col items-center">
                   <span className={`text-6xl font-black ${isBreak ? 'text-secondary' : 'text-primary drop-shadow-[0_0_20px_rgba(105,218,255,0.5)]'}`}>{formatTime(timeLeft)}</span>
                   <span className="text-slate-400 mt-2 font-bold tracking-widest uppercase text-[10px]">{isBreak ? 'Relax' : 'Stay Focused'}</span>
                </div>
            </div>

            <div className="flex gap-4">
               <button onClick={toggleTimer} className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isRunning ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-primary text-[#004050] hover:scale-105 shadow-[0_0_20px_rgba(105,218,255,0.3)]'}`}>
                  {isRunning ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
               </button>
               <button onClick={resetTimer} className="w-16 h-16 rounded-full bg-white/5 text-slate-300 flex items-center justify-center hover:bg-white/10 transition-all">
                  <RotateCcw size={24} />
               </button>
            </div>

         </div>
      </ToolLayout>
   );
}
