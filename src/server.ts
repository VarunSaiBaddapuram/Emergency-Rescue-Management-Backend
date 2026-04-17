import http from "http";
import app from "./app";
import { Server } from "socket.io";

const PORT = parseInt(process.env.PORT || "5000", 10);

const server = http.createServer(app);

// Global unhandled error handlers for reliability
process.on("uncaughtException", (error) => {
  console.error("UNCAUGHT EXCEPTION! Shutting down gracefully...", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("UNHANDLED REJECTION! Shutting down gracefully...", reason);
  server.close(() => {
    process.exit(1);
  });
});

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-agency-key"],
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server Runs Perfectly at http://localhost:${PORT} with WebSocket`);
});
