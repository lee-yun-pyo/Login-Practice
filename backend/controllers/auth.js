import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../model/user.js";

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
    const hashedPw = await bcrypt.hash(password, 10); // 해시 작업
    const user = new User({
      email,
      password: hashedPw,
      name,
    });
    const result = await user.save();
    res.status(201).json({ message: "유저 생성됨!", userId: result._id });
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

    const token = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      "loginPracticeScretKey",
      { expiresIn: "1h" }
    );
    res.status(200).json({ token, userId: user._id.toString() });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}
