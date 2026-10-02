import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import Questions from '../components/Questions';
import Reset from '../components/Reset';
import Result from '../components/Result';
import Timer from '../components/Timer';
import { LANGUAGES } from '../data/languages';

const QUESTIONS_PER_QUIZ = 30;
const QUESTION_DECK_STORAGE_PREFIX = 'codequest.question-deck.';

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function getNextQuestions(language) {
  const storageKey = `${QUESTION_DECK_STORAGE_PREFIX}${language.id}`;
  const questionById = new Map(language.questions.map((question) => [question.id, question]));
  let deck = [];

  try {
    const storedDeck = JSON.parse(window.localStorage.getItem(storageKey) || '[]');
    if (Array.isArray(storedDeck)) {
      deck = storedDeck.filter((id, index) => questionById.has(id) && storedDeck.indexOf(id) === index);
    }
  } catch {
    deck = [];
  }

  if (!deck.length) {
    deck = shuffle([...questionById.keys()]);
  }

  const selectedIds = deck.splice(0, Math.min(QUESTIONS_PER_QUIZ, deck.length));

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(deck));
  } catch {
    // The current quiz still works if browser storage is unavailable.
  }

  return selectedIds.map((id) => questionById.get(id));
}

export default function Quiz() {
  const { language: languageId } = useParams();
  const language = LANGUAGES[languageId];

  if (!language) {
    return (
      <section className="rounded-3xl border border-white/10 bg-[#101626] p-8 text-center">
        <h1 className="text-2xl font-black text-white">That language is not available</h1>
        <Link className="mt-5 inline-block font-bold text-violet-300" to="/languages">Choose a language</Link>
      </section>
    );
  }

  return <QuizAttempt key={language.id} language={language} />;
}

function QuizAttempt({ language }) {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(() => getNextQuestions(language));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [saveState, setSaveState] = useState('idle');
  const [saveError, setSaveError] = useState('');
  const completedRef = useRef(false);

  const finishQuiz = useCallback(() => {
    if (completedRef.current || !questions.length) return;
    completedRef.current = true;
    const score = questions.reduce(
      (total, question, index) => total + (answers[index] === question.correctAnswer ? 1 : 0),
      0,
    );
    setResult({
      score,
      totalQuestions: questions.length,
      percentage: Math.round((score / questions.length) * 100),
      completedAt: new Date().toISOString(),
    });
  }, [answers, questions]);

  useEffect(() => {
    if (!result) return undefined;
    let active = true;
    api.post('/quiz/result', {
      language: language.id,
      score: result.score,
      totalQuestions: result.totalQuestions,
    })
      .then(() => {
        if (active) setSaveState('saved');
      })
      .catch((error) => {
        if (active) {
          setSaveError(error.message);
          setSaveState('failed');
        }
      });
    return () => { active = false; };
  }, [result, language]);

  const progress = useMemo(
    () => questions.length ? (currentIndex / questions.length) * 100 : 0,
    [currentIndex, questions.length],
  );

  const restartQuiz = () => {
    setQuestions(getNextQuestions(language));
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
    setSaveState('idle');
    setSaveError('');
    completedRef.current = false;
  };

  return (
    <section className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#101626] shadow-2xl shadow-black/20">
      {!result && (
        <div className="h-1 w-full bg-white/5">
          <div className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all" style={{ width: `${progress}%` }} />
        </div>
      )}
      <div className="p-5 sm:p-8 md:p-10">
        {result ? (
          <div className="flex flex-col items-center text-center">
            <Result
              language={language.name}
              score={result.score}
              totalQuestions={result.totalQuestions}
              percentage={result.percentage}
              saveState={saveState === 'idle' ? 'saving' : saveState}
              saveError={saveError}
            />
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Reset onReset={restartQuiz} label="Restart quiz" />
              <button onClick={() => navigate('/languages')} className="rounded-xl border border-white/10 px-5 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/5">Choose another language</button>
              <button onClick={() => navigate('/dashboard')} className="rounded-xl border border-white/10 px-5 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/5">Dashboard</button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 flex items-center justify-between gap-4 border-b border-white/5 pb-6">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-300">Selected language: {language.name}</p>
                <h1 className="mt-2 text-xl font-bold text-white">Question {currentIndex + 1} <span className="text-slate-500">/ {questions.length}</span></h1>
              </div>
              <Timer onTimeUp={finishQuiz} />
            </div>
            <Questions
              questionsPool={questions}
              currentIndex={currentIndex}
              selectedAnswers={answers}
              onSelectAnswer={(index, answer) => setAnswers((current) => ({ ...current, [index]: answer }))}
              onNext={() => currentIndex + 1 < questions.length ? setCurrentIndex((index) => index + 1) : finishQuiz()}
            />
          </>
        )}
      </div>
    </section>
  );
}
