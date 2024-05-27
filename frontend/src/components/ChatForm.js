import { store } from "../store";
import { COMMENT_ACTIONS } from "../store/action";

import $board from "./Board";

import { createCommentHandler } from "../handler/createCommentHandler";

const $chatForm = document.createElement("form");
$chatForm.classList.add("chatting-form");

const $input = document.createElement("input");
$input.setAttribute("type", "text");
$input.setAttribute("placeholder", "내용을 입력하세요");
$input.classList.add("messageInput-input");

const $button = document.createElement("input");
$button.setAttribute("type", "submit");
$button.setAttribute("value", "전송");
$button.classList.add("messageInput-button");
$button.classList.add("disabled");
$button.disabled = true;

$input.addEventListener("input", () => {
  if ($input.value.trim() === "") {
    $button.disabled = true;
    $button.classList.add("disabled");
  } else {
    $button.disabled = false;
    $button.classList.remove("disabled");
  }
});

$button.addEventListener("click", (event) =>
  handleSubmitComment(event, $input.value)
);

$chatForm.appendChild($input);
$chatForm.appendChild($button);

async function handleSubmitComment(event, content) {
  event.preventDefault();
  if (content === "") return;

  disableButton();

  const $tempCommentNode = createTempCommentNode(content);
  $board.appendChild($tempCommentNode);

  try {
    const newComment = await createCommentHandler(content);
    store.dispatch(COMMENT_ACTIONS.add(newComment));
  } catch (error) {
    // 📌 TO_DO: 코멘트 생성 시 에러 처리
    console.error("Failed to create comment:", error);
  } finally {
    if ($board.contains($tempCommentNode)) {
      $board.removeChild($tempCommentNode);
    }
    enableButton();
    clearInput();
  }
}

export default $chatForm;

function createTempCommentNode(content) {
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
}

function disableButton() {
  $button.disabled = true;
  $button.classList.add("disabled");
}

function enableButton() {
  $button.disabled = false;
  $button.classList.remove("disabled");
}

function clearInput() {
  $input.value = "";
}
