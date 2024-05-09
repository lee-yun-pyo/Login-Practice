export function ChatTextInput() {
  const $fragment = document.createDocumentFragment();

  const $input = document.createElement("input");
  $input.setAttribute("type", "text");
  $input.setAttribute("placeholder", "내용을 입력하세요");
  $input.classList.add("messageInput-input");

  const $button = document.createElement("input");
  $button.setAttribute("type", "submit");
  $button.setAttribute("value", "전송");
  $button.classList.add("messageInput-button");

  $fragment.appendChild($input);
  $fragment.appendChild($button);

  return $fragment;
}
