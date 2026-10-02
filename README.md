# CodeQuest Programming Quiz Platform

CodeQuest is a React + Vite quiz app that reuses the existing JavaScript quiz and adds account sign-in, eight programming-language question banks, saved quiz history, and an Express API backed by MongoDB Atlas.

## Features

- Sign up, log in, and log out with HTTP-only MongoDB-backed sessions
- Protected dashboard, language selection, quiz, and history pages
- Question banks for JavaScript, Python, Java, C, C++, C#, PHP, and TypeScript
- Random questions, saved answers, previous/next navigation, a 30-minute timer, and a result summary
- Per-user quiz history, dashboard averages, and recent attempts
- Responsive layout for mobile, tablet, and desktop

The original JavaScript question bank is retained as 200 entries in src/data/javascript.json. Each quiz selects up to 30 questions from its selected language bank.

## Technologies

- React, Vite, React Router, and Tailwind CSS
- Node.js and Express
- MongoDB Atlas and Mongoose
- bcryptjs password hashing and express-session with connect-mongo
- express-rate-limit for sign-up and login endpoints

## Installation

Use Node.js 20.19 or newer. From the project root, install dependencies:

~~~~sh
npm install
~~~~

Create a local environment file from the safe template:

~~~~powershell
Copy-Item .env.example .env
~~~~

On macOS or Linux, use cp .env.example .env.

## MongoDB Atlas setup

1. Create an Atlas cluster and a database user.
2. Allow your development machine's IP address in the Atlas Network Access list.
3. Copy the cluster connection string and replace the placeholders in .env.
4. Set SESSION_SECRET to a private random value of at least 32 characters. For example:

~~~~sh
node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"
~~~~

The backend validates that these environment values exist before it starts. Keep .env private; it is ignored by Git. The .env.example file contains placeholders only.

## Environment variables

| Variable | Purpose |
| --- | --- |
| MONGODB_URI | MongoDB Atlas connection string for quiz users, results, and sessions |
| SESSION_SECRET | Private secret used to sign session cookies |
| PORT | Backend port; defaults to 3001 |
| NODE_ENV | Use production when deployed to enable secure cookies |

## Run the application

Start the Vite frontend and Express backend together:

~~~~sh
npm run dev
~~~~

Vite runs on its usual local port and proxies /api/* to http://localhost:3001. The backend starts only after it connects to MongoDB.

To run them separately, use two terminals:

~~~~sh
npm run dev:server
npm run dev:client
~~~~

For a production frontend build, use npm run build. Start the API with npm start after setting production environment variables.

## Use the quiz

1. Open the Vite URL and choose Create an account.
2. Sign in with that account.
3. Use the dashboard or language page to choose a programming language.
4. Answer the questions; use Previous and Next to move around. The timer submits the attempt when it reaches zero.
5. The result screen shows correct and incorrect counts and the percentage. Saved attempts appear in Quiz History and on the dashboard.
6. Log out from the top navigation. Protected routes send logged-out visitors to the login page.

Passwords are hashed with bcryptjs before storage. Quiz result APIs require a valid session and only return records for the signed-in user.

## API routes

| Method | Route | Access |
| --- | --- | --- |
| POST | /api/auth/signup | Public, rate limited |
| POST | /api/auth/login | Public, rate limited |
| POST | /api/auth/logout | Session |
| GET | /api/auth/me | Session |
| POST | /api/quiz/result | Signed-in user |
| GET | /api/quiz/results | Signed-in user |
| GET | /api/health | Public health check |

## Add a programming language

1. Add a JSON question bank under src/data/. Each entry needs question, options, correctAnswer, explanation, and difficulty.
2. Import that JSON file and add its id, display name, short description, mark, and data to src/data/languages.js.
3. Add its id to the supported-language set in server/routes/quiz.js.
4. Add the language to this guide if you want it documented.

Each bank remains separate, so selecting a language never mixes in questions from another language.
