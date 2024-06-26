import "./socket/index.js";

import "./components/common/header.js";
import "./components/common/Modal.js";

import "./components/Sign/navigateSign.js";
import "./components/Sign/login.js";
import "./components/Sign/signup.js";

import "./components/chat/toggleChatInput.js";
import "./components/chat/chatForm.js";
import "./components/chat/board.js";

import "./handler/scrollToBottomByBtn.js";
import "./handler/infiniteScroll.js";
import { initSessionExpiryCheck } from "./handler/sessionExpiryHandler.js";
import { initInfiniteScroll } from "./handler/infiniteScroll.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
  initSessionExpiryCheck();
  initInfiniteScroll();
}
