import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import authRoutes from './routes/auth.js';
import quizRoutes from './routes/quiz.js';

const { MONGODB_URI, SESSION_SECRET } = process.env;
const port = Number.parseInt(process.env.PORT || '3001', 10);

if (!MONGODB_URI || !SESSION_SECRET || SESSION_SECRET.length < 32 || SESSION_SECRET.startsWith('replace_with_')) {
  console.error('Set MONGODB_URI and a unique SESSION_SECRET (at least 32 characters) in your .env file. See .env.example.');
  process.exit(1);
}

const app = express();
if (process.env.NODE_ENV === 'production') app.set('trust proxy', 1);

app.use(express.json({ limit: '10kb' }));
app.use(session({
  name: 'quiz.sid',
  secret: SESSION_SECRET,
  store: MongoStore.create({
    mongoUrl: MONGODB_URI,
    collectionName: 'sessions',
    ttl: 14 * 24 * 60 * 60,
    autoRemove: 'native',
  }),
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 14 * 24 * 60 * 60 * 1000,
  },
}));

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use((_req, res) => res.status(404).json({ message: 'Endpoint not found.' }));
app.use((error, _req, res, next) => {
  if (res.headersSent) return next(error);
  console.error('API request failed:', error.message);
  res.status(500).json({ message: 'Something went wrong. Please try again.' });
});

let server;

async function start() {
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
  console.log('Connected to MongoDB.');
  server = app.listen(port, () => {
    console.log(`API server listening on http://localhost:${port}`);
  });
}

async function shutdown() {
  if (server) await new Promise((resolve) => server.close(resolve));
  await mongoose.disconnect();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

start().catch((error) => {
  console.error('Could not start the API server:', error.message);
  process.exit(1);
});
