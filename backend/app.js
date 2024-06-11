import express from "express";
import mongoose from "mongoose";
import { createServer } from "http";

import authRoutes from "./routes/auth.js";
import commentsRoutes from "./routes/comment.js";

import { initSocketIO } from "./utils/socket.js";

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

mongoose
  .connect(
    "mongodb+srv://Leeyunpyo:leeyunpyoleeyunpyo@loginproject.5ej1nnl.mongodb.net/?retryWrites=true&w=majority&appName=LoginProject"
  )
  .then((result) => {
    const httpServer = createServer(app); // Correctly create HTTP server

    const io = initSocketIO(httpServer);
    httpServer.listen(8080, () => {
      console.log("http Server 연결");
    });
    io.on("connection", (socket) => {
      console.log("socket 연결됨", socket.id);
    });
  })
  .catch((error) => console.log(error));
