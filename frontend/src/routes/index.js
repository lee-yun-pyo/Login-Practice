import Home from "../view/chatting.js";
import Login from "../view/login.js";
import SignUp from "../view/signup.js";
import $main from "../view/main.js";

export const routes = {
  "/frontend/": Home,
  "/login": Login,
  "/signup": SignUp,
};

export function changeUrl(requestedUrl) {
  history.pushState(null, null, requestedUrl);

  // 노드 교체
  const oldChild = $main.children[0];
  $main.replaceChild(routes[requestedUrl], oldChild);
}
