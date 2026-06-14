import React from 'react';
import question from './question.json';

const Questions = ({ setIsOver, setScore, currentIndex, setCurrentIndex }) => {
  
  const handleOptionClick = (option) => {
    const isCorrect = option === question[currentIndex].answer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    if (currentIndex + 1 < question.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsOver(true);
    }
  };

  return (
    <div className="space-y-8">
    
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 leading-snug tracking-tight min-h-[90px]">
        {question[currentIndex].question}
      </h2>
      
      <div className="flex flex-col gap-4">
        {question[currentIndex].options.map((option) => (
          <button 
            key={option} 
            onClick={() => handleOptionClick(option)}
            className="w-full text-left px-6 py-4 bg-slate-800/40 border-2 border-slate-700/60 hover:border-indigo-500 hover:bg-slate-800/80 text-slate-300 text-base md:text-lg font-semibold rounded-2xl transition-all duration-150 active:scale-[0.99] focus:outline-none"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Questions;