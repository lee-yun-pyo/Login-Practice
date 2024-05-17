import express from "express";
import { body } from "express-validator";

import { uploadComment } from "../controllers/comment.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.put("/", isAuth, body("content").trim(), uploadComment);

export default router;
