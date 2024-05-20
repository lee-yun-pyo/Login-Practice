import Home from "../view/chatting.js";
import Login from "../view/login.js";
import SignUp from "../view/signup.js";
import $main from "../view/main.js";

import { ROUTES } from "../constants/index.js";

export const routes = {
  [ROUTES.HOME]: Home,
  [ROUTES.LOGIN]: Login,
  [ROUTES.SIGNUP]: SignUp,
};

export function navigate(requestedUrl) {
  if (requestedUrl === window.location.pathname)
    history.replaceState(null, "", requestedUrl);
  else history.pushState(null, "", requestedUrl);

  // 노드 교체
  const oldChild = $main.children[0];
  const newChild = routes[requestedUrl];

  // 폼 초기화
  const form = newChild.querySelector("form");
  if (form) form.reset();

  $main.replaceChild(newChild, oldChild);
}
