import http from 'http';
import fs from 'fs';
import path from 'path';
import app from './app';
import { env } from './config/env';

const PORT = parseInt(env.PORT, 10);

// Ensure uploads directory exists
const uploadsDir = path.resolve(env.UPLOAD_DIR);
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log(`Created uploads directory: ${uploadsDir}`);
}

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('');
  console.log('══════════════════════════════════════════════════════');
  console.log('  🧭  Ghuri Travel API Server');
  console.log(`  🚀  Status    : Running`);
  console.log(`  🌐  Port      : ${PORT}`);
  console.log(`  🔧  Mode      : ${env.NODE_ENV}`);
  console.log(`  📡  Base URL  : http://localhost:${PORT}/api`);
  console.log(`  🏥  Health    : http://localhost:${PORT}/api/health`);
  console.log('══════════════════════════════════════════════════════');
  console.log('');
});

server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please set a different PORT in .env`);
    process.exit(1);
  }
  console.error('Server startup error:', error);
  process.exit(1);
});

// Graceful shutdown
const gracefulShutdown = (signal: string) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

export default server;
