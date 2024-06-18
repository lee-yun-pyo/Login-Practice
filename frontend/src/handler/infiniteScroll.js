import { store } from "../store";
import { COMMENT_ACTIONS } from "../store/action";

import {
  formatDateToAmPm,
  formatDateToYMD,
  scrollToBottom,
} from "../utils/index";
import { API_PATH, DELETED_MESSAGE } from "../constants";

import { SkeletonChat } from "../components/chat/SkeletonChat";
import { BoardError } from "../components/chat/BoardError";

import { infiniteFetch } from "../api/infiniteFetch";

export function initInfiniteScroll() {
  const $chatBoard = document.querySelector(".chatting-board");
  const $fetchMoreElement = $chatBoard.querySelector("#fetchMoreElement");
  const $chattingComments = $chatBoard.querySelector(".chatting-comments");

  $chattingComments.innerHTML = SkeletonChat(2).outerHTML;

  let intersecting = false;
  let currentOffset = 1;

  const observer = new IntersectionObserver(handleIntersection);
  if ($fetchMoreElement) {
    observer.observe($fetchMoreElement);
  }

  store.subscribe(renderComments);

  async function handleIntersection(entries) {
    intersecting = entries.some((entry) => entry.isIntersecting);
    if (!intersecting || currentOffset === null) return;

    const scrollTopBeforeLoad = $chatBoard.scrollTop;
    const chatBoardHeightBeforeLoad = $chatBoard.scrollHeight;

    currentOffset = await loadComments(currentOffset);
    if (currentOffset === 2) {
      scrollToBottom($chatBoard);
    } else {
      const newCommentsHeight =
        $chatBoard.scrollHeight - chatBoardHeightBeforeLoad;
      $chatBoard.scrollTop = scrollTopBeforeLoad + newCommentsHeight;
    }
  }
}

function renderComments() {
  const {
    user: { userId },
    comment: { comments },
  } = store.getState();

  const $chattingComments = document.querySelector(".chatting-comments");

  const commentsHTML = getCommentsHTML(userId, comments);
  $chattingComments.innerHTML = commentsHTML;
}

async function loadComments(offset) {
  try {
    const {
      comment: { comments },
    } = store.getState();

    const { comments: newComments, nextOffset } = await infiniteFetch(
      API_PATH.getComments(offset)
    );

    store.dispatch(COMMENT_ACTIONS.set([...newComments, ...comments]));
    renderComments();

    return nextOffset;
  } catch (error) {
    const $chatBoard = document.querySelector(".chatting-board");

    $chatBoard.innerHTML = "";
    $chatBoard.appendChild(BoardError(error.message));
  }
}

function getCommentsHTML(userId, comments) {
  const getCommentHTML = ({ _id, content, creator, createdAt }) => {
    const isSelf = creator._id === userId;
    const commentBoxClass = isSelf ? "comment-box__self" : "comment-box__other";
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
              ${createMessageHTML(content)}
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

  return commentsHTML;
}

function createMessageHTML(content) {
  const messageClass = content === null ? "delete-message" : "";
  const messageContent = content === null ? DELETED_MESSAGE : content;

  return `<p class="${messageClass}">${messageContent}</p>`;
}
