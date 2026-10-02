import User from '../models/User.js';

export async function requireAuth(req, res, next) {
  if (!req.session?.userId) {
    return res.status(401).json({ message: 'Please log in to continue.' });
  }

  const user = await User.findById(req.session.userId);
  if (!user) {
    return res.status(401).json({ message: 'Your session has expired. Please log in again.' });
  }

  req.user = user;
  return next();
}
