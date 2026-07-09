import React from 'react';

const Result = ({ score }) => {
  const percentage = (score / 30) * 100;
  let feedback = "Keep Practicing! 💡";
  let gradientText = "from-amber-400 to-orange-400";
  
  if (percentage >= 80) {
    feedback = "Absolute JavaScript Master! 👑";
    gradientText = "from-cyan-400 via-purple-400 to-pink-400";
  } else if (percentage >= 50) {
    feedback = "Great Job! Good Effort. 👍";
    gradientText = "from-indigo-400 to-purple-400";
  }

  return (
    <div className="space-y-6 w-full flex flex-col items-center animate-scale-up">
      <h2 className={`text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${gradientText} tracking-tight`}>
        Quiz Completed!
      </h2>
      <p className="text-slate-400 font-semibold text-base md:text-lg">{feedback}</p>
      
      {/* Luxury Radial Circle Display */}
      <div className="relative inline-flex items-center justify-center w-40 h-40 bg-gradient-to-b from-purple-500/10 to-indigo-500/5 border border-purple-500/20 text-purple-400 rounded-full my-6 shadow-[0_0_50px_rgba(168,85,247,0.15)]">
        <div className="flex flex-col items-center">
          <span className="text-6xl font-black text-slate-50 bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent tracking-tight">{score}</span>
          <span className="text-[10px] font-black tracking-[0.2em] text-purple-400/70 mt-1">SCORE</span>
        </div>
      </div>
      
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em]">
        Out of 30 Questions Correct ({Math.round(percentage)}%)
      </p>
    </div>
  );
};

export default Result;