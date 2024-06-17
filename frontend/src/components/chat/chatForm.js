import { navigate } from "../../routes";

import { socketEmit } from "../../socket/index";

import { disableButton, enableButton, scrollToBottom } from "../../utils";
import { SOCKET_EVENT, SOCKET_TYPE } from "../../constants/socket";
import { API_PATH, ROUTES } from "../../constants";

import { showChatToast } from "./chatToast";

import { authFetch } from "../../api/authFetch";

const $chatBoard = document.querySelector(".chatting-board");
const $chattingComments = $chatBoard.querySelector(".chatting-comments");

const $chatForm = document.querySelector(".chatting-form");
const $chatInput = $chatForm.querySelector(".messageInput-input");
const $chatButton = $chatForm.querySelector(".messageInput-button");

const $loginBtnBox = document.querySelector(".chatting-loginBtnBox");

const handleLoginClick = ({ target }) => {
  if (target.closest("strong")) {
    navigate(ROUTES.LOGIN);
  }
};

const handleChatInput = () => {
  if ($chatInput.value.trim() === "") {
    disableButton($chatButton);
  } else {
    enableButton($chatButton);
  }
};

const clearInput = ($input) => {
  $input.value = "";
};

const createTempCommentNode = (content) => {
  const $newComment = document.createElement("div");
  $newComment.classList.add("comment-wrapper");
  $newComment.classList.add("comment-wrapper__temp");
  $newComment.classList.add("comment-wrapper__self");

  $newComment.innerHTML = `
        <span class="comment-createdAt">전송 중!</span>
        <div class="comment-box comment-box__self">
          <p>${content}</p>
        </div>
    `;

  return $newComment;
};

const handleSubmitComment = async (content) => {
  if (content === "") return;

  disableButton($chatButton);
  clearInput($chatInput);

  const $tempCommentNode = createTempCommentNode(content);
  $chattingComments.appendChild($tempCommentNode);
  scrollToBottom($chatBoard);
  try {
    const newComment = await authFetch(
      API_PATH.createComment(),
      "PUT",
      content
    );
    socketEmit(SOCKET_EVENT.COMMENT, SOCKET_TYPE.CREATE, newComment);
  } catch (error) {
    showChatToast(error.message, true);
  }
};

const handleSubmitForm = (event) => {
  event.preventDefault();
  handleSubmitComment($chatInput.value);
};

$loginBtnBox.addEventListener("click", handleLoginClick);
$chatInput.addEventListener("input", handleChatInput);
$chatForm.addEventListener("submit", handleSubmitForm);
