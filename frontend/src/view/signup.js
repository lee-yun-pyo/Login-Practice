import { ALERT_MESSAGE, emailRegex } from "../constants";
import * as authFunc from "../utils/auth";

import { SignTextBtn } from "../components/SignTextBtn";
import { SignTitle } from "../components/signTitle";
import {
  $signupAlertMessage,
  handleSignupAlert,
} from "../components/SignupAlertMessage";
import { SignupComplete } from "../components/SignupComplete";

import { signUpHandler } from "../handler/signupHandler";

const $signupWrapper = document.createElement("div");
$signupWrapper.classList.add("sign-wrapper");

const $signUpBox = document.createElement("div");
$signUpBox.classList.add("sign-box");

function moveToSignupComplete(username) {
  $signupWrapper.replaceChild(
    SignupComplete(username),
    $signupWrapper.childNodes[0]
  );
}

function signupFormTag() {
  const $form = document.createElement("form");
  $form.classList.add("sign-form");
  $form.innerHTML = ` 
        <input
          id="email-input"
          class="sign-inputText"
          type="text"
          placeholder="example@email.com"
        />
        <input
          id="name-input"
          class="sign-inputText"
          type="text"
          placeholder="이름"
        />
        <input
          id="pw-input"
          class="sign-inputText"
          type="password"
          placeholder="비밀번호"
          autocomplete="off"
        />
        <input
          id="pwConfirm-input"
          class="sign-inputText"
          type="password"
          placeholder="비밀번호 확인"
          autocomplete="off"
        />
        <input class="sign-submitBtn" type="submit" value="회원가입" />
  `;

  const $emailInput = $form.querySelector("#email-input"),
    $nameInput = $form.querySelector("#name-input"),
    $pwInput = $form.querySelector("#pw-input"),
    $pwConfirmInput = $form.querySelector("#pwConfirm-input");

  handleSignupAlert("");
  $form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const account = {
      email: $emailInput.value,
      name: $nameInput.value,
      password: $pwInput.value,
    };
    const { email, name, password } = account;
    const passwordConfirm = $pwConfirmInput.value;

    if (authFunc.isEmptyEmail(email)) {
      handleSignupAlert(ALERT_MESSAGE.AUTH.IS_EMPTY_EMAIL);
      return;
    }

    if (!authFunc.isValidEmail(email, emailRegex)) {
      handleSignupAlert(ALERT_MESSAGE.AUTH.IS_NOT_EMAIL_FORM);
      return;
    }

    if (authFunc.isEmptyName(name)) {
      handleSignupAlert(ALERT_MESSAGE.AUTH.IS_EMPTY_NAME);
      return;
    }

    if (authFunc.isEmptyPassword(password)) {
      handleSignupAlert(ALERT_MESSAGE.AUTH.IS_EMPTY_PW);
      return;
    }

    if (authFunc.isInValidPassword(password)) {
      handleSignupAlert(ALERT_MESSAGE.AUTH.IS_INVALID_PW_LENGTH);
      return;
    }

    if (authFunc.isEmptyPasswordConfirm(passwordConfirm)) {
      handleSignupAlert(ALERT_MESSAGE.AUTH.IS_EMPTY_PW_CONFIRM);
      return;
    }

    if (authFunc.isPasswordInCorrect(password, passwordConfirm)) {
      handleSignupAlert(ALERT_MESSAGE.AUTH.IS_INCORRECT_PW);
      return;
    }

    handleSignupAlert("");
    const username = await signUpHandler(account);
    if (username) moveToSignupComplete(username);
  });

  return $form;
}

$signUpBox.appendChild(SignTitle(false));
$signUpBox.appendChild(signupFormTag());
$signUpBox.appendChild($signupAlertMessage);
$signUpBox.appendChild(SignTextBtn(false));

$signupWrapper.appendChild($signUpBox);

export default $signupWrapper;
