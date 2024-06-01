import { navigate } from "./routes/index.js";

import "./components/common/Navigation.js";
import "./components/common/Modal.js";
import "./components/Sign/login.js";

import { initSessionExpiryCheck } from "./handler/sessionExpiryHandler.js";

document.addEventListener("DOMContentLoaded", initSessionExpiryCheck);
window.addEventListener("popstate", () => navigate(window.location.pathname));
