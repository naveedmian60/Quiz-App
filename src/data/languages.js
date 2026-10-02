import javascript from './javascript.json';
import python from './python.json';
import java from './java.json';
import c from './c.json';
import cpp from './cpp.json';
import csharp from './csharp.json';
import php from './php.json';
import typescript from './typescript.json';

export const LANGUAGES = {
  javascript: {
    id: 'javascript',
    name: 'JavaScript',
    mark: 'JS',
    description: 'Practice browser, language, and asynchronous programming fundamentals.',
    questions: javascript,
    color: 'text-amber-200 bg-amber-400/10 border-amber-300/20',
  },
  python: {
    id: 'python',
    name: 'Python',
    mark: 'Py',
    description: 'Review Python syntax, collections, functions, and object-oriented basics.',
    questions: python,
    color: 'text-sky-200 bg-sky-400/10 border-sky-300/20',
  },
  java: {
    id: 'java',
    name: 'Java',
    mark: 'J',
    description: 'Explore Java types, classes, collections, and core language features.',
    questions: java,
    color: 'text-orange-200 bg-orange-400/10 border-orange-300/20',
  },
  c: {
    id: 'c',
    name: 'C',
    mark: 'C',
    description: 'Build confidence with C syntax, pointers, arrays, and memory basics.',
    questions: c,
    color: 'text-slate-200 bg-slate-400/10 border-slate-300/20',
  },
  cpp: {
    id: 'cpp',
    name: 'C++',
    mark: 'C++',
    description: 'Practice C++ fundamentals, references, containers, and classes.',
    questions: cpp,
    color: 'text-blue-200 bg-blue-400/10 border-blue-300/20',
  },
  csharp: {
    id: 'csharp',
    name: 'C#',
    mark: 'C#',
    description: 'Review C# types, LINQ, properties, and .NET language essentials.',
    questions: csharp,
    color: 'text-violet-200 bg-violet-400/10 border-violet-300/20',
  },
  php: {
    id: 'php',
    name: 'PHP',
    mark: 'PHP',
    description: 'Test PHP syntax, arrays, functions, and common web development features.',
    questions: php,
    color: 'text-indigo-200 bg-indigo-400/10 border-indigo-300/20',
  },
  typescript: {
    id: 'typescript',
    name: 'TypeScript',
    mark: 'TS',
    description: 'Strengthen your understanding of types, interfaces, and TypeScript tooling.',
    questions: typescript,
    color: 'text-cyan-200 bg-cyan-400/10 border-cyan-300/20',
  },
};

export const LANGUAGE_LIST = Object.values(LANGUAGES);
