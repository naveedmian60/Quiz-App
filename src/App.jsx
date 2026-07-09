import { useState, useEffect } from 'react';
import Timer from './components/Timer';
import Questions from './components/Questions';
import Result from './components/Result';
import Reset from './components/Reset';
import allQuestions from './question.json';

function App() {
  const [isOver, setIsOver] = useState(false);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([]);

  const generateQuizQuestions = () => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    setQuizQuestions(shuffled.slice(0, 30));
  };

  useEffect(() => {
    generateQuizQuestions();
  }, []);

  const handleResetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsOver(false);
    generateQuizQuestions();
  };

  const progressPercentage = (currentIndex / 30) * 100;

  if (quizQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-t-purple-500 border-r-transparent border-b-indigo-500 border-l-transparent rounded-full animate-spin"></div>
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-black tracking-[0.2em] text-sm uppercase">
            Initializing Core Pool...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060913] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/40 via-[#060913] to-[#02040a] flex items-center justify-center p-4 antialiased selection:bg-purple-500 selection:text-white relative overflow-hidden">
      
      {/* Background Decorative Premium Lights */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="bg-[#0d1527]/50 backdrop-blur-2xl w-full max-w-2xl p-6 md:p-10 rounded-[32px] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7)] border border-slate-800/60 transition-all duration-300 relative overflow-hidden">
        
        {/* Dynamic Neon Top Progress Bar */}
        {!isOver && (
          <div className="absolute top-0 left-0 w-full h-[3px] bg-slate-900">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        )}

        {isOver ? (
          <div className="flex flex-col items-center text-center py-4">
            <Result score={score} />
            <Reset onReset={handleResetQuiz} />
          </div>
        ) : (
          <>
            {/* Header Section */}
            <div className="flex justify-between items-center mb-10 border-b border-slate-800/40 pb-6">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] md:text-xs font-black tracking-[0.25em] uppercase text-indigo-400/80">
                  JS Elite Masterclass
                </span>
                <span className="text-lg font-extrabold text-slate-100 flex items-center gap-1.5">
                  <span className="text-slate-500 text-sm font-semibold">Question</span>
                  <span className="bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">{currentIndex + 1}</span>
                  <span className="text-purple-500/40">/</span>
                  <span className="text-slate-500 text-sm font-semibold">30</span>
                </span>
              </div>
              <Timer setIsOver={setIsOver} />
            </div>
            
            {/* Questions Container */}
            <Questions 
              questionsPool={quizQuestions}
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