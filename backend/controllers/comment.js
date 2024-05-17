import Comment from "../model/comment.js";
import User from "../model/user.js";

export async function uploadComment(req, res, next) {
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
