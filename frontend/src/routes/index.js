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

export function changeUrl(requestedUrl) {
  history.pushState(null, null, requestedUrl);

  // 노드 교체
  const oldChild = $main.children[0];
  $main.replaceChild(routes[requestedUrl], oldChild);
}
