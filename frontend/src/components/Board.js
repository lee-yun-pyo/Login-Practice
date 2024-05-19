import { getCommentsHandler } from "../handler/getCommentsHandler";

const $board = document.createElement("div");
$board.classList.add("chatting-board");

async function render() {
  try {
    const comments = await getCommentsHandler(1);
    const loggedInUserId = localStorage.getItem("userId");

    const commentsHTML = comments
      .map(({ _id, content, creator }) => {
        const isSelf = creator === loggedInUserId;
        const commentBoxClass = isSelf
          ? "comment-box__self"
          : "comment-box__other";
        const commentWrapeerClass = isSelf
          ? "comment-wrpper__self"
          : "comment-wrapper__other";
        return `<div class="comment-wrapper ${commentWrapeerClass}">
                  <div data-id="${_id}" class="comment-box ${commentBoxClass}">
                      <p>${content}</p>
                  </div>
                </div>`;
      })
      .join("");

    $board.innerHTML = commentsHTML;
  } catch (error) {
    console.error(error);
  }
}

render();

export default $board;
