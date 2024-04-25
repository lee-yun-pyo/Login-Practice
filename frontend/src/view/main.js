import $chattingDiv from "./chatting";
import $loginDiv from "./login";

const $main = document.createElement("main");

function render() {
  // Todo: url에 따라 분기 처리
  $main.append($loginDiv);
}

render();

export default $main;
