import express from "express";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

// 에러 처리
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

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

mongoose
  .connect(
    "mongodb+srv://Leeyunpyo:leeyunpyoleeyunpyo@loginproject.5ej1nnl.mongodb.net/?retryWrites=true&w=majority&appName=LoginProject"
  )
  .then((result) => app.listen(8080))
  .catch((error) => console.log(error));
