import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { LANGUAGES } from '../data/languages';

function formatDate(value) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

export default function History() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    api.get('/quiz/results')
      .then(({ data }) => {
        if (active) setResults(data.results);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Your progress</p>
          <h1 className="mt-3 text-3xl font-black text-white md:text-4xl">Quiz history</h1>
          <p className="mt-3 text-slate-400">Only your own saved attempts are shown here.</p>
        </div>
        <Link to="/languages" className="inline-flex items-center justify-center rounded-xl bg-violet-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-violet-400">Take a quiz</Link>
      </div>
      {error && <p role="alert" className="mb-4 rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p>}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#101626]">
        <div className="hidden grid-cols-[1.2fr_1fr_0.8fr_1.2fr] gap-4 border-b border-white/10 bg-white/[0.03] px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid">
          <span>Language</span><span>Score</span><span>Percent</span><span>Completed</span>
        </div>
        {loading ? (
          <p className="px-6 py-12 text-center text-sm text-slate-500">Loading your history…</p>
        ) : results.length ? (
          <div className="divide-y divide-white/5">
            {results.map((result) => (
              <article key={result._id} className="grid gap-2 px-5 py-4 sm:grid-cols-[1.2fr_1fr_0.8fr_1.2fr] sm:items-center sm:gap-4 sm:px-6">
                <span className="font-bold text-slate-100">{LANGUAGES[result.language]?.name || result.language}</span>
                <span className="text-sm text-slate-300">{result.score} / {result.totalQuestions}</span>
                <span className="text-sm font-bold text-violet-300">{result.percentage}%</span>
                <time className="text-xs text-slate-500" dateTime={result.completedAt}>{formatDate(result.completedAt)}</time>
              </article>
            ))}
          </div>
        ) : (
          <div className="px-6 py-14 text-center">
            <p className="font-bold text-slate-200">Your history is empty</p>
            <p className="mt-2 text-sm text-slate-500">Complete a quiz to save your first result.</p>
          </div>
        )}
      </div>
    </div>
  );
}
