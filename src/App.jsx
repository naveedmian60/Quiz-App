import { useState } from 'react';
import Timer from './components/Timer';
import Questions from './components/Questions';
import Result from './components/Result';
import Reset from './components/Reset';

function App() {
  const [isOver, setIsOver] = useState(false);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleResetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsOver(false);
  };

 
  const progressPercentage = (currentIndex / 30) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 flex items-center justify-center p-4 antialiased selection:bg-indigo-500 selection:text-white">
      <div className="bg-slate-900/60 backdrop-blur-xl w-full max-w-2xl p-8 rounded-3xl shadow-2xl shadow-black/40 border border-slate-800/80 transition-all duration-300 relative overflow-hidden">
        
        
        {!isOver && (
          <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        )}

        {isOver ? (
          <div className="flex flex-col items-center text-center py-6">
            <Result score={score} />
            <Reset onReset={handleResetQuiz} />
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-10 border-b border-slate-800/60 pb-5">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold tracking-widest uppercase text-slate-500">
                  JavaScript Assessment
                </span>
                <span className="text-sm font-bold text-indigo-400">
                  Question {currentIndex + 1} <span className="text-slate-600">/</span> 30
                </span>
              </div>
              <Timer setIsOver={setIsOver} currentIndex={currentIndex} />
            </div>
            
            <Questions 
              setIsOver={setIsOver} 
              setScore={setScore} 
              currentIndex={currentIndex} 
              setCurrentIndex={setCurrentIndex} 
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;