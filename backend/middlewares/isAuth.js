import "dotenv/config";
import jwt from "jsonwebtoken";

import { AUTHORIZATION } from "../constants/index.js";

export function isAuth(req, res, next) {
  const authHeader = req.headers[AUTHORIZATION];
  const accessToken = authHeader && authHeader.split(" ")[1];
  if (!accessToken) {
    const error = new Error("로그인 먼저 해주세요.");
    error.statusCode = 401;
    throw error;
  }

  try {
    const { userId } = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET_KEY
    );

    if (!userId) {
      const error = new Error("인증 권한이 없습니다.");
      error.statusCode = 401;
      throw error;
    }

    req.userId = userId;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      error.statusCode = 401;
      error.message = "로그인 세션이 만료되었습니다.";
    }
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    throw error;
  }
}
