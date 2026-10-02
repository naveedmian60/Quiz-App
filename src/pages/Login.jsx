import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthPanel from '../components/AuthPanel';
import { useAuth } from '../context/useAuth';

const inputClass = 'mt-2 w-full rounded-xl border border-white/10 bg-[#090e19] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/70';

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, user, loading } = useAuth();
  const [email, setEmail] = useState(location.state?.email || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!loading && user) navigate('/dashboard', { replace: true });
  }, [loading, user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError('Please enter a valid email.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setSubmitting(true);
    try {
      await login({ email: normalizedEmail, password });
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthPanel
      title="Welcome back"
      subtitle="Log in to continue your programming practice."
      footerPrompt="New to CodeQuest?"
      footer="Create an account"
      footerLink="/signup"
    >
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <label className="block text-sm font-semibold text-slate-200">
          Email
          <input className={inputClass} type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
        </label>
        <label className="block text-sm font-semibold text-slate-200">
          Password
          <span className="relative block">
            <input className={`${inputClass} pr-20`} type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Your password" />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-violet-300" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </span>
        </label>
        {error && <p role="alert" className="rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p>}
        <button type="submit" disabled={submitting} className="w-full rounded-xl bg-violet-500 px-4 py-3 font-bold text-white transition hover:bg-violet-400 disabled:cursor-wait disabled:opacity-60">
          {submitting ? 'Logging in…' : 'Log in'}
        </button>
      </form>
    </AuthPanel>
  );
}
