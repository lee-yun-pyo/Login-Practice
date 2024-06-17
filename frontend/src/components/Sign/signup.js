import * as authFunc from "../../utils/auth";
import { disableButton, enableButton } from "../../utils";
import { ALERT_MESSAGE, emailRegex } from "../../constants";

import { handleSignupAlert } from "./alertMessage";

import { signupFetch } from "../../api/signupFetch";

const $signupContainer = document.querySelector("#signupView");

const $signupForm = $signupContainer.querySelector("form");
const formElements = {
  $emailInput: $signupForm.querySelector("#email-input"),
  $nameInput: $signupForm.querySelector("#name-input"),
  $pwInput: $signupForm.querySelector("#pw-input"),
  $pwConfirmInput: $signupForm.querySelector("#pwConfirm-input"),
  $submitButton: $signupForm.querySelector("#signup-submitBtn"),
};

const handleAlert = ($button) => {
  return (message) => {
    handleSignupAlert(message);
    if ($button) {
      enableButton($button);
    }
  };
};

const showAlert = handleAlert(formElements.$submitButton);

$signupForm.addEventListener("submit", (event) => {
  submitHandler(event, formElements, showAlert);
});

async function submitHandler(event, formElements, showAlert) {
  const { $emailInput, $nameInput, $pwInput, $pwConfirmInput, $submitButton } =
    formElements;

  event.preventDefault();
  disableButton($submitButton);

  const account = {
    email: $emailInput.value,
    name: $nameInput.value,
    password: $pwInput.value,
  };
  const { email, name, password } = account;
  const passwordConfirm = $pwConfirmInput.value;

  if (authFunc.isEmptyEmail(email)) {
    showAlert(ALERT_MESSAGE.AUTH.IS_EMPTY_EMAIL);
    return;
  }

  if (!authFunc.isValidEmail(email, emailRegex)) {
    showAlert(ALERT_MESSAGE.AUTH.IS_NOT_EMAIL_FORM);
    return;
  }

  if (authFunc.isEmptyName(name)) {
    showAlert(ALERT_MESSAGE.AUTH.IS_EMPTY_NAME);
    return;
  }

  if (authFunc.isEmptyPassword(password)) {
    showAlert(ALERT_MESSAGE.AUTH.IS_EMPTY_PW);
    return;
  }

  if (authFunc.isInValidPassword(password)) {
    showAlert(ALERT_MESSAGE.AUTH.IS_INVALID_PW_LENGTH);
    return;
  }

  if (authFunc.isEmptyPasswordConfirm(passwordConfirm)) {
    showAlert(ALERT_MESSAGE.AUTH.IS_EMPTY_PW_CONFIRM);
    return;
  }

  if (authFunc.isPasswordInCorrect(password, passwordConfirm)) {
    showAlert(ALERT_MESSAGE.AUTH.IS_INCORRECT_PW);
    return;
  }

  try {
    const username = await signupFetch(account);
    showAlert("");
    moveToSignupComplete(username);
  } catch (error) {
    showAlert(error.message);
  }
}

function moveToSignupComplete(username) {
  const $signupComplete = document.querySelector(".signup-complete"),
    $content = $signupComplete.querySelector(".signup-complete__content");
  $content.innerHTML = `${username}님의 회원가입이`;

  $signupComplete.classList.remove("hidden");
  $signupContainer.classList.add("hidden");
}
