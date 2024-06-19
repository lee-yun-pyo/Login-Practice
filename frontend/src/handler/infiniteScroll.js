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

  $chattingComments.innerHTML = SkeletonChat(2).outerHTML; // 스켈레톤 UI 출력

  const observer = new IntersectionObserver(handleIntersection);
  if ($fetchMoreElement) {
    observer.observe($fetchMoreElement); // $fetchMoreElement 태그 관찰
  }

  let intersecting = false; // observer 감지 여부 확인
  let currentOffset = 1; // 현재 offset
  async function handleIntersection(entries) {
    intersecting = entries.some((entry) => entry.isIntersecting); // observe 감지 확인
    if (!intersecting || currentOffset === null) return;

    const scrollTopBeforeLoad = $chatBoard.scrollTop;
    const chatBoardHeightBeforeLoad = $chatBoard.scrollHeight;

    currentOffset = await loadComments(currentOffset); // GET API 요청
    if (currentOffset === 2) {
      // 첫 댓글 렌더링 시 스크롤 최하단 위치
      scrollToBottom($chatBoard);
    } else {
      // 스크롤 시 스크롤 위치 유지
      const newCommentsHeight =
        $chatBoard.scrollHeight - chatBoardHeightBeforeLoad;
      $chatBoard.scrollTop = scrollTopBeforeLoad + newCommentsHeight;
    }
  }

  store.subscribe(renderComments);
}

/**
 * 채팅글 화면에 출력
 */
function renderComments() {
  const {
    user: { userId },
    comment: { comments },
  } = store.getState();

  const $chattingComments = document.querySelector(".chatting-comments");

  const commentsHTML = createAllCommentsHTML(userId, comments);
  $chattingComments.innerHTML = commentsHTML;
}

/**
 * 채팅글 조회 API 요청
 * @param offset 무한 스크롤을 위한 페이지 번호
 * @returns nextOffset
 */
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

/**
 * 채팅글 요소 하나의 HTML 코드 생성
 * @param commentInfo 채팅글 정보
 * @param isSameUser 윗 채팅글과 같은 작성자인지 확인
 * @param userId 로그인 된 사용자 _.id
 * @returns 채팅글 HTML 태그 (li)
 */
function createCommentHTML(commentInfo, isSameUser, userId) {
  const { _id, content, creator, createdAt } = commentInfo;

  const isSelf = creator._id === userId; // 채팅글이 로그인된 유저가 작성한 것인지 확인

  // 로그인 유저의 채팅글 구분
  const commentBoxClass = isSelf ? "comment-box__self" : "comment-box__other";
  const commentWrapperClass = isSelf
    ? "comment-wrapper__self"
    : "comment-wrapper__other";

  // 삭제 버튼 HTML 코드
  const deleteBtnHTML = `<button class="comment-deleteBtn hidden">
                           <i class="fa-solid fa-trash"></i>
                     </button>`;

  // 프로필 HTML 코드
  const profileHTML = `<div class="comment-profile ${
    isSameUser ? "comment-hidden__element" : ""
  }">${creator.name[0]}</div>`;

  // 댓글 작성 시간 (AM|PM) HTML 코드
  const createdAtHTML = `<span class="comment-createdAt">${formatDateToAmPm(
    createdAt
  )}</span>`;

  return `
        <li data-id="${_id}" class="comment-wrapper ${commentWrapperClass}">
          ${isSelf && content ? deleteBtnHTML : ""}
          ${isSelf ? createdAtHTML : profileHTML}
          <div class="comment-box ${commentBoxClass} ${
    isSameUser ? "comment-box__sameUser" : ""
  }">
            ${createMessageHTML(content)}
          </div>
          ${isSelf ? "" : createdAtHTML}
        </li>`;
}

/**
 * 채팅글 전체 HTML 코드 새성
 * @param userId 로그인된 사용자 ._id
 * @param comments offset에 따라 fetch된 댓글
 * @returns 채팅글 전체 HTML 코드 ([li, ...])
 */
function createAllCommentsHTML(userId, comments) {
  let currentDate = "";
  let currentUser = "";

  // 채팅글 날짜순 정렬
  const sortedByCreatedAtComments = [...comments].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  // 전체 채팅글 HTML 코드 생성
  const commentsHTML = sortedByCreatedAtComments
    .map((comment) => {
      const formattedDate = formatDateToYMD(comment.createdAt);
      const isSameDate = currentDate === formattedDate; // 다음 댓글과 같은 생성날짜 인지 확인
      const isSameUser = currentUser === comment.creator.name && isSameDate; // 다음 댓글과 같은 유저 및 같은 날짜 인지 확인

      const dateHTML = isSameDate ? "" : createDateHTML(formattedDate); // 다른 날짜면 새로운 날짜 표기

      currentDate = formattedDate; // 현재 채팅글 날짜로 초기화
      currentUser = comment.creator.name; // 현재 채팅글 생성자로 초기화

      return `${dateHTML}${createCommentHTML(comment, isSameUser, userId)}`;
    })
    .join("");

  return commentsHTML;
}

/**
 * 채팅 텍스트 HTML 코드 생성
 * @param content 채팅 텍스트 내용
 * @returns 채팅 텍스트 HTML 코드 (p)
 */
function createMessageHTML(content) {
  const messageClass = content === null ? "delete-message" : "";
  const messageContent = content === null ? DELETED_MESSAGE : content;

  return `<p class="${messageClass}">${messageContent}</p>`;
}

/**
 * 채팅창 날짜 표시 HTML 코드 생성
 * @param date 날짜 출력 형식
 * @returns 날짜 텍스트 HTML 코드 (li)
 */
function createDateHTML(date) {
  return `<li class="comment-currentDate">${date}</li>`;
}
