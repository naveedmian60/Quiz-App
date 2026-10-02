import { Link } from 'react-router-dom';

export default function AuthPanel({ title, subtitle, children, footer, footerLink, footerPrompt }) {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#080b14] px-4 py-10 text-slate-100">
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-violet-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <section className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#101626]/90 p-7 shadow-2xl shadow-black/30 sm:p-9">
        <Link to="/" className="mb-8 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet-500 text-lg font-black">Q</span>
          <span className="text-sm font-black tracking-[0.16em]">CODEQUEST</span>
        </Link>
        <h1 className="text-3xl font-black tracking-tight">{title}</h1>
        <p className="mb-7 mt-2 text-sm leading-6 text-slate-400">{subtitle}</p>
        {children}
        <p className="mt-7 text-center text-sm text-slate-400">
          {footerPrompt}{' '}
          <Link to={footerLink} className="font-bold text-violet-300 hover:text-violet-200">{footer}</Link>
        </p>
      </section>
    </main>
  );
}
