import "./components/Modal.js";
import $navigation from "./view/navigation.js";
import $main from "./view/main.js";

import $loading from "./components/Loading.js";
import { store } from "./store/index.js";
import { handleSessionExpiry } from "./handler/sessionExpiryHandler.js";

const $app = document.getElementById("app");

$app.appendChild($navigation);
$app.appendChild($main);
$app.appendChild($loading);

function initSessionExpiryCheck() {
  const {
    user: { expiresAt },
  } = store.getState();
  if (!expiresAt) return;

  const remainingMilliseconds =
    new Date(expiresAt).getTime() - new Date().getTime();

  handleSessionExpiry(remainingMilliseconds);
}

document.addEventListener("DOMContentLoaded", initSessionExpiryCheck);
