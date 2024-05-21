import { navigate } from "../routes";
import { ROUTES } from "../constants";
import { store } from "../store";
import { logoutHandler } from "../handler/logoutHandler";

const $navigation = document.createElement("nav");
$navigation.classList.add("nav-container");

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
    const { isLogin, username, isLoading } = store.getState();

    const $userName = document.createElement("span");
    $userName.classList.add("nav-username");
    $userName.innerText = isLogin ? `${username}님!` : "";

    const $signBtn = document.createElement("span");
    $signBtn.classList.add("nav-signBtn");
    $signBtn.innerText = isLogin ? "로그아웃" : "로그인";
    $signBtn.addEventListener("click", () =>
      isLogin ? logoutHandler() : navigate(ROUTES.LOGIN)
    );

    !isLoading && isLogin && $box.appendChild($userName);
    !isLoading && $box.appendChild($signBtn);
  };

  renderButtonBox();

  store.subscribe(renderButtonBox);

  return $box;
}

function render() {
  const $wrapper = document.createElement("div");
  $wrapper.classList.add("nav-wrapper");

  $wrapper.appendChild(Title());
  $wrapper.appendChild(ButtonBox());

  $navigation.appendChild($wrapper);
}

render();

export default $navigation;
