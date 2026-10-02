export default function Reset({ onReset, label = 'Restart quiz' }) {
  return (
    <button
      type="button"
      onClick={onReset}
      className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-950/30 transition hover:from-violet-500 hover:to-indigo-500 active:scale-[0.98]"
    >
      {label}
    </button>
  );
}
