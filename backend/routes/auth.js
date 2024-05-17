import express from "express";
import { body } from "express-validator";

import { authenticateToken, login, signUp } from "../controllers/auth.js";

const router = express.Router();

router.put(
  "/signup",
  [
    body("email").isEmail().withMessage("이메일 입력하세요").normalizeEmail(),
    body("password").trim().isLength({ min: 5 }).withMessage("패스워드 오류"),
    body("name").trim().not().isEmpty().withMessage("name 오류"),
  ],
  signUp
);

router.post("/login", login);

router.get("/access-token/validate", authenticateToken);

export default router;
