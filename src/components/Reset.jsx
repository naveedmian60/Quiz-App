import React from 'react';

const Reset = ({ onReset }) => {
  return (
    <button 
      onClick={onReset} 
      className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold px-10 py-4 rounded-2xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 active:scale-[0.97] flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
    >
      <span>🔄</span> Restart Journey
    </button>
  );
};

export default Reset;