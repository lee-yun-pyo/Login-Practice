import * as authFunc from "../../utils/auth";
import { disableButton, enableButton } from "../../utils";
import { CommonError } from "../../utils/CommonError";
import { ALERT_MESSAGE, ROUTES, emailRegex } from "../../constants";
import { navigate } from "../../routes";

import { handleLoginAlert } from "./LoginAlertMessage";

import { loginHandler } from "../../handler/loginHandler";

const $loginContainer = document.querySelector("#loginView");
const $signupContainer = document.querySelector("#signupView");

const addNavigationListener = (button, route) => {
  button.addEventListener("click", () => navigate(route));
};

const setupNavigation = () => {
  const $loginTextButton = $loginContainer.querySelector(".sign-textBtn");
  const $signupTextButton = $signupContainer.querySelector(".sign-textBtn");

  addNavigationListener($loginTextButton, ROUTES.SIGNUP);
  addNavigationListener($signupTextButton, ROUTES.LOGIN);
};

setupNavigation();

const $loginForm = $loginContainer.querySelector("form");
const formElements = {
  $emailInput: $loginForm.querySelector('input[type="text"]'),
  $passwordInput: $loginForm.querySelector('input[type="password"]'),
  $submitButton: $loginForm.querySelector("#login-submitBtn"),
};

const handleAlert = ($button) => {
  return (message) => {
    handleLoginAlert(message);
    if ($button) {
      enableButton($button);
    }
  };
};

const showAlert = handleAlert(formElements.$submitButton);

$loginForm.addEventListener("submit", (event) => {
  submitHandler(event, formElements, showAlert);
});

async function submitHandler(event, formElements, showAlert) {
  const { $emailInput, $passwordInput, $submitButton } = formElements;

  event.preventDefault();
  disableButton($submitButton);

  const account = {
    email: $emailInput.value,
    password: $passwordInput.value,
  };
  const { email, password } = account;

  if (authFunc.isEmptyEmail(email)) {
    showAlert(ALERT_MESSAGE.AUTH.IS_EMPTY_EMAIL);
    return;
  }

  if (!authFunc.isValidEmail(email, emailRegex)) {
    showAlert(ALERT_MESSAGE.AUTH.IS_NOT_EMAIL_FORM);
    return;
  }

  if (authFunc.isEmptyPassword(password)) {
    showAlert(ALERT_MESSAGE.AUTH.IS_EMPTY_PW);
    return;
  }

  try {
    await loginHandler(account);
    showAlert("");
  } catch (error) {
    if (error instanceof CommonError) {
      const { statusCode, message } = error;
      if (statusCode === 401) {
        showAlert(message);
      }
    } else {
      showAlert("에러가 발생했어요. 다시 시도해주세요");
    }
  }
}
