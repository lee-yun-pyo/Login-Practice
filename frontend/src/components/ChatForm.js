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

  $button.disabled = true;
  $button.classList.add("disabled");

  await createCommentHandler(content);

  $button.disabled = false;
  $button.classList.remove("disabled");
  $input.value = "";
}

export default $chatForm;
