import React, { useState } from 'react';
import { placementQuestions } from '../data/questions';

export default function PlacementZone() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const companies = ["TCS", "Infosys", "Wipro", "Accenture", "Cognizant"];
  const difficulties = [
    { name: "Beginner", locked: false, desc: "First 50 Questions (Free)" },
    { name: "Intermediate", locked: true, desc: "Premium Access Required" },
    { name: "Advanced", locked: true, desc: "Premium Access Required" }
  ];

  // Filter questions based on company and difficulty
  const filteredQuestions = placementQuestions.filter(
    (q) => q.company === selectedCompany && q.difficulty === selectedDifficulty
  );

  const handleOptionClick = (option) => {
    if (isAnswered) return;
    
    setSelectedOption(option);
    setIsAnswered(true);
    
    if (option === filteredQuestions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < filteredQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setSelectedCompany(null);
    setSelectedDifficulty(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setIsAnswered(false);
    setQuizStarted(false);
  };

  const startQuiz = (difficulty) => {
    if (difficulty.locked) {
      alert("This difficulty is locked. Please upgrade to access.");
      return;
    }
    setSelectedDifficulty(difficulty.name);
    setQuizStarted(true);
  };

  const shareScore = () => {
    const text = `I just scored ${score}/${filteredQuestions.length} in the ${selectedCompany} Placement Quiz on DAKH Edu Solutions! Can you beat my score?`;
    if (navigator.share) {
      navigator.share({
        title: 'My Placement Quiz Score',
        text: text,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(text);
      alert("Score copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
          Placement Preparation
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Company-wise Placement Zone</h1>
        <p className="text-slate-400 max-w-2xl mx-auto font-medium">
          Prepare for your dream company with our curated, company-specific placement questions and instant evaluation.
        </p>
      </div>

      {!selectedCompany ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <button
              key={company}
              onClick={() => setSelectedCompany(company)}
              className="glass-panel p-8 rounded-[2rem] hover:border-primary/50 transition-all text-left group"
            >
              <h2 className="text-2xl font-black mb-2 group-hover:text-primary transition-colors">{company}</h2>
              <p className="text-sm text-slate-400">Targeted placement questions for {company}.</p>
            </button>
          ))}
        </div>
      ) : !quizStarted ? (
        <div className="glass-panel p-8 md:p-12 rounded-[3rem] max-w-3xl mx-auto">
          <button 
            onClick={() => setSelectedCompany(null)}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm font-bold uppercase tracking-widest"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to Companies
          </button>
          
          <h2 className="text-3xl font-black mb-2">{selectedCompany} Assessment</h2>
          <p className="text-slate-400 mb-8">Select your difficulty level to begin the quiz.</p>
          
          <div className="space-y-4">
            {difficulties.map((diff) => (
              <button
                key={diff.name}
                onClick={() => startQuiz(diff)}
                className={`w-full p-6 rounded-2xl flex items-center justify-between transition-all ${
                  diff.locked 
                    ? 'bg-white/5 border border-white/5 opacity-70 cursor-not-allowed' 
                    : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50'
                }`}
              >
                <div className="text-left">
                  <h3 className={`text-xl font-black mb-1 ${!diff.locked && 'text-primary'}`}>{diff.name}</h3>
                  <p className="text-sm text-slate-400">{diff.desc}</p>
                </div>
                {diff.locked ? (
                  <span className="material-symbols-outlined text-slate-500">lock</span>
                ) : (
                  <span className="material-symbols-outlined text-primary">arrow_forward</span>
                )}
              </button>
            ))}
          </div>
        </div>
      ) : showScore ? (
        <div className="glass-panel p-12 rounded-[3rem] max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-primary text-5xl">emoji_events</span>
          </div>
          <h2 className="text-4xl font-black mb-2">Quiz Completed!</h2>
          <p className="text-slate-400 mb-8 font-medium">Here is your performance for {selectedCompany} ({selectedDifficulty}).</p>
          
          <div className="text-6xl font-black text-primary mb-8">
            {score} <span className="text-2xl text-slate-400">/ {filteredQuestions.length}</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={restartQuiz}
              className="py-4 px-8 rounded-xl bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-widest text-[10px] transition-all border border-white/10"
            >
              Try Another Company
            </button>
            <button 
              onClick={shareScore}
              className="py-4 px-8 rounded-xl bg-primary text-[#004050] font-black uppercase tracking-widest text-[10px] shadow-[0_10px_30px_rgba(105,218,255,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Share Score
              <span className="material-symbols-outlined text-sm">share</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="glass-panel p-8 md:p-12 rounded-[3rem] max-w-3xl mx-auto">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-10">
              <h3 className="text-2xl font-black mb-4">No questions available</h3>
              <p className="text-slate-400 mb-8">We are still adding questions for this company and difficulty level.</p>
              <button 
                onClick={restartQuiz}
                className="py-3 px-6 rounded-xl bg-primary text-[#004050] font-black uppercase tracking-widest text-[10px]"
              >
                Go Back
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{selectedCompany}</span>
                  <div className="text-sm text-slate-400 mt-1">{filteredQuestions[currentQuestionIndex].topic}</div>
                </div>
                <div className="text-sm font-black bg-white/10 px-4 py-2 rounded-full border border-white/10">
                  Question {currentQuestionIndex + 1} / {filteredQuestions.length}
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-8 whitespace-pre-wrap">
                {filteredQuestions[currentQuestionIndex].question}
              </h3>
              
              <div className="space-y-4 mb-8">
                {filteredQuestions[currentQuestionIndex].options.map((option, index) => {
                  const isCorrect = option === filteredQuestions[currentQuestionIndex].answer;
                  const isSelected = selectedOption === option;
                  
                  let buttonClass = "w-full text-left p-5 rounded-2xl border transition-all font-medium text-lg ";
                  
                  if (!isAnswered) {
                    buttonClass += "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30";
                  } else {
                    if (isCorrect) {
                      buttonClass += "bg-green-500/20 border-green-500/50 text-green-400";
                    } else if (isSelected) {
                      buttonClass += "bg-red-500/20 border-red-500/50 text-red-400";
                    } else {
                      buttonClass += "bg-white/5 border-white/5 opacity-50";
                    }
                  }
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      disabled={isAnswered}
                      className={buttonClass}
                    >
                      <div className="flex justify-between items-center">
                        <span>{option}</span>
                        {isAnswered && isCorrect && <span className="material-symbols-outlined text-green-400">check_circle</span>}
                        {isAnswered && isSelected && !isCorrect && <span className="material-symbols-outlined text-red-400">cancel</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
              
              {isAnswered && (
                <div className="flex justify-end animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <button 
                    onClick={handleNextQuestion}
                    className="py-4 px-8 rounded-xl bg-white text-black font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                  >
                    {currentQuestionIndex + 1 === filteredQuestions.length ? 'See Results' : 'Next Question'}
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
