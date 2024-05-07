import { navigate } from "../routes";
import { ROUTES } from "../constants";
import store from "../store";

const $navigation = document.createElement("nav");
$navigation.classList.add("nav");

function Title() {
  const $title = document.createElement("h1");
  $title.classList.add("nav-title");
  $title.innerText = "Login Practice";

  $title.addEventListener("click", () => navigate(ROUTES.HOME));

  return $title;
}

function ButtonBox() {
  const $box = document.createElement("div");
  $box.classList.add("nav-btnBox");

  const renderButtonBox = () => {
    $box.innerHTML = "";
    const { isLogin, username } = store.getState();

    const $userName = document.createElement("span");
    $userName.classList.add("nav-username");
    $userName.innerText = isLogin ? username : "";

    const $signBtn = document.createElement("span");
    $signBtn.classList.add("nav-signBtn");
    $signBtn.innerText = isLogin ? "로그아웃" : "로그인";
    $signBtn.addEventListener("click", () => navigate(ROUTES.LOGIN));

    isLogin && $box.appendChild($userName);
    $box.appendChild($signBtn);
  };

  renderButtonBox();

  store.subscribe(renderButtonBox);

  return $box;
}

function render() {
  $navigation.appendChild(Title());
  $navigation.appendChild(ButtonBox());
}

render();

export default $navigation;
