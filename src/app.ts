import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import dns from "node:dns";
import path from "path";
import { errorMiddleware } from "./common/middleware/error.middleware";
import { AppError } from "./common/errors/AppError";
import pinoHttp from "pino-http";
import { logger } from "./common/logger/logger";

// DB connection
import "./config/db";

// Route modules
import userRoute from "./modules/user/user.routes";
import userRoutes from "./modules/auth/auth.routes";
import reliefRoutes from "./modules/relief/relief.routes";
import collectionRoutes from "./modules/collection/collection.routes";
import notification from "./modules/notification/notification.routes";
import emailRoutes from "./modules/email/email.routes";
import sosRoutes from "./modules/sos/sos.routes";

dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(pinoHttp({ logger }));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);

app.use("/api", userRoute);
app.use("/api", emailRoutes);
app.use("/relief", reliefRoutes);
app.use("/collection", collectionRoutes);
app.use("/user", userRoutes);
app.use("/notification", notification);
app.use("/sos", sosRoutes);

const _dirname = path.dirname("");
const buildpath = path.join(_dirname, "../client/build");
app.use(express.static(buildpath));

// 404 handler
app.all("*", (req, res, next) => {
  next(new AppError({ message: `Can't find ${req.originalUrl} on this server!`, statusCode: 404 }));
});

// Global error middleware
app.use(errorMiddleware);

export default app;
