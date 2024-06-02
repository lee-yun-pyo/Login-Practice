import { store } from "../../store";
import { COMMENT_ACTIONS } from "../../store/action";

import { formatDateToAmPm, formatDateToYMD, scrollToBottom } from "../../utils";

import { BoardError } from "./BoardError";
import { SkeletonChat } from "./SkeletonChat";
import { showChatToast } from "./chatToast";

import { getCommentsHandler } from "../../handler/getCommentsHandler";
import { deleteCommentHandler } from "../../handler/deleteCommentHandler";

const $chatBoard = document.querySelector(".chatting-board");

const handleCommentMouseEnter = ({ target }) => {
  if (!target.matches(".comment-wrapper__self")) return;
  if (target.matches(".comment-wrapper__temp")) return;
  target.querySelector(".comment-deleteBtn").classList.remove("hidden");
};

const handleCommentMouseLeave = ({ target }) => {
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

async function render() {
  try {
    $chatBoard.innerHTML = SkeletonChat(2).outerHTML;

    const comments = await getCommentsHandler(1);

    store.dispatch(COMMENT_ACTIONS.set(comments));

    const paintCommentHTML = () => {
      const {
        user: { userId },
        comment: { comments },
      } = store.getState();

      const getCommentHTML = ({ _id, content, creator, createdAt }) => {
        const isSelf = creator._id === userId;
        const commentBoxClass = isSelf
          ? "comment-box__self"
          : "comment-box__other";
        const commentWrapperClass = isSelf
          ? "comment-wrapper__self"
          : "comment-wrapper__other";

        const deleteBtn = `<button class="comment-deleteBtn hidden">
                               <i class="fa-solid fa-trash"></i>
                             </button>`;
        const profileHTML = `<div class="comment-profile">${creator.name[0]}</div>`;
        const createdAtHTML = `<span class="comment-createdAt">${formatDateToAmPm(
          createdAt
        )}</span>`;
        return `
            <div data-id="${_id}" class="comment-wrapper ${commentWrapperClass}">
              ${isSelf ? deleteBtn : ""}
              ${isSelf ? createdAtHTML : profileHTML}
              <div class="comment-box ${commentBoxClass}">
                <p>${content}</p>
              </div>
              ${isSelf ? "" : createdAtHTML}
            </div>`;
      };

      let currentDate = "";
      const sortedByCreatedAtComments = comments.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      const commentsHTML = sortedByCreatedAtComments
        .map((comment) => {
          const formattedDate = formatDateToYMD(comment.createdAt);
          const dateHTML =
            currentDate !== formattedDate
              ? `<div class="comment-currentDate">${formattedDate}</div>`
              : "";
          currentDate = formattedDate;
          return `${dateHTML}${getCommentHTML(comment)}`;
        })
        .join("");

      $chatBoard.innerHTML = commentsHTML;
      scrollToBottom($chatBoard);

      $chatBoard.addEventListener("mouseenter", handleCommentMouseEnter, true);
      $chatBoard.addEventListener("mouseleave", handleCommentMouseLeave, true);
      $chatBoard.addEventListener("click", handleCommentDelete);
    };

    paintCommentHTML();
    store.subscribe(paintCommentHTML);
  } catch (error) {
    $chatBoard.removeChild($chatBoard.childNodes[0]);
    $chatBoard.appendChild(BoardError(error.message));
  }
}

render();
