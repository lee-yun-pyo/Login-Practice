import { navigate } from "../routes";
import { ROUTES } from "../constants";

const $chattingDiv = document.createElement("div");
$chattingDiv.classList.add("chatting-container");

function Title() {
  const $title = document.createElement("h2");
  $title.innerText = "게시판";
  return $title;
}

function Board() {
  const $board = document.createElement("div");
  $board.classList.add("chatting-board");
  return $board;
}

function MessageInput() {
  const isLogin = false; // Todo: 로그인 상태 처리

  const $box = document.createElement("div");
  $box.classList.add("chatting-inputBox");

  const $input = document.createElement("input");
  $input.setAttribute("type", "text");
  $input.setAttribute("placeholder", "내용을 입력하세요");
  $input.classList.add("messageInput-input");

  const $button = document.createElement("input");
  $button.setAttribute("type", "submit");
  $button.setAttribute("value", "전송");
  $button.classList.add("messageInput-button");

  const $loginBtnBox = document.createElement("div");
  $loginBtnBox.classList.add("chatting-loginBtnBox");
  $loginBtnBox.innerHTML = `
    <span>채팅하기 위해 <strong>로그인</strong> 해주세요.<span>
  `;

  $loginBtnBox.addEventListener("click", ({ target }) => {
    if (!target.matches("strong")) return;
    navigate(ROUTES.LOGIN);
  });

  isLogin ? $box.append($input, $button) : $box.append($loginBtnBox);

  return $box;
}

function render() {
  $chattingDiv.appendChild(Title());
  const $chatBox = document.createElement("div");
  $chatBox.classList.add("chatting-box");
  $chatBox.appendChild(Board());
  $chatBox.appendChild(MessageInput());
  $chattingDiv.appendChild($chatBox);
}

render();

export default $chattingDiv;
