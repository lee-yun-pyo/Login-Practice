import $navigation from "./view/navigation.js";
import $main from "./view/main.js";
import store from "./store/index.js";
import { STORE_ACTION_TYPES } from "./constants/index.js";

const $app = document.getElementById("app");

$app.appendChild($navigation);
$app.appendChild($main);

function initializeLoginStatus() {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  const userId = localStorage.getItem("userId");
  store.dispatch({
    type: STORE_ACTION_TYPES.LOADED,
    isLogin: true,
    userId,
  });
}

document.addEventListener("DOMContentLoaded", initializeLoginStatus);
