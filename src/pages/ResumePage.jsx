import React from 'react';
import ToolLayout from '../components/ToolLayout';

export default function ResumePage() {
   return (
      <ToolLayout title="Resume Builder">
         <div className="glass-panel p-10 rounded-[2rem] max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(105,218,255,0.3)]">
               <span className="material-symbols-outlined text-primary text-4xl">contact_page</span>
            </div>
            <h2 className="text-2xl font-black mb-4">ATS-Optimized Resume Builder</h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
               Our powerful resume engine is currently undergoing architecture upgrades. We are integrating advanced AI bullet-point generation nodes. Check back soon.
            </p>
            <button className="bg-primary/20 text-primary border border-primary/30 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs cursor-not-allowed">
               Currently Upgrading...
            </button>
         </div>
      </ToolLayout>
   );
}
