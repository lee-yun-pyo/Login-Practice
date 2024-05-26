import { store } from "../store";
import { deleteCommentHandler } from "../handler/deleteCommentHandler.js";
import { getCommentsHandler } from "../handler/getCommentsHandler.js";
import { formatDateToAmPm, formatDateToYMD } from "../utils/index.js";
import { SkeletonChat } from "./SkeletonChat.js";

const $board = document.createElement("div");
$board.classList.add("chatting-board");

async function render() {
  try {
    $board.innerHTML = SkeletonChat(2).outerHTML;

    const comments = await getCommentsHandler(1);

    const paintCommentHTML = () => {
      const {
        user: { userId },
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
    // TO_DO: 새로고침 유도
    console.error(error);
  }
}

render();

export default $board;

const handleCommentMouseEnter = ({ target }) => {
  if (!target.matches(".comment-wrapper__self")) return;
  target.querySelector(".comment-deleteBtn").classList.remove("hidden");
};

const handleCommentMouseLeave = ({ target }) => {
  if (!target.matches(".comment-wrapper__self")) return;
  target.querySelector(".comment-deleteBtn").classList.add("hidden");
};

const handleCommentDelete = async ({ target }) => {
  if (!target.matches(".comment-deleteBtn")) return;
  const commentId = target.parentNode.getAttribute("data-id");
  await deleteCommentHandler(commentId);
};
