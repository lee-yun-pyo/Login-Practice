import { store } from "../../store";
import { COMMENT_ACTIONS } from "../../store/action";

import { showChatToast } from "./chatToast";

import { deleteCommentHandler } from "../../handler/deleteCommentHandler";

const $chatBoard = document.querySelector(".chatting-board");

const handleCommentMouseEnter = ({ target }) => {
  if (target.matches(".skeleton-chat__wrapper")) return;
  if (!target.matches(".comment-wrapper__self")) return;
  if (target.matches(".comment-wrapper__temp")) return;
  target.querySelector(".comment-deleteBtn").classList.remove("hidden");
};

const handleCommentMouseLeave = ({ target }) => {
  if (target.matches(".skeleton-chat__wrapper")) return;
  if (!target.matches(".comment-wrapper__self")) return;
  if (target.matches(".comment-wrapper__temp")) return;
  target.querySelector(".comment-deleteBtn").classList.add("hidden");
};

const handleCommentDelete = async ({ target }) => {
  if (!target.closest(".comment-deleteBtn")) return;

  const commentElement = target.closest("[data-id]");

  const commentId = commentElement.getAttribute("data-id");
  const $createdAtSpan = commentElement.querySelector(".comment-createdAt");
  const createdAtSpanText = $createdAtSpan.innerText;
  $createdAtSpan.innerText = "삭제 중...";

  try {
    await deleteCommentHandler(commentId);
    store.dispatch(COMMENT_ACTIONS.delete(commentId));
    showChatToast("댓글을 삭제했어요", false);
  } catch (error) {
    showChatToast(error.message, true);
    $createdAtSpan.innerText = createdAtSpanText;
  }
};

$chatBoard.addEventListener("mouseenter", handleCommentMouseEnter, true);
$chatBoard.addEventListener("mouseleave", handleCommentMouseLeave, true);
$chatBoard.addEventListener("click", handleCommentDelete);
