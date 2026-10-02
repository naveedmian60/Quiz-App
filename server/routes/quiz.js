import { Router } from 'express';
import QuizResult from '../models/QuizResult.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
const supportedLanguages = new Set([
  'javascript', 'python', 'java', 'c', 'cpp', 'csharp', 'php', 'typescript',
]);

router.post('/result', requireAuth, async (req, res) => {
  const { language, score, totalQuestions } = req.body || {};
  if (!supportedLanguages.has(language)) {
    return res.status(400).json({ message: 'Choose a supported programming language.' });
  }
  if (!Number.isInteger(score) || !Number.isInteger(totalQuestions)
    || totalQuestions < 1 || totalQuestions > 30 || score < 0 || score > totalQuestions) {
    return res.status(400).json({ message: 'The quiz result is invalid.' });
  }

  const result = await QuizResult.create({
    userId: req.user.id,
    language,
    score,
    totalQuestions,
    percentage: Math.round((score / totalQuestions) * 100),
  });
  return res.status(201).json({ result });
});

router.get('/results', requireAuth, async (req, res) => {
  const results = await QuizResult.find({ userId: req.user.id })
    .sort({ completedAt: -1 })
    .select('language score totalQuestions percentage completedAt');
  return res.json({ results });
});

export default router;
