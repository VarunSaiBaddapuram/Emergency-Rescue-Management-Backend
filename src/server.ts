import http from "http";
import app from "./app";
import { Server } from "socket.io";
import { logger, cleanupLogger } from "./common/logger/logger";

const PORT = parseInt(process.env.PORT || "5000", 10);

const server = http.createServer(app);

// Global unhandled error handlers for reliability
process.on("uncaughtException", (error) => {
  logger.error({ err: error }, "UNCAUGHT EXCEPTION! Shutting down gracefully...");
  cleanupLogger();
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error({ reason }, "UNHANDLED REJECTION! Shutting down gracefully...");
  server.close(() => {
    cleanupLogger();
    process.exit(1);
  });
});

// Signal handlers for graceful shutdown and log cleanup
const handleShutdown = (signal: string) => {
  logger.info({ signal }, "Shutdown signal received. Cleaning up...");
  server.close(() => {
    cleanupLogger();
    process.exit(0);
  });
  // Force exit if server.close hangs
  setTimeout(() => {
    cleanupLogger();
    process.exit(1);
  }, 1000).unref();
};

process.on("SIGINT", () => handleShutdown("SIGINT"));
process.on("SIGTERM", () => handleShutdown("SIGTERM"));
process.on("exit", () => {
  cleanupLogger();
});

const io = new Server(server, {
  cors: {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      const allowedOrigins = process.env.CLIENT_URL 
        ? process.env.CLIENT_URL.split(",").map(o => o.trim()) 
        : ["https://emergency-alert-frontend-five.vercel.app"];
        
      if (!origin || allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== "production") {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-agency-key"],
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  logger.info(`Socket connected: ${socket.id}`);
  socket.on("disconnect", () => {
    logger.info(`Socket disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  logger.info(`Server Runs Perfectly at http://localhost:${PORT} with WebSocket`);
});
