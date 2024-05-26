import express from "express";
import { body } from "express-validator";

import { isAuth } from "../middlewares/isAuth.js";

import commentController from "../controllers/comment.js";

const router = express.Router();

// PUT /comments
router.put(
  "/",
  isAuth,
  body("content").trim(),
  commentController.uploadComment
);

// GET /comments?page=${pageNum}
router.get("/", commentController.getComments);

// DELETE /comments/:commentId
router.delete("/:commentId", isAuth, commentController.deleteComment);

export default router;
