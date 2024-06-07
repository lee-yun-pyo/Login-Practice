import { ROUTES } from "../constants/index.js";

import {
  handleLoginAlert,
  handleSignupAlert,
} from "../components/Sign/alertMessage.js";

export function navigate(requestedUrl) {
  const $main = document.querySelector("main");
  const $signWrappers = $main.querySelectorAll(".sign-wrapper");
  const views = {
    chatting: $main.querySelector("#chattingView"),
    login: $main.querySelector("#loginView"),
    signup: $main.querySelector("#signupView"),
    complete: $main.querySelector("#signupCompleteView"),
  };

  const updateHistory = (url) => {
    if (url === window.location.pathname) {
      history.replaceState(null, "", url);
    } else {
      history.pushState(null, "", url);
    }
  };

  const showView = (viewToShow) => {
    Object.values(views).forEach((view) => view.classList.add("hidden"));
    viewToShow.classList.remove("hidden");
  };

  updateHistory(requestedUrl);

  switch (requestedUrl) {
    case ROUTES.HOME:
      showView(views.chatting);
      break;
    case ROUTES.LOGIN:
      showView(views.login);
      break;
    case ROUTES.SIGNUP:
      showView(views.signup);
      break;
    default:
      break;
  }

  const resetForm = (wrapper) => {
    const $form = wrapper.querySelector("form");
    if ($form) {
      $form.reset();
    }
  };

  // 폼 초기화
  $signWrappers.forEach(resetForm);

  handleLoginAlert("");
  handleSignupAlert("");
}
