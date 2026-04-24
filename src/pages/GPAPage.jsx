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
     
     subjects.forEach(s => {
        const credit = parseFloat(s.credit);
        const gradeStr = s.grade?.toUpperCase();
        if (!isNaN(credit) && gradeStr) {
           let gradePoint = 0;
           if (gradeStr === 'O' || gradeStr === 'S') gradePoint = 10;
           else if (gradeStr === 'A+') gradePoint = 9;
           else if (gradeStr === 'A') gradePoint = 8;
           else if (gradeStr === 'B+') gradePoint = 7;
           else if (gradeStr === 'B') gradePoint = 6;
           else if (gradeStr === 'C') gradePoint = 5;
           else if (!isNaN(parseFloat(gradeStr))) gradePoint = parseFloat(gradeStr);

           totalCredits += credit;
           totalPoints += (gradePoint * credit);
        }
     });

     if (totalCredits === 0) return 0;
     return (totalPoints / totalCredits).toFixed(2);
  };

  return (
    <ToolLayout title="GPA Calculator">
       <div className="glass-panel p-6 md:p-10 rounded-[2rem] max-w-2xl mx-auto">
          <div className="mb-8 p-8 bg-primary/10 border border-primary/20 rounded-2xl text-center">
             <span className="text-sm font-bold text-primary uppercase tracking-widest block mb-2">Final GPA</span>
             <span className="text-6xl font-black text-white">{calculateGPA() || '0.00'}</span>
          </div>

          <div className="space-y-4 mb-8">
             {subjects.map((sub, index) => (
                <div key={sub.id} className="flex gap-4 items-center">
                   <div className="w-8 flex-shrink-0 text-slate-500 font-bold">{index + 1}.</div>
                   <input 
                      type="text" 
                      placeholder="Grade (e.g. 9 or A)"
                      value={sub.grade}
                      onChange={(e) => updateSubject(sub.id, 'grade', e.target.value)}
                      className="flex-1 bg-black/40 border border-white/10 focus:border-primary rounded-xl px-4 py-3 text-white placeholder-slate-600 outline-none w-full"
                   />
                   <input 
                      type="number" 
                      placeholder="Credit"
                      value={sub.credit}
                      onChange={(e) => updateSubject(sub.id, 'credit', e.target.value)}
                      className="w-24 flex-shrink-0 bg-black/40 border border-white/10 focus:border-primary rounded-xl px-4 py-3 text-white placeholder-slate-600 outline-none"
                      min="1"
                   />
                   <button 
                      onClick={() => removeSubject(sub.id)}
                      className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-xl transition-colors shrink-0"
                   >
                     <Trash2 size={20} />
                   </button>
                </div>
             ))}
          </div>

          <button 
             onClick={addSubject}
             className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
             <Plus size={18} /> Add Subject
          </button>
       </div>
    </ToolLayout>
  );
}
