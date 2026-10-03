import { Link } from 'react-router-dom';
import { LANGUAGE_LIST } from '../data/languages';

export default function LanguageSelection() {
  return (
    <div>
      <div className="mb-8 max-w-2xl">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Choose your next challenge</p>
        <h1 className="mt-3 text-3xl font-black text-white md:text-4xl">Programming languages</h1>
        <p className="mt-3 text-slate-400">Each quiz draws questions only from its selected language. You can explore a different topic at any time.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {LANGUAGE_LIST.map((language) => (
          <article key={language.id} className="flex min-h-64 flex-col rounded-2xl border border-white/10 bg-[#101626] p-5 transition hover:-translate-y-0.5 hover:border-violet-300/30">
            <span className={`grid h-12 w-12 place-items-center rounded-xl border text-sm font-black ${language.color}`}>{language.mark}</span>
            <h2 className="mt-5 text-lg font-bold text-white">{language.name}</h2>
            <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">{language.description}</p>
            <div className="mt-5 flex items-center justify-end gap-3">
              <Link to={`/quiz/${language.id}`} className="rounded-lg bg-violet-500/15 px-3 py-2 text-sm font-bold text-violet-200 transition hover:bg-violet-500/25">Start quiz</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}