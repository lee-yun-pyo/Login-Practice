import store from "../store";

import { ChatTextInput } from "../components/ChatTextInput";
import { ChatLoginBtnBox } from "../components/ChatLoginBtnBox";

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
  const $box = document.createElement("div");
  $box.classList.add("chatting-inputBox");

  const renderMessageInput = () => {
    $box.innerHTML = "";
    const { isLogin } = store.getState();

    isLogin
      ? $box.appendChild(ChatTextInput())
      : $box.append(ChatLoginBtnBox());
  };

  renderMessageInput();

  store.subscribe(renderMessageInput);

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
