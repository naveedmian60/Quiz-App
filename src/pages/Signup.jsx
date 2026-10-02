import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthPanel from '../components/AuthPanel';
import api from '../api/axios';

const inputClass = 'mt-2 w-full rounded-xl border border-white/10 bg-[#090e19] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/70';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    const normalizedEmail = email.trim().toLowerCase();
    if (!name.trim()) return setError('Please enter your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) return setError('Please enter a valid email.');
    if (password.length < 6) return setError('Password must be at least 6 characters.');
    if (password.length > 128) return setError('Password must be 128 characters or fewer.');
    if (password !== confirmPassword) return setError('Passwords do not match.');

    setSubmitting(true);
    try {
      await api.post('/auth/signup', { name: name.trim(), email: normalizedEmail, password });
      setSuccess('Your account is ready. Log in to start practicing.');
      window.setTimeout(() => navigate('/login', { replace: true, state: { email: normalizedEmail } }), 900);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthPanel
      title="Create your account"
      subtitle="Save your quiz progress and practice across programming languages."
      footerPrompt="Already have an account?"
      footer="Log in"
      footerLink="/login"
    >
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <label className="block text-sm font-semibold text-slate-200">
          Name
          <input className={inputClass} autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" />
        </label>
        <label className="block text-sm font-semibold text-slate-200">
          Email
          <input className={inputClass} type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
        </label>
        <label className="block text-sm font-semibold text-slate-200">
          Password
          <span className="relative block">
            <input className={`${inputClass} pr-20`} type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-violet-300" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </span>
        </label>
        <label className="block text-sm font-semibold text-slate-200">
          Confirm password
          <input className={inputClass} type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Enter your password again" />
        </label>
        {error && <p role="alert" className="rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p>}
        {success && <p role="status" className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{success}</p>}
        <button type="submit" disabled={submitting} className="w-full rounded-xl bg-violet-500 px-4 py-3 font-bold text-white transition hover:bg-violet-400 disabled:cursor-wait disabled:opacity-60">
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>
    </AuthPanel>
  );
}
