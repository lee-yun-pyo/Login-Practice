import { store } from "../../store";

import { navigate } from "../../routes";
import { ROUTES } from "../../constants";

import { logoutHandler } from "../../handler/logoutHandler";

const $navigation = document.querySelector(".nav-container"),
  $navTitle = $navigation.querySelector(".nav-title"),
  $navUsername = $navigation.querySelector(".nav-username"),
  $navSignButton = $navigation.querySelector(".nav-signBtn");

$navTitle.addEventListener("click", () => navigate(ROUTES.HOME));

const handleNavSignButtonClick = (isLogin) => {
  if (isLogin) {
    logoutHandler();
  } else {
    navigate(ROUTES.LOGIN);
  }
};

const renderButtonBox = () => {
  const {
    user: { isLogin, username },
  } = store.getState();

  $navUsername.innerText = isLogin ? `${username}님!` : "";

  $navSignButton.innerText = isLogin ? "로그아웃" : "로그인";
  $navSignButton.removeEventListener("click", () =>
    handleNavSignButtonClick(isLogin)
  );
  $navSignButton.addEventListener("click", () =>
    handleNavSignButtonClick(isLogin)
  );
};

renderButtonBox();
store.subscribe(renderButtonBox);
