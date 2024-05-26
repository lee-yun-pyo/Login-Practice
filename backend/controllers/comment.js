import Comment from "../model/comment.js";
import User from "../model/user.js";

// PUT /comments
async function uploadComment(req, res, next) {
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
    const totalCount = await Comment.find().estimatedDocumentCount();
    const comments = await Comment.find()
      .populate("creator")
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    res.status(200).json({
      message: "Fetched comments successfully",
      comments,
      totalCount,
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
    const result = await Comment.findByIdAndDelete(commentId);

    res
      .status(200)
      .json({ message: "comment was deleted successfully", result });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export default { uploadComment, getComments, deleteComment };
