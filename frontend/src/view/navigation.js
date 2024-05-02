import { changeUrl } from "../routes";

const $navigation = document.createElement("nav");
$navigation.classList.add("nav");

function Title() {
  const $title = document.createElement("h1");
  $title.classList.add("nav-title");
  $title.innerText = "Login Practice";

  return $title;
}

function ButtonBox() {
  const isSignin = false; // Todo: 로그인 상태 가져오기
  const $box = document.createElement("div");
  $box.classList.add("nav-btnBox");

  const $userName = document.createElement("span");
  $userName.classList.add("nav-username");
  $userName.innerText = isSignin ? "예시유저명" : ""; // Todo: 로그인 유저명 가져오기

  const $signBtn = document.createElement("span");
  $signBtn.classList.add("nav-signBtn");
  $signBtn.innerText = isSignin ? "로그아웃" : "로그인";
  $signBtn.addEventListener("click", () => changeUrl("/login"));

  isSignin && $box.appendChild($userName);
  $box.appendChild($signBtn);

  return $box;
}

function render() {
  $navigation.appendChild(Title());
  $navigation.appendChild(ButtonBox());
}

render();

export default $navigation;
