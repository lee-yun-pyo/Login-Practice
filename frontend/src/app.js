import $navigation from "./view/navigation.js";
import $main from "./view/main.js";
import store from "./store/index.js";
import { initializeLoginStatus } from "./store/action.js";

const $app = document.getElementById("app");

$app.appendChild($navigation);
$app.appendChild($main);

function loadedHandler() {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  const userId = localStorage.getItem("userId");
  store.dispatch(initializeLoginStatus(userId));
}

document.addEventListener("DOMContentLoaded", loadedHandler);
