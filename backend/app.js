import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

import authRoutes from "./routes/auth.js";
import commentsRoutes from "./routes/comment.js";

import { createHttpServer } from "./httpServer.js";

import { initSocketIO } from "./socket/socket.js";
import { handleSocketEvents } from "./socket/socketEvents.js";

const app = express();

app.use(express.json());

// CORS Error 방지
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);
app.use("/comments", commentsRoutes);

// 에러 처리
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const httpServer = createHttpServer(app);
    const io = initSocketIO(httpServer);
    handleSocketEvents(io);
  } catch (error) {
    console.error("서버 시작 중 오류 발생", error);
  }
}

startServer();
