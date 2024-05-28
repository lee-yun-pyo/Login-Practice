import { store } from "../store";
import { COMMENT_ACTIONS } from "../store/action.js";

import { deleteCommentHandler } from "../handler/deleteCommentHandler.js";
import { getCommentsHandler } from "../handler/getCommentsHandler.js";
import { formatDateToAmPm, formatDateToYMD } from "../utils/index.js";

import { SkeletonChat } from "./SkeletonChat.js";
import { BoardError } from "./BoardError.js";

const $board = document.createElement("div");
$board.classList.add("chatting-board");

async function render() {
  try {
    $board.innerHTML = SkeletonChat(2).outerHTML;

    await getCommentsHandler(1);

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

        const deleteBtn = `<button class="comment-deleteBtn hidden">삭제</button>`;
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
      const commentsHTML = comments
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

      $board.innerHTML = commentsHTML;

      $board.addEventListener("mouseenter", handleCommentMouseEnter, true);
      $board.addEventListener("mouseleave", handleCommentMouseLeave, true);
      $board.addEventListener("click", handleCommentDelete);
    };

    paintCommentHTML();

    store.subscribe(paintCommentHTML);
  } catch (error) {
    $board.removeChild($board.childNodes[0]);
    $board.appendChild(BoardError());
  }
}

render();

export default $board;

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
  if (!target.matches(".comment-deleteBtn")) return;

  const commentElement = target.closest("[data-id]");

  const commentId = commentElement.getAttribute("data-id");
  const $createdAtSpan = commentElement.querySelector(".comment-createdAt");
  const createdAtSpanText = $createdAtSpan.innerText;
  $createdAtSpan.innerText = "삭제 중...";

  try {
    await deleteCommentHandler(commentId);
    store.dispatch(COMMENT_ACTIONS.delete(commentId));
  } catch (error) {
    // 📌TO_DO: 삭제 시 에러 발생 시 처리
    $createdAtSpan.innerText = createdAtSpanText;
  }
};
