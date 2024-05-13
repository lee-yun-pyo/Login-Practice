import "dotenv/config";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../model/user.js";
import { AUTHORIZATION } from "../constants/index.js";

export async function signUp(req, res, next) {
  // 에러 처리
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  try {
    const { email, name, password } = req.body;
    const isExistEmail = await User.findOne({ email });
    if (isExistEmail) {
      const error = new Error("이메일이 이미 존재합니다");
      error.statusCode = 409;
      throw error;
    }
    const hashedPw = await bcrypt.hash(password, 10); // 해시 작업
    const user = new User({
      email,
      password: hashedPw,
      name,
    });
    const result = await user.save();
    res
      .status(201)
      .json({ message: "created user successfully", username: result.name });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("존재하는 이메일이 없습니다.");
      error.statusCode = 401;
      throw error;
    }

    const isPwEqual = await bcrypt.compare(password, user.password);
    if (!isPwEqual) {
      const error = new Error("비밀번호가 일치하지 않습니다.");
      error.statusCode = 401;
      throw error;
    }
    const payload = { email: user.email, userId: user._id.toString() };
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);

    res
      .status(200)
      .json({ accessToken, userId: user._id.toString(), username: user.name });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

function createAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "1h",
  });
}

function createRefreshToken(payload) {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY);
}

export async function authenticateToken(req, res, next) {
  const authHeader = req.headers[AUTHORIZATION];
  const accessToken = authHeader && authHeader.split(" ")[1];
  if (accessToken === null) {
    const error = new Error("로그인 세션이 만료되었습니다.");
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

    const user = await User.findById(userId);

    res.status(200).json({ username: user.name, userId });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      error.statusCode = 401;
      error.message = "로그인 세션이 만료되었습니다.";
    }
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}
