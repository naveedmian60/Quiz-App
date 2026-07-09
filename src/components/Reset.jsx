import React from 'react';

const Reset = ({ onReset }) => {
  return (
    <button 
      onClick={onReset} 
      className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-widest px-10 py-4 rounded-2xl shadow-[0_10px_25px_rgba(147,51,234,0.3)] hover:shadow-[0_15px_35px_rgba(147,51,234,0.5)] transition-all duration-300 active:scale-[0.97] flex items-center gap-3 focus:outline-none border border-purple-400/30"
    >
      <span className="text-base">🔄</span> Restart Journey
    </button>
  );
};

export default Reset;