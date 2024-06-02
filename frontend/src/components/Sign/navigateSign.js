import { ROUTES } from "../../constants";
import { navigate } from "../../routes";

const $loginContainer = document.querySelector("#loginView");
const $signupContainer = document.querySelector("#signupView");
const $signupComplete = document.querySelector("#signupCompleteView");

const addNavigationListener = (button, route) => {
  button.addEventListener("click", () => navigate(route));
};

const setupNavigation = () => {
  const $loginTextButton = $loginContainer.querySelector(".sign-textBtn");
  const $signupTextButton = $signupContainer.querySelector(".sign-textBtn");
  const $moveToLoginBtn = $signupComplete.querySelector("#moveToLoginBtn");

  addNavigationListener($loginTextButton, ROUTES.SIGNUP);
  addNavigationListener($signupTextButton, ROUTES.LOGIN);
  addNavigationListener($moveToLoginBtn, ROUTES.LOGIN);
};

setupNavigation();
