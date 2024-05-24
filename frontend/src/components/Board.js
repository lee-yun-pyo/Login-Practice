import { getCommentsHandler } from "../handler/getCommentsHandler.js";
import { store } from "../store";
import { formatDateToAmPm } from "../utils/index.js";
import { SkeletonChat } from "./SkeletonChat.js";

const $board = document.createElement("div");
$board.classList.add("chatting-board");

async function render() {
  try {
    $board.innerHTML = SkeletonChat(3).outerHTML;

    const comments = await getCommentsHandler(1);

    const paintCommentHTML = () => {
      const { userId } = store.getState();

      const commentsHTML = comments
        .map(({ _id, content, creator, createdAt }) => {
          const isSelf = creator._id === userId;
          const commentBoxClass = isSelf
            ? "comment-box__self"
            : "comment-box__other";
          const commentWrapeerClass = isSelf
            ? "comment-wrpper__self"
            : "comment-wrapper__other";

          const profileHTML = `<div class="comment-profile">${creator.name[0]}</div>`;
          const createdAtHTML = `<span class="comment-createdAt">${formatDateToAmPm(
            createdAt
          )}</span>`;
          return `<div class="comment-wrapper ${commentWrapeerClass}">
                  ${isSelf ? createdAtHTML : profileHTML}
                  <div data-id="${_id}" class="comment-box ${commentBoxClass}">
                      <p>${content}</p>
                  </div>
                  ${isSelf ? "" : createdAtHTML}
                </div>`;
        })
        .join("");

      $board.innerHTML = commentsHTML;
    };

    paintCommentHTML();

    store.subscribe(paintCommentHTML);
  } catch (error) {
    console.error(error);
  }
}

render();

export default $board;
