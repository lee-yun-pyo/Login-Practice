import { ROUTES } from "../constants/index.js";

import Home from "../view/chatting.js";
import { LoginView } from "../view/login.js";
import { SignupView } from "../view/signup.js";
import $main from "../view/main.js";

import { handleSignupAlert } from "../components/Sign/SignupAlertMessage.js";
import { handleLoginAlert } from "../components/Sign/LoginAlertMessage.js";

export const routes = {
  [ROUTES.HOME]: Home,
  [ROUTES.LOGIN]: LoginView(),
  [ROUTES.SIGNUP]: SignupView(),
};

export function navigate(requestedUrl) {
  if (requestedUrl === window.location.pathname)
    history.replaceState(null, "", requestedUrl);
  else history.pushState(null, "", requestedUrl);

  // 노드 교체
  const oldChild = $main.children[0];
  const newChild = routes[requestedUrl];

  // 폼 초기화
  const $form = newChild.querySelector("form");
  if ($form) $form.reset();
  handleLoginAlert("");
  handleSignupAlert("");

  $main.replaceChild(newChild, oldChild);
}
