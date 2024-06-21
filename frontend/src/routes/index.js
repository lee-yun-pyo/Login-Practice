import { ROUTES } from "../constants";

import {
  handleLoginAlert,
  handleSignupAlert,
} from "../components/Sign/alertMessage";

/**
 * 주어진 URL로 브라우저의 히스토리 상태를 업데이트 및 해당 상태로 navigate.
 * @param {string} url - 새로 업데이트할 대상 URL
 */
export function updateRoute(url) {
  const state = { url };
  if (url === window.location.pathname) {
    history.replaceState(state, "", url);
  } else {
    history.pushState(state, "", url);
  }
  navigate(state);
}

/**
 * popstate 이벤트가 발생할 때 호출되어, 이벤트의 상태로 navigate.
 * @param {PopStateEvent} event - popstate 이벤트 객체.
 */
function popStateHandler(event) {
  const { state } = event;
  if (state) {
    navigate(state);
  } else {
    navigate({ url: window.location.pathname });
  }
}

/**
 * 주어진 상태에 따라 해당 URL에 맞는 뷰를 표시.
 * @param {Object} state - 상태 객체.
 */
function navigate(state) {
  const { url } = state;

  const $main = document.querySelector("main");
  const views = {
    chatting: $main.querySelector("#chattingView"),
    login: $main.querySelector("#loginView"),
    signup: $main.querySelector("#signupView"),
    complete: $main.querySelector("#signupCompleteView"),
  };

  switch (url) {
    case ROUTES.HOME:
      updateView(views, views.chatting);
      break;
    case ROUTES.LOGIN:
      updateView(views, views.login);
      break;
    case ROUTES.SIGNUP:
      updateView(views, views.signup);
      break;
    default:
      break;
  }
}

/**
 * 업데이트할 뷰를 표시하고 다른 뷰를 숨긴다.
 * @param {Object} views - 모든 뷰를 담고 있는 객체.
 * @param {HTMLElement} viewToShow - 표시할 뷰의 DOM 요소.
 */
function updateView(views, viewToShow) {
  const $main = document.querySelector("main");
  const $signWrappers = $main.querySelectorAll(".sign-wrapper");

  Object.values(views).forEach((view) => view.classList.add("hidden"));
  viewToShow.classList.remove("hidden");

  // 폼 초기화
  $signWrappers.forEach(resetForm);

  // 에러 메시지 초기화
  handleLoginAlert("");
  handleSignupAlert("");
}

/**
 * 주어진 wrapper 요소 내의 폼을 초기화한다.
 * @param {HTMLElement} wrapper - 폼이 포함된 래퍼 요소.
 */
function resetForm(wrapper) {
  const $form = wrapper.querySelector("form");
  if ($form) {
    $form.reset();
  }
}

window.addEventListener("popstate", popStateHandler);
