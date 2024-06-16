import Comment from "../model/comment.js";
import User from "../model/user.js";

// PUT /comments
async function createComment(req, res, next) {
  try {
    const { content } = req.body;
    const comment = new Comment({
      content,
      creator: req.userId,
    });
    const result = await comment.save();
    const user = await User.findById(req.userId);
    user.comments.push(result._id);
    await user.save();

    res.status(201).json({
      message: "created comment successfully",
      comment,
      creator: { userId: user._id, username: user.name },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

// GET /comments?page=${pageNum}
async function getComments(req, res, next) {
  try {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = 20;
    const totalCount = await Comment.estimatedDocumentCount();
    const comments = await Comment.find()
      .populate({
        path: "creator",
        select: "_id name",
      })
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: "desc" });

    let nextOffset = null;
    const leftCount = totalCount - perPage * currentPage;
    if (leftCount > 0) {
      nextOffset = currentPage + 1;
    }

    res.status(200).json({
      message: "Fetched comments successfully",
      comments,
      nextOffset,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

// DELETE /comments/:commentId
async function deleteComment(req, res, next) {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      const error = new Error("삭제하려는 Comment가 없습니다.");
      error.statusCode = 404;
      throw error;
    }

    await Comment.findByIdAndUpdate(commentId, { content: null });

    res.status(200).json({ message: "comment was deleted successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export default { createComment, getComments, deleteComment };
