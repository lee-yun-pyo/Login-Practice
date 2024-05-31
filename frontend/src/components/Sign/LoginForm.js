import * as authFunc from "../../utils/auth";
import { disableButton, enableButton } from "../../utils";
import { CommonError } from "../../utils/CommonError";
import { ALERT_MESSAGE, emailRegex } from "../../constants";

import { handleLoginAlert } from "./LoginAlertMessage";

import { loginHandler } from "../../handler/loginHandler";

export function LoginForm() {
  const $form = document.createElement("form");
  $form.classList.add("sign-form");

  $form.innerHTML = ` 
    <input class="sign-inputText" type="text" placeholder="example@email.com" />
    <input class="sign-inputText" type="password" placeholder="비밀번호" autocomplete="off" />
    <input id="login-submitBtn" class="sign-submitBtn" type="submit" value="로그인" />
   `;

  const formElements = {
    $emailInput: $form.querySelector('input[type="text"]'),
    $passwordInput: $form.querySelector('input[type="password"]'),
    $submitButton: $form.querySelector("#login-submitBtn"),
  };

  const showAlert = handleAlert(formElements.$submitButton);
  showAlert("");

  $form.addEventListener("submit", (event) =>
    submitHandler(event, formElements, showAlert)
  );

  return $form;
}

const handleAlert = ($submitButton) => {
  return (message) => {
    handleLoginAlert(message);
    if ($submitButton) {
      enableButton($submitButton);
    }
  };
};

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
