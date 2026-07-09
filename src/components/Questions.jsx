import React from 'react';

const Questions = ({ questionsPool, setIsOver, setScore, currentIndex, setCurrentIndex }) => {
  const currentQuestionData = questionsPool[currentIndex];

  const handleOptionClick = (option) => {
    const isCorrect = option === currentQuestionData.answer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    if (currentIndex + 1 < questionsPool.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsOver(true);
    }
  };

  if (!currentQuestionData) return null;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Question Level Badge & Text */}
      <div className="space-y-3">
        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border ${
          currentQuestionData.level === 'Hard' ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' :
          currentQuestionData.level === 'Intermediate' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
          'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
        }`}>
          {currentQuestionData.level} Module
        </span>
        <h2 className="text-xl md:text-2xl font-bold text-slate-100 leading-relaxed tracking-tight min-h-[80px]">
          {currentQuestionData.question}
        </h2>
      </div>
      
      {/* Options Grid/List */}
      <div className="flex flex-col gap-4">
        {currentQuestionData.options.map((option, index) => (
          <button 
            key={option} 
            onClick={() => handleOptionClick(option)}
            className="group w-full text-left px-6 py-4 bg-slate-900/40 border border-slate-800 hover:border-purple-500/60 hover:bg-gradient-to-r hover:from-purple-950/30 hover:to-indigo-950/30 text-slate-300 hover:text-white text-base md:text-lg font-medium rounded-2xl transition-all duration-300 active:scale-[0.99] focus:outline-none flex items-center justify-between shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
          >
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 rounded-xl bg-slate-800 group-hover:bg-purple-600/20 group-hover:text-purple-400 flex items-center justify-center text-xs font-bold text-slate-500 border border-slate-700/50 group-hover:border-purple-500/30 transition-colors duration-300">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="font-semibold">{option}</span>
            </div>
            <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-purple-400 text-sm font-bold transition-all duration-300">
              ⚡
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Questions;