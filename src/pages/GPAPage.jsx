import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout';
import { Plus, Trash2 } from 'lucide-react';

export default function GPAPage() {
  const [subjects, setSubjects] = useState([{ id: 1, grade: '', credit: '' }]);
  
  const addSubject = () => {
    setSubjects([...subjects, { id: Date.now(), grade: '', credit: '' }]);
  };

  const updateSubject = (id, field, value) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, [field]: value } : s));
  };
  
  const removeSubject = (id) => {
    if (subjects.length > 1) {
       setSubjects(subjects.filter(s => s.id !== id));
    }
  };

   const calculateGPA = () => {
      let totalCredits = 0;
      let totalPoints = 0;
      let validSubjects = 0;
      
      subjects.forEach(s => {
         const credit = parseFloat(s.credit);
         const gradeStr = s.grade?.trim().toUpperCase();
         
         if (!isNaN(credit) && credit > 0 && gradeStr) {
            let gradePoint = -1;
            
            // Map letter grades
            const gradeMap = {
               'O': 10, 'S': 10,
               'A+': 9, 'A': 8,
               'B+': 7, 'B': 6,
               'C+': 5, 'C': 4,
               'D': 3, 'P': 3,
               'F': 0
            };

            if (gradeMap[gradeStr] !== undefined) {
               gradePoint = gradeMap[gradeStr];
            } else {
               const numGrade = parseFloat(gradeStr);
               if (!isNaN(numGrade) && numGrade >= 0 && numGrade <= 10) {
                  gradePoint = numGrade;
               }
            }

            if (gradePoint !== -1) {
               totalCredits += credit;
               totalPoints += (gradePoint * credit);
               validSubjects++;
            }
         }
      });

      if (totalCredits === 0) return "0.00";
      return (totalPoints / totalCredits).toFixed(2);
   };

   const gpa = calculateGPA();
   const percentage = (parseFloat(gpa) * 9.5).toFixed(1);

   return (
    <ToolLayout title="GPA Calculator">
       <div className="glass-panel p-6 md:p-10 rounded-[2rem] max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10">
             <div className="p-6 md:p-8 bg-primary/10 border border-primary/20 rounded-3xl text-center">
                <span className="text-[9px] md:text-[10px] font-black text-primary uppercase tracking-[0.2em] block mb-2">Cumulative GPA</span>
                <span className="text-4xl md:text-6xl font-black text-white">{gpa}</span>
             </div>
             <div className="p-6 md:p-8 bg-secondary/10 border border-secondary/20 rounded-3xl text-center">
                <span className="text-[9px] md:text-[10px] font-black text-secondary uppercase tracking-[0.2em] block mb-2">Approx. Percentage</span>
                <span className="text-4xl md:text-6xl font-black text-white">{percentage}%</span>
                <p className="text-[7px] md:text-[8px] text-slate-500 mt-2 font-bold uppercase tracking-widest">(Standard 9.5 Conversion)</p>
             </div>
          </div>

          <div className="space-y-4 mb-8">
             {subjects.map((sub, index) => {
                const isValid = sub.grade === '' || (
                   ['O','S','A+','A','B+','B','C+','C','D','P','F'].includes(sub.grade?.trim().toUpperCase()) ||
                   (!isNaN(parseFloat(sub.grade)) && parseFloat(sub.grade) >= 0 && parseFloat(sub.grade) <= 10)
                );

                return (
                   <div key={sub.id} className="flex gap-4 items-center group animate-in fade-in slide-in-from-left-4 duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                      <div className="w-8 flex-shrink-0 text-slate-600 font-black text-xs">{index + 1}.</div>
                      <div className="flex-1 relative">
                         <input 
                            type="text" 
                            placeholder="Grade (O, A+, 10...)"
                            value={sub.grade}
                            onChange={(e) => updateSubject(sub.id, 'grade', e.target.value)}
                            className={`w-full bg-black/40 border ${isValid ? 'border-white/5 focus:border-primary' : 'border-red-500/50 focus:border-red-500'} rounded-xl px-4 py-4 text-white placeholder-slate-600 outline-none transition-all focus:bg-black/60`}
                         />
                         {!isValid && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-red-500 font-bold uppercase">Invalid</span>}
                      </div>
                      <input 
                         type="number" 
                         placeholder="Credits"
                         value={sub.credit}
                         onChange={(e) => updateSubject(sub.id, 'credit', e.target.value)}
                         className="w-28 flex-shrink-0 bg-black/40 border border-white/5 focus:border-primary rounded-xl px-4 py-4 text-white placeholder-slate-600 outline-none transition-all focus:bg-black/60"
                         min="1"
                      />
                      <button 
                         onClick={() => removeSubject(sub.id)}
                         className="p-4 bg-red-500/5 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all shrink-0"
                      >
                        <Trash2 size={18} />
                      </button>
                   </div>
                );
             })}
          </div>

          <button 
             onClick={addSubject}
             className="w-full bg-white/5 border border-white/5 text-slate-400 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2 group"
          >
             <Plus size={18} className="group-hover:scale-125 transition-transform" /> Add Another Subject
          </button>
       </div>
    </ToolLayout>
   );
}
