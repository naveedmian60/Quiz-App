import React, { useEffect, useState } from 'react';

const Timer = ({ setIsOver, currentIndex }) => {
  const [leftTime, setLeftTime] = useState(1800);
  const [displayTime, setdisplayTime] = useState("");

  useEffect(() => {
    setLeftTime(1800);
  }, []);

  useEffect(() => {
    let intervalId = setInterval(() => {
      setLeftTime(prev => {
        if (prev <= 0) {
          clearInterval(intervalId);
          setIsOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentIndex, setIsOver]);

  useEffect(() => {
    let minutes = Math.floor(leftTime / 60).toString().padStart(2, '0');
    let seconds = (leftTime % 60).toString().padStart(2, '0');
    setdisplayTime(`${minutes}:${seconds}`);
  }, [leftTime]);

  return (
    <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 font-black px-4 py-2 rounded-xl text-sm tracking-widest flex items-center gap-2 shadow-inner">
      <span className="animate-pulse">⏳</span> {displayTime}
    </div>
  );
};

export default Timer;