import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { LANGUAGE_LIST, LANGUAGES } from '../data/languages';
import { useAuth } from '../context/useAuth';

function Metric({ label, value, detail }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#101626] p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-black text-white">{value}</p>
      {detail && <p className="mt-1 text-xs text-slate-500">{detail}</p>}
    </article>
  );
}

function formatDate(value) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(value));
}

export default function Dashboard() {
  const { user } = useAuth();
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

  const practiced = useMemo(() => new Set(results.map((result) => result.language)), [results]);
  const average = results.length
    ? Math.round(results.reduce((sum, result) => sum + result.percentage, 0) / results.length)
    : 0;
  const recent = results.slice(0, 4);

  return (
    <div className="space-y-10">
      <section className="flex flex-col justify-between gap-6 rounded-3xl border border-violet-300/10 bg-gradient-to-br from-violet-500/15 via-[#111728] to-cyan-500/5 p-7 md:flex-row md:items-center md:p-10">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Your learning dashboard</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">Welcome, {user?.name}</h1>
          <p className="mt-3 max-w-xl text-slate-400">Choose a language, take a short quiz, and keep track of what you have learned.</p>
        </div>
        <Link to="/languages" className="inline-flex shrink-0 items-center justify-center rounded-xl bg-violet-500 px-5 py-3 font-bold text-white transition hover:bg-violet-400">
          Choose a language <span className="ml-2" aria-hidden="true">→</span>
        </Link>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">Your progress</h2>
            <p className="mt-1 text-sm text-slate-400">A snapshot of your saved quiz attempts.</p>
          </div>
        </div>
        {error && <p role="alert" className="mb-4 rounded-xl border border-amber-300/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">{error}</p>}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Metric label="Quizzes completed" value={loading ? '…' : results.length} />
          <Metric label="Languages practiced" value={loading ? '…' : practiced.size} detail={Array.from(practiced).map((id) => LANGUAGES[id]?.name || id).join(', ') || 'Start your first quiz'} />
          <Metric label="Average score" value={loading ? '…' : `${average}%`} />
          <Metric label="Available languages" value={LANGUAGE_LIST.length} detail="One quiz platform, eight languages" />
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-2xl border border-white/10 bg-[#101626] p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-white">Recent results</h2>
              <p className="mt-1 text-sm text-slate-400">Your latest quiz attempts.</p>
            </div>
            <Link className="text-sm font-bold text-violet-300 hover:text-violet-200" to="/history">View history</Link>
          </div>
          {loading ? (
            <p className="py-8 text-center text-sm text-slate-500">Loading results…</p>
          ) : recent.length ? (
            <div className="divide-y divide-white/5">
              {recent.map((result) => (
                <div key={result._id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                  <div>
                    <p className="font-bold text-slate-100">{LANGUAGES[result.language]?.name || result.language}</p>
                    <p className="mt-1 text-xs text-slate-500">{formatDate(result.completedAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">{result.score}/{result.totalQuestions}</p>
                    <p className="text-xs text-violet-300">{result.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-white/10 px-5 py-9 text-center">
              <p className="font-semibold text-slate-200">No saved results yet</p>
              <p className="mt-2 text-sm text-slate-500">Finish your first quiz and your result will appear here.</p>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#101626] p-6">
          <h2 className="text-lg font-bold text-white">Pick up where you like</h2>
          <p className="mt-1 text-sm text-slate-400">Choose from the available programming question banks.</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {LANGUAGE_LIST.slice(0, 4).map((language) => (
              <Link key={language.id} to={`/quiz/${language.id}`} className="rounded-xl border border-white/5 bg-white/[0.03] p-4 transition hover:border-violet-300/30 hover:bg-violet-400/5">
                <span className={`grid h-9 w-9 place-items-center rounded-lg border text-xs font-black ${language.color}`}>{language.mark}</span>
                <span className="mt-3 block text-sm font-bold text-slate-100">{language.name}</span>
                <span className="mt-1 block text-xs text-slate-500">{language.questions.length} questions</span>
              </Link>
            ))}
          </div>
          <Link to="/languages" className="mt-5 inline-block text-sm font-bold text-violet-300 hover:text-violet-200">Browse all languages →</Link>
        </div>
      </section>
    </div>
  );
}
