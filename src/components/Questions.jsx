export default function Questions({
  questionsPool,
  currentIndex,
  selectedAnswers,
  onSelectAnswer,
  onNext,
}) {
  const currentQuestionData = questionsPool[currentIndex];
  if (!currentQuestionData) return null;

  return (
    <div className="space-y-7">
      <div>
        <h2 className="min-h-16 text-xl font-bold leading-relaxed text-slate-100 sm:text-2xl">
          {currentQuestionData.question}
        </h2>
      </div>
      <div className="flex flex-col gap-3">
        {currentQuestionData.options.map((option, index) => {
          const selected = selectedAnswers[currentIndex] === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelectAnswer(currentIndex, option)}
              className={`group flex w-full items-center justify-between gap-4 rounded-xl border px-4 py-4 text-left transition sm:px-5 ${selected ? 'border-violet-300/60 bg-violet-500/15 text-white' : 'border-white/10 bg-[#0b101d] text-slate-300 hover:border-violet-300/30 hover:bg-white/[0.03]'}`}
            >
              <span className="flex items-center gap-4">
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border text-xs font-bold ${selected ? 'border-violet-300/30 bg-violet-400/20 text-violet-100' : 'border-white/10 bg-white/[0.03] text-slate-500'}`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="font-medium">{option}</span>
              </span>
              {selected && <span className="text-sm font-bold text-violet-200">Selected</span>}
            </button>
          );
        })}
      </div>
      <div className="flex items-center justify-end gap-4 border-t border-white/5 pt-5">
        <span className="text-xs text-slate-500">{Object.keys(selectedAnswers).length} answered</span>
        <button type="button" onClick={onNext} className="rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-violet-400">
          {currentIndex + 1 === questionsPool.length ? 'Finish quiz' : 'Next question →'}
        </button>
      </div>
    </div>
  );
}
