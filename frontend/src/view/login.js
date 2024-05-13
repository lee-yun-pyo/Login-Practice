import { ALERT_MESSAGE, emailRegex } from "../constants";
import * as authFunc from "../utils/auth";

import { loginHandler } from "../handler/loginHandler";

import { SignTextBtn } from "../components/SignTextBtn";
import { SignTitle } from "../components/signTitle";
import {
  $loginAlertMessage,
  handleLoginAlert,
} from "../components/LoginAlertMessage";

const $loginDiv = document.createElement("div");
$loginDiv.classList.add("sign-wrapper");

function loginFormTag() {
  const $form = document.createElement("form");
  $form.classList.add("sign-form");
  $form.innerHTML = ` 
      <input
        class="sign-inputText"
        type="text"
        placeholder="example@email.com"
      />
      <input
        class="sign-inputText"
        type="password"
        placeholder="비밀번호"
        autocomplete="off"
      />
      <input id="login-submitBtn" class="sign-submitBtn" type="submit" value="로그인" />
  `;

  const $emailInput = $form.querySelector('input[type="text"]'),
    $passwordInput = $form.querySelector('input[type="password"]'),
    $submitButton = $form.querySelector("#login-submitBtn");

  const handleAlert = (message) => {
    handleLoginAlert(message);
    $submitButton.disabled = false;
  };

  handleAlert("");
  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    $submitButton.disabled = true;

    const account = {
      email: $emailInput.value,
      password: $passwordInput.value,
    };
    const { email, password } = account;

    if (authFunc.isEmptyEmail(email)) {
      handleAlert(ALERT_MESSAGE.AUTH.IS_EMPTY_EMAIL);
      return;
    }

    if (authFunc.isEmptyPassword(password)) {
      handleAlert(ALERT_MESSAGE.AUTH.IS_EMPTY_PW);
      return;
    }

    if (!authFunc.isValidEmail(email, emailRegex)) {
      handleAlert(ALERT_MESSAGE.AUTH.IS_NOT_EMAIL_FORM);
      return;
    }

    handleAlert("");

    loginHandler(account);
    $submitButton.disabled = false;
  });

  return $form;
}

$loginDiv.appendChild(SignTitle(true));
$loginDiv.appendChild(loginFormTag());
$loginDiv.appendChild($loginAlertMessage);
$loginDiv.appendChild(SignTextBtn(true));

export default $loginDiv;
