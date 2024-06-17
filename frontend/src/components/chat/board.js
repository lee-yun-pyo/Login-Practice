import { socketEmit } from "../../socket/index";

import { SOCKET_EVENT, SOCKET_TYPE } from "../../constants/socket";
import { API_PATH } from "../../constants";

import { showChatToast } from "./chatToast";

import { authFetch } from "../../api/authFetch";

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
    await authFetch(API_PATH.deleteComment(commentId), "DELETE");
    socketEmit(SOCKET_EVENT.COMMENT, SOCKET_TYPE.DELETE, commentId);
  } catch (error) {
    showChatToast(error.message, true);
    $createdAtSpan.innerText = createdAtSpanText;
  }
};

$chatBoard.addEventListener("mouseenter", handleCommentMouseEnter, true);
$chatBoard.addEventListener("mouseleave", handleCommentMouseLeave, true);
$chatBoard.addEventListener("click", handleCommentDelete);
