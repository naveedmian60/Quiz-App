import React from 'react';

const Result = ({ score }) => {
  // Dynamic message based on score
  const percentage = (score / 30) * 100;
  let feedback = "Keep Practicing!";
  if (percentage >= 80) feedback = "Absolute JavaScript Master! 👑";
  else if (percentage >= 50) feedback = "Great Job! Good Effort. 👍";

  return (
    <div className="space-y-6">
      <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 tracking-tight">
        Quiz Completed!
      </h2>
      <p className="text-slate-400 font-medium text-lg">{feedback}</p>
      
      <div className="relative inline-flex items-center justify-center w-36 h-36 bg-gradient-to-b from-indigo-500/20 to-purple-500/5 border-2 border-indigo-500/30 text-indigo-400 rounded-full my-6 shadow-2xl shadow-indigo-500/20">
        <div className="flex flex-col items-center">
          <span className="text-5xl font-black text-slate-100">{score}</span>
          <span className="text-xs font-bold text-slate-500 mt-1">SCORE</span>
        </div>
      </div>
      
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
        Out of 30 Questions Correct
      </p>
    </div>
  );
};

export default Result;