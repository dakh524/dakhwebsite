import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout';
import { Plus, Trash2, Download, User, Briefcase, GraduationCap, Code } from 'lucide-react';

export default function ResumePage() {
   const [profile, setProfile] = useState({
      name: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
   });

   const [experience, setExperience] = useState([
      { id: 1, company: '', role: '', duration: '', desc: '' }
   ]);

   const [education, setEducation] = useState([
      { id: 1, school: '', degree: '', year: '' }
   ]);

   const [skills, setSkills] = useState('');

   const addExperience = () => setExperience([...experience, { id: Date.now(), company: '', role: '', duration: '', desc: '' }]);
   const removeExperience = (id) => setExperience(experience.filter(e => e.id !== id));
   
   const addEducation = () => setEducation([...education, { id: Date.now(), school: '', degree: '', year: '' }]);
   const removeEducation = (id) => setEducation(education.filter(e => e.id !== id));

   const handlePrint = () => {
      window.print();
   };

   return (
      <ToolLayout title="Professional Resume Builder">
         <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 max-w-7xl mx-auto px-4">
            
            {/* Editor Side */}
            <div className="space-y-8 no-print">
               {/* Personal Info */}
               <section className="glass-panel p-8 rounded-[2.5rem]">
                  <div className="flex items-center gap-3 mb-6">
                     <User className="text-primary" size={20} />
                     <h3 className="font-black uppercase tracking-widest text-sm">Personal Identity</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <input 
                        type="text" placeholder="Full Name" 
                        value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})}
                        className="bg-black/40 border border-white/5 focus:border-primary rounded-xl px-4 py-3 text-white outline-none"
                     />
                     <input 
                        type="email" placeholder="Email Address" 
                        value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})}
                        className="bg-black/40 border border-white/5 focus:border-primary rounded-xl px-4 py-3 text-white outline-none"
                     />
                     <input 
                        type="text" placeholder="Phone" 
                        value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})}
                        className="bg-black/40 border border-white/5 focus:border-primary rounded-xl px-4 py-3 text-white outline-none"
                     />
                     <input 
                        type="text" placeholder="Location" 
                        value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})}
                        className="bg-black/40 border border-white/5 focus:border-primary rounded-xl px-4 py-3 text-white outline-none"
                     />
                  </div>
                  <textarea 
                     placeholder="Professional Summary" 
                     value={profile.summary} onChange={e => setProfile({...profile, summary: e.target.value})}
                     className="w-full mt-4 bg-black/40 border border-white/5 focus:border-primary rounded-xl px-4 py-3 text-white outline-none h-32 resize-none"
                  />
               </section>

               {/* Experience */}
               <section className="glass-panel p-8 rounded-[2.5rem]">
                  <div className="flex items-center justify-between mb-6">
                     <div className="flex items-center gap-3">
                        <Briefcase className="text-secondary" size={20} />
                        <h3 className="font-black uppercase tracking-widest text-sm">Experience</h3>
                     </div>
                     <button onClick={addExperience} className="p-2 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20 transition-all">
                        <Plus size={18} />
                     </button>
                  </div>
                  <div className="space-y-6">
                     {experience.map((exp, idx) => (
                        <div key={exp.id} className="p-6 bg-black/20 rounded-2xl border border-white/5 space-y-4">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <input 
                                 type="text" placeholder="Company" 
                                 value={exp.company} onChange={e => {
                                    const newExp = [...experience];
                                    newExp[idx].company = e.target.value;
                                    setExperience(newExp);
                                 }}
                                 className="bg-black/40 border border-white/5 focus:border-secondary rounded-xl px-4 py-3 text-white outline-none"
                              />
                              <input 
                                 type="text" placeholder="Role" 
                                 value={exp.role} onChange={e => {
                                    const newExp = [...experience];
                                    newExp[idx].role = e.target.value;
                                    setExperience(newExp);
                                 }}
                                 className="bg-black/40 border border-white/5 focus:border-secondary rounded-xl px-4 py-3 text-white outline-none"
                              />
                           </div>
                           <input 
                              type="text" placeholder="Duration (e.g. 2021 - Present)" 
                              value={exp.duration} onChange={e => {
                                 const newExp = [...experience];
                                 newExp[idx].duration = e.target.value;
                                 setExperience(newExp);
                              }}
                              className="w-full bg-black/40 border border-white/5 focus:border-secondary rounded-xl px-4 py-3 text-white outline-none"
                           />
                           <textarea 
                              placeholder="Key Achievements" 
                              value={exp.desc} onChange={e => {
                                 const newExp = [...experience];
                                 newExp[idx].desc = e.target.value;
                                 setExperience(newExp);
                              }}
                              className="w-full bg-black/40 border border-white/5 focus:border-secondary rounded-xl px-4 py-3 text-white outline-none h-24 resize-none"
                           />
                           {experience.length > 1 && (
                              <button onClick={() => removeExperience(exp.id)} className="text-red-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 hover:opacity-80">
                                 <Trash2 size={12} /> Remove
                              </button>
                           )}
                        </div>
                     ))}
                  </div>
               </section>

               {/* Education */}
               <section className="glass-panel p-8 rounded-[2.5rem]">
                  <div className="flex items-center justify-between mb-6">
                     <div className="flex items-center gap-3">
                        <GraduationCap className="text-primary" size={20} />
                        <h3 className="font-black uppercase tracking-widest text-sm">Education</h3>
                     </div>
                     <button onClick={addEducation} className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all">
                        <Plus size={18} />
                     </button>
                  </div>
                  <div className="space-y-6">
                     {education.map((edu, idx) => (
                        <div key={edu.id} className="p-6 bg-black/20 rounded-2xl border border-white/5 space-y-4">
                           <input 
                              type="text" placeholder="Institution" 
                              value={edu.school} onChange={e => {
                                 const newEdu = [...education];
                                 newEdu[idx].school = e.target.value;
                                 setEducation(newEdu);
                              }}
                              className="w-full bg-black/40 border border-white/5 focus:border-primary rounded-xl px-4 py-3 text-white outline-none"
                           />
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <input 
                                 type="text" placeholder="Degree" 
                                 value={edu.degree} onChange={e => {
                                    const newEdu = [...education];
                                    newEdu[idx].degree = e.target.value;
                                    setEducation(newEdu);
                                 }}
                                 className="bg-black/40 border border-white/5 focus:border-primary rounded-xl px-4 py-3 text-white outline-none"
                              />
                              <input 
                                 type="text" placeholder="Year" 
                                 value={edu.year} onChange={e => {
                                    const newEdu = [...education];
                                    newEdu[idx].year = e.target.value;
                                    setEducation(newEdu);
                                 }}
                                 className="bg-black/40 border border-white/5 focus:border-primary rounded-xl px-4 py-3 text-white outline-none"
                              />
                           </div>
                           {education.length > 1 && (
                              <button onClick={() => removeEducation(edu.id)} className="text-red-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 hover:opacity-80">
                                 <Trash2 size={12} /> Remove
                              </button>
                           )}
                        </div>
                     ))}
                  </div>
               </section>

               {/* Skills */}
               <section className="glass-panel p-8 rounded-[2.5rem]">
                  <div className="flex items-center gap-3 mb-6">
                     <Code className="text-secondary" size={20} />
                     <h3 className="font-black uppercase tracking-widest text-sm">Skills & Core Competencies</h3>
                  </div>
                  <textarea 
                     placeholder="React, Node.js, Python, Project Management, etc. (Comma separated)" 
                     value={skills} onChange={e => setSkills(e.target.value)}
                     className="w-full bg-black/40 border border-white/5 focus:border-secondary rounded-xl px-4 py-3 text-white outline-none h-24 resize-none"
                  />
               </section>

               <button 
                  onClick={handlePrint}
                  className="w-full bg-primary text-[#004050] py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-[0_0_30px_rgba(105,218,255,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
               >
                  <Download size={18} /> Export PDF / Print
               </button>
            </div>

            {/* Preview Side */}
            <div className="sticky top-24 hidden xl:block">
               <div className="bg-white text-slate-900 rounded-[2rem] shadow-2xl p-12 min-h-[842px] w-full origin-top scale-[0.85] xl:scale-[0.95]">
                  {/* Header */}
                  <header className="border-b-2 border-slate-900 pb-8 mb-8">
                     <h1 className="text-4xl font-black uppercase tracking-tight mb-2">{profile.name || 'Your Name'}</h1>
                     <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-500">
                        <span>{profile.email || 'email@example.com'}</span>
                        <span>{profile.phone || '+91 00000 00000'}</span>
                        <span>{profile.location || 'City, Country'}</span>
                     </div>
                  </header>

                  {/* Summary */}
                  {profile.summary && (
                     <section className="mb-8">
                        <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-3">Professional Profile</h4>
                        <p className="text-sm leading-relaxed text-slate-700">{profile.summary}</p>
                     </section>
                  )}

                  {/* Experience */}
                  <section className="mb-8">
                     <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-4">Work Experience</h4>
                     <div className="space-y-6">
                        {experience.map(exp => (
                           <div key={exp.id}>
                              <div className="flex justify-between items-start mb-1">
                                 <h5 className="font-black text-base">{exp.role || 'Designation'}</h5>
                                 <span className="text-xs font-bold text-slate-400">{exp.duration || 'Period'}</span>
                              </div>
                              <div className="text-sm font-bold text-slate-600 mb-2">{exp.company || 'Company Name'}</div>
                              <p className="text-xs leading-relaxed text-slate-500 whitespace-pre-wrap">{exp.desc}</p>
                           </div>
                        ))}
                     </div>
                  </section>

                  {/* Education */}
                  <section className="mb-8">
                     <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-4">Education</h4>
                     <div className="space-y-4">
                        {education.map(edu => (
                           <div key={edu.id}>
                              <div className="flex justify-between items-center mb-1">
                                 <h5 className="font-black text-sm">{edu.degree || 'Degree/Course'}</h5>
                                 <span className="text-xs font-bold text-slate-400">{edu.year || 'Year'}</span>
                              </div>
                              <div className="text-xs font-bold text-slate-500">{edu.school || 'University/School'}</div>
                           </div>
                        ))}
                     </div>
                  </section>

                  {/* Skills */}
                  {skills && (
                     <section>
                        <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-3">Technical Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                           {skills.split(',').map((s, i) => (
                              <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-[10px] font-black uppercase tracking-wider">
                                 {s.trim()}
                              </span>
                           ))}
                        </div>
                     </section>
                  )}
               </div>
            </div>

         </div>

         {/* Print Styles */}
         <style>{`
            @media print {
               @page {
                  margin: 0;
                  size: A4;
               }
               body, .min-h-screen, #root, .bg-\\[\\#0a0e14\\], .bg-background {
                  background: white !important;
                  color: black !important;
                  margin: 0 !important;
                  padding: 0 !important;
                  -webkit-print-color-adjust: exact;
               }
               .no-print {
                  display: none !important;
               }
               .pt-24, .pb-20, .px-6, .max-w-4xl, .mb-10, .border-b, .mt-20, .pt-12 {
                  padding: 0 !important;
                  margin: 0 !important;
                  border: none !important;
               }
               .glass-panel {
                  border: none !important;
                  backdrop-filter: none !important;
                  background: transparent !important;
                  padding: 0 !important;
                  box-shadow: none !important;
               }
               .xl\\:block {
                  display: block !important;
                  position: absolute !important;
                  top: 0 !important;
                  left: 0 !important;
                  width: 100% !important;
                  height: 100% !important;
               }
               .bg-white {
                  background: white !important;
                  color: black !important;
                  width: 100% !important;
                  min-height: 297mm !important; /* A4 height */
                  padding: 20mm !important; /* Standard resume padding */
                  border-radius: 0 !important;
                  box-shadow: none !important;
                  transform: none !important;
                  scale: 1 !important;
                  margin: 0 !important;
               }
               .text-primary {
                  color: #006880 !important; /* Darker version of primary for print visibility */
               }
               .text-slate-900, .text-slate-700, .text-slate-600, .text-slate-500 {
                  color: black !important;
               }
               .bg-slate-100 {
                  background: #f0f0f0 !important;
                  border: 1px solid #ddd !important;
               }
               h1 { font-size: 28pt !important; }
               h4 { border-bottom: 1px solid #eee !important; padding-bottom: 4px !important; margin-bottom: 12px !important; }
               .text-[10px] { font-size: 9pt !important; }
               .text-xs { font-size: 9pt !important; }
               .text-sm { font-size: 10pt !important; }
               .text-base { font-size: 11pt !important; }
            }
         `}</style>
      </ToolLayout>
   );
}
