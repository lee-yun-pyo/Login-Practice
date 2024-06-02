import { navigate } from "./routes/index.js";

import "./components/common/Navigation.js";
import "./components/common/Modal.js";
import "./components/Sign/navigateSign.js";
import "./components/Sign/login.js";
import "./components/Sign/signup.js";

import "./components/chat/toggleChatInput.js";
import "./components/chat/chattingForm.js";
import "./components/chat/board.js";

import { initSessionExpiryCheck } from "./handler/sessionExpiryHandler.js";

document.addEventListener("DOMContentLoaded", initSessionExpiryCheck);
window.addEventListener("popstate", () => navigate(window.location.pathname));
