import { useEffect, useRef, useState } from 'react';

export default function Timer({ onTimeUp }) {
  const [leftTime, setLeftTime] = useState(30 * 60);
  const onTimeUpRef = useRef(onTimeUp);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setLeftTime((previous) => {
        if (previous <= 1) {
          window.clearInterval(intervalId);
          onTimeUpRef.current();
          return 0;
        }
        return previous - 1;
      });
    }, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  const minutes = Math.floor(leftTime / 60).toString().padStart(2, '0');
  const seconds = (leftTime % 60).toString().padStart(2, '0');
  const isDanger = leftTime < 300;

  return (
    <div className={`flex items-center gap-2 rounded-xl border px-4 py-2 font-mono text-sm font-black tracking-widest ${isDanger ? 'border-rose-400/20 bg-rose-400/10 text-rose-200' : 'border-cyan-300/15 bg-cyan-300/5 text-cyan-200'}`} aria-label={`Time remaining ${minutes} minutes ${seconds} seconds`}>
      <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${isDanger ? 'bg-rose-300' : 'bg-cyan-300'}`} />
      <span>{minutes}:{seconds}</span>
    </div>
  );
}
