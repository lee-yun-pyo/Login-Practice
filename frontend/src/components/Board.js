import { getCommentsHandler } from "../handler/getCommentsHandler.js";
import { store } from "../store";
import { formatDateToAmPm, formatDateToYMD } from "../utils/index.js";
import { SkeletonChat } from "./SkeletonChat.js";

const $board = document.createElement("div");
$board.classList.add("chatting-board");

async function render() {
  try {
    $board.innerHTML = SkeletonChat(2).outerHTML;

    const comments = await getCommentsHandler(1);

    const paintCommentHTML = () => {
      const { userId } = store.getState();

      const getCommentHTML = ({ _id, content, creator, createdAt }) => {
        const isSelf = creator._id === userId;
        const commentBoxClass = isSelf
          ? "comment-box__self"
          : "comment-box__other";
        const commentWrapperClass = isSelf
          ? "comment-wrapper__self"
          : "comment-wrapper__other";

        const profileHTML = `<div class="comment-profile">${creator.name[0]}</div>`;
        const createdAtHTML = `<span class="comment-createdAt">${formatDateToAmPm(
          createdAt
        )}</span>`;
        return `
          <div class="comment-wrapper ${commentWrapperClass}">
            ${isSelf ? createdAtHTML : profileHTML}
            <div data-id="${_id}" class="comment-box ${commentBoxClass}">
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
    };

    paintCommentHTML();

    store.subscribe(paintCommentHTML);
  } catch (error) {
    console.error(error);
  }
}

render();

export default $board;
