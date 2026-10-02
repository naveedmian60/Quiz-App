import { spawn } from 'node:child_process';

const processes = [];
let shuttingDown = false;

function start(args) {
  const child = spawn(process.execPath, args, {
    cwd: process.cwd(),
    stdio: 'inherit',
    env: process.env,
  });
  processes.push(child);
  child.on('error', (error) => {
    console.error('Could not start development process:', error.message);
  });
}

start(['--watch', 'server/index.js']);
start(['node_modules/vite/bin/vite.js']);

function shutdown() {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of processes) {
    if (child.exitCode === null && child.signalCode === null) child.kill();
  }
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
