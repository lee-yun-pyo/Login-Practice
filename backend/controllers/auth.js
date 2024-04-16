import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

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
