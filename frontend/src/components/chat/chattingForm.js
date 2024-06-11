import { disableButton, enableButton, scrollToBottom } from "../../utils";
import { ROUTES } from "../../constants";
import { navigate } from "../../routes";

import { showChatToast } from "./chatToast";

import { createCommentHandler } from "../../handler/createCommentHandler";

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

  const $tempCommentNode = createTempCommentNode(content);
  $chattingComments.appendChild($tempCommentNode);
  scrollToBottom($chatBoard);
  try {
    await createCommentHandler(content);
  } catch (error) {
    showChatToast("에러가 발생했어요. 다시 시도해주세요", true);
  } finally {
    if ($chattingComments.contains($tempCommentNode)) {
      $chattingComments.removeChild($tempCommentNode);
    }

    disableButton($chatButton);
    clearInput($chatInput);
  }
};

const handleSubmitForm = (event) => {
  event.preventDefault();
  handleSubmitComment($chatInput.value);
};

$loginBtnBox.addEventListener("click", handleLoginClick);
$chatInput.addEventListener("input", handleChatInput);
$chatForm.addEventListener("submit", handleSubmitForm);
