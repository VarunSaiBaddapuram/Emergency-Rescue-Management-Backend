import pino from 'pino';
import fs from 'fs';
import path from 'path';

const logFilePath = path.join(process.cwd(), 'logs/session.log');

// Ensure directory exists
if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

// Clear or create the log file on start
fs.writeFileSync(logFilePath, '', { flag: 'w' });

export const logger = pino(
  {
    level: 'info',
    redact: {
      paths: ['req.headers.authorization', 'req.body.password', 'req.body.token'],
      remove: true,
    },
  },
  pino.destination({
    dest: logFilePath,
    sync: true, // Write logs synchronously
  })
);

export const cleanupLogger = () => {
    try {
        if (fs.existsSync(logFilePath)) {
            fs.unlinkSync(logFilePath);
        }
    } catch (err) {
        // Silent fail for cleanup
    }
};

