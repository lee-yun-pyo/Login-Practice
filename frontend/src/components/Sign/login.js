import * as authFunc from "../../utils/auth";
import { disableButton, enableButton } from "../../utils";
import { ALERT_MESSAGE, emailRegex } from "../../constants";

import { handleLoginAlert } from "./alertMessage";

import { signinFetch } from "../../api/signinFetch";

const $loginContainer = document.querySelector("#loginView");

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
    await signinFetch(account);
    showAlert("");
  } catch (error) {
    showAlert(error.message);
  }
}
