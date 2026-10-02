import { useState } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { useAuth } from './context/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import LanguageSelection from './pages/LanguageSelection';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Signup from './pages/Signup';

function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutError, setLogoutError] = useState('');

  const handleLogout = async () => {
    setLogoutError('');
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      setLogoutError(error.message);
    }
  };

  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/languages', label: 'Languages' },
    { to: '/history', label: 'Quiz history' },
  ];

  return (
    <div className="min-h-screen bg-[#080b14] text-slate-100">
      <header className="border-b border-white/10 bg-[#0d1220]/90">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <button className="flex items-center gap-3 text-left" onClick={() => navigate('/dashboard')}>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-500 font-black text-white">Q</span>
            <span>
              <span className="block text-sm font-black tracking-wide">CODEQUEST</span>
              <span className="block text-xs text-slate-400">Programming quiz platform</span>
            </span>
          </button>
          <nav className="flex flex-wrap items-center gap-2" aria-label="Main navigation">
            {links.map((link) => (
              <button
                key={link.to}
                onClick={() => navigate(link.to)}
                aria-current={location.pathname === link.to ? 'page' : undefined}
                className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${location.pathname === link.to ? 'bg-violet-500/15 text-violet-200' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
              >
                {link.label}
              </button>
            ))}
            <span className="hidden h-8 w-px bg-white/10 sm:block" />
            <span className="px-2 text-sm text-slate-300">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-slate-300 transition hover:border-rose-400/40 hover:text-rose-200"
            >
              Log out
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-5 py-8 md:py-12">
        {logoutError && <p role="alert" className="mb-6 rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{logoutError}</p>}
        <Outlet />
      </main>
    </div>
  );
}

function HomeRedirect() {
  const { user, loading } = useAuth();
  if (loading) return <div className="grid min-h-screen place-items-center text-slate-300">Loading your account…</div>;
  return <Navigate to={user ? '/dashboard' : '/login'} replace />;
}

function AppRoutes() {
  const location = useLocation();
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/languages" element={<LanguageSelection />} />
          <Route path="/quiz/:language" element={<Quiz />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" state={{ from: location }} replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
