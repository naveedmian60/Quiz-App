export default function Result({ language = 'Quiz', score, totalQuestions = 10, percentage, saveState, saveError }) {
  const calculatedPercentage = percentage ?? (totalQuestions ? Math.round((score / totalQuestions) * 100) : 0);
  const feedback = calculatedPercentage >= 80
    ? 'Excellent work — you know this language well.'
    : calculatedPercentage >= 50
      ? 'Good progress — keep practicing to improve your score.'
      : 'Every attempt is practice. Review the topic and try again.';

  return (
    <div className="flex w-full flex-col items-center py-3">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-300">{language} quiz completed</p>
      <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">Your result</h1>
      <p className="mt-2 text-sm text-slate-400">{feedback}</p>
      <div className="my-7 grid h-36 w-36 place-items-center rounded-full border border-violet-300/20 bg-violet-500/10 shadow-lg shadow-violet-950/30">
        <div>
          <span className="block text-5xl font-black text-white">{score}<span className="text-2xl text-slate-500">/{totalQuestions}</span></span>
          <span className="mt-1 block text-xs font-black uppercase tracking-[0.18em] text-violet-300">{calculatedPercentage}%</span>
        </div>
      </div>
      <div className="grid w-full max-w-sm grid-cols-2 gap-3 text-left">
        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
          <p className="text-xs text-slate-500">Correct</p>
          <p className="mt-1 text-xl font-black text-emerald-200">{score}</p>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
          <p className="text-xs text-slate-500">Incorrect</p>
          <p className="mt-1 text-xl font-black text-rose-200">{totalQuestions - score}</p>
        </div>
      </div>
      <p className="mt-5 text-xs text-slate-500" role="status" aria-live="polite">
        {saveState === 'saving' && 'Saving your result…'}
        {saveState === 'saved' && 'Result saved to your quiz history.'}
        {saveState === 'failed' && (saveError || 'Your result could not be saved. Check your server connection.')}
      </p>
    </div>
  );
}
