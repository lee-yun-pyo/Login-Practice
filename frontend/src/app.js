import { store } from "./store/index.js";

import $main from "./view/main.js";

import "./components/common/Navigation.js";
import "./components/common/Modal.js";

import { handleSessionExpiry } from "./handler/sessionExpiryHandler.js";

const $app = document.getElementById("app");

$app.appendChild($main);

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
