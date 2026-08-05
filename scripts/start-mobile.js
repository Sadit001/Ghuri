const { spawn } = require('child_process');
const { join } = require('path');
const { existsSync } = require('fs');

// Forward any CLI args the user passed (e.g. --tunnel, --clear)
const rawArgs = process.argv.slice(2);
const filteredArgs = rawArgs.filter(arg => arg !== '--non-interactive');
if (rawArgs.includes('--non-interactive')) {
  process.env.CI = '1';
}

const hasNetworkMode = filteredArgs.some(arg => ['--tunnel', '--lan', '--localhost'].includes(arg));
const args = hasNetworkMode ? filteredArgs : ['--lan', ...filteredArgs];

const expoBinary = join(__dirname, '..', 'node_modules', '.bin', process.platform === 'win32' ? 'expo.cmd' : 'expo');
const localExpoExists = existsSync(expoBinary);
const isWindows = process.platform === 'win32';

const command = localExpoExists ? (isWindows ? 'cmd.exe' : expoBinary) : 'npx';
const commandArgs = localExpoExists
  ? isWindows
    ? ['/c', expoBinary, 'start', ...args]
    : ['start', ...args]
  : ['expo', 'start', ...args];

console.log(`Starting Expo: ${command} ${commandArgs.join(' ')}\n`);

const expoProcess = spawn(command, commandArgs, {
  stdio: 'inherit',
  shell: false,
  env: process.env,
});

expoProcess.on('exit', (code) => {
  process.exit(code || 0);
});
