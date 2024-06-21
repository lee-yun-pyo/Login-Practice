import { store } from "../../store";

import { updateRoute } from "../../routes";
import { ROUTES } from "../../constants";

import { logoutHandler } from "../../handler/logoutHandler";

const $header = document.querySelector(".header-container"),
  $headerTitle = $header.querySelector(".header-title"),
  $headerUsername = $header.querySelector(".header-username"),
  $headerSignButton = $header.querySelector(".header-signBtn");

$headerTitle.addEventListener("click", () => updateRoute(ROUTES.HOME));

const handleHeaderSignButtonClick = (isLogin) => {
  if (isLogin) {
    logoutHandler();
  } else {
    updateRoute(ROUTES.LOGIN);
  }
};

const renderButtonBox = () => {
  const {
    user: { isLogin, username },
  } = store.getState();

  $headerUsername.innerText = isLogin ? `${username}님!` : "";

  $headerSignButton.innerText = isLogin ? "로그아웃" : "로그인";
  $headerSignButton.removeEventListener("click", () =>
    handleHeaderSignButtonClick(isLogin)
  );
  $headerSignButton.addEventListener("click", () =>
    handleHeaderSignButtonClick(isLogin)
  );
};

renderButtonBox();
store.subscribe(renderButtonBox);
