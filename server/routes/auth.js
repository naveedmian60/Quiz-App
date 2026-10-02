import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { message: 'Too many attempts. Please wait a few minutes and try again.' },
});

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email };
}

function regenerateSession(req) {
  return new Promise((resolve, reject) => {
    req.session.regenerate((error) => error ? reject(error) : resolve());
  });
}

function saveSession(req) {
  return new Promise((resolve, reject) => {
    req.session.save((error) => error ? reject(error) : resolve());
  });
}

router.post('/signup', authLimiter, async (req, res) => {
  const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = typeof req.body?.password === 'string' ? req.body.password : '';

  if (!name || name.length > 80) {
    return res.status(400).json({ message: 'Please enter your name (up to 80 characters).' });
  }
  if (!emailPattern.test(email) || email.length > 254) {
    return res.status(400).json({ message: 'Please enter a valid email.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters.' });
  }
  if (password.length > 128) {
    return res.status(400).json({ message: 'Password must be 128 characters or fewer.' });
  }

  try {
    const existingUser = await User.exists({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }
    const passwordHash = await bcrypt.hash(password, 12);
    await User.create({ name, email, password: passwordHash });
    return res.status(201).json({ message: 'Account created. Please log in.' });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }
    throw error;
  }
});

router.post('/login', authLimiter, async (req, res) => {
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  if (!emailPattern.test(email) || !password || password.length > 128) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  await regenerateSession(req);
  req.session.userId = user.id;
  await saveSession(req);
  return res.json({ user: publicUser(user) });
});

router.post('/logout', (req, res, next) => {
  req.session.destroy((error) => {
    if (error) return next(error);
    res.clearCookie('quiz.sid', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    return res.status(204).end();
  });
});

router.get('/me', async (req, res) => {
  if (!req.session?.userId) {
    return res.status(401).json({ message: 'Please log in to continue.' });
  }
  const user = await User.findById(req.session.userId);
  if (!user) {
    return res.status(401).json({ message: 'Your session has expired. Please log in again.' });
  }
  return res.json({ user: publicUser(user) });
});

export default router;
