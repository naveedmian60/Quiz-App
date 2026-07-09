import React, { useEffect, useState } from 'react';

const Timer = ({ setIsOver }) => {
  const [leftTime, setLeftTime] = useState(1800);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLeftTime(prev => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setIsOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [setIsOver]);

  const minutes = Math.floor(leftTime / 60).toString().padStart(2, '0');
  const seconds = (leftTime % 60).toString().padStart(2, '0');

  // Danger styling if less than 5 minutes left
  const isDanger = leftTime < 300;

  return (
    <div className={`backdrop-blur-md font-mono border font-black px-4 py-2 rounded-xl text-xs md:text-sm tracking-widest flex items-center gap-2.5 shadow-lg transition-colors duration-300 ${
      isDanger 
        ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' 
        : 'bg-cyan-500/5 border-cyan-500/20 text-cyan-400 shadow-cyan-500/5'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isDanger ? 'bg-rose-500 animate-ping' : 'bg-cyan-400 animate-pulse'}`}></span>
      <span>{minutes}:{seconds}</span>
    </div>
  );
};

export default Timer;