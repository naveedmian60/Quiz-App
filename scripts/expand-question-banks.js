import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const dataDirectory = path.resolve(scriptDirectory, '../src/data');
const javascriptFile = path.join(dataDirectory, 'javascript.json');
const languages = ['python', 'java', 'c', 'cpp', 'csharp', 'php', 'typescript'];

const questionFormats = [
  (question) => question,
  (question) => `Quick check: ${question}`,
  (question) => `Choose the best answer. ${question}`,
  (question) => `Programming fundamentals: ${question}`,
  (question) => `Knowledge check: ${question}`,
  (question) => `When reviewing code, ${question.charAt(0).toLowerCase()}${question.slice(1)}`,
  (question) => `For a beginner, ${question.charAt(0).toLowerCase()}${question.slice(1)}`,
  (question) => `Concept review: ${question}`,
  (question) => `Select the correct statement. ${question}`,
  (question) => `Practice question: ${question}`,
  (question) => `Test your understanding: ${question}`,
  (question) => `Language basics: ${question}`,
  (question) => `Which answer is accurate? ${question}`,
  (question) => `Study prompt: ${question}`,
  (question) => `Before you continue, ${question.charAt(0).toLowerCase()}${question.slice(1)}`,
  (question) => `Review this concept. ${question}`,
  (question) => `Technical check: ${question}`,
  (question) => `Pick one answer. ${question}`,
  (question) => `Core language question: ${question}`,
  (question) => `Practice round: ${question}`,
];

function readBank(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeBank(file, bank) {
  fs.writeFileSync(file, `${JSON.stringify(bank, null, 2)}\n`, 'utf8');
}

function withIds(bank, language) {
  return bank.map((question, index) => ({
    ...question,
    id: question.id || `${language}-${index + 1}`,
  }));
}

function createExpandedBank(seedQuestions, language, targetCount) {
  const bank = [];

  for (let index = 0; index < targetCount; index += 1) {
    const seedIndex = index % seedQuestions.length;
    const formatIndex = Math.floor(index / seedQuestions.length) % questionFormats.length;
    const seed = seedQuestions[seedIndex];

    bank.push({
      ...seed,
      id: `${language}-${index + 1}`,
      question: questionFormats[formatIndex](seed.question),
    });
  }

  return bank;
}

const javascriptQuestions = withIds(readBank(javascriptFile), 'javascript');
const targetCount = javascriptQuestions.length;
writeBank(javascriptFile, javascriptQuestions);

for (const language of languages) {
  const file = path.join(dataDirectory, `${language}.json`);
  const seedQuestions = readBank(file).slice(0, 10);

  if (!seedQuestions.length) {
    throw new Error(`No seed questions found in ${file}.`);
  }

  writeBank(file, createExpandedBank(seedQuestions, language, targetCount));
}

console.log(`Each language bank now contains ${targetCount} questions.`);
