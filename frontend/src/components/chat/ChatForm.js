import { store } from "../../store";
import { COMMENT_ACTIONS } from "../../store/action";

import { disableButton, enableButton } from "../../utils";

import $board from "../Board";

import { createCommentHandler } from "../../handler/createCommentHandler";

export function ChatForm() {
  const $container = document.createElement("form");
  $container.classList.add("chatting-form");

  const $input = document.createElement("input");
  $input.setAttribute("type", "text");
  $input.setAttribute("placeholder", "내용을 입력하세요");
  $input.classList.add("messageInput-input");

  const $button = document.createElement("input");
  $button.setAttribute("type", "submit");
  $button.setAttribute("value", "전송");
  $button.classList.add("messageInput-button");
  disableButton($button);

  $input.addEventListener("input", () => {
    if ($input.value.trim() === "") {
      disableButton($button);
    } else {
      enableButton($button);
    }
  });

  $button.addEventListener("click", (event) =>
    handleSubmitComment(event, $input.value)
  );

  $container.appendChild($input);
  $container.appendChild($button);

  async function handleSubmitComment(event, content) {
    event.preventDefault();
    if (content === "") return;

    disableButton($button);

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
      enableButton($button);
      clearInput();
    }
  }

  return $container;
}

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

function clearInput() {
  $input.value = "";
}
