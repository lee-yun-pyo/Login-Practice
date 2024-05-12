import { ALERT_MESSAGE, emailRegex } from "../constants";
import * as authFunc from "../utils/auth";

import { SignTextBtn } from "../components/SignTextBtn";
import { SignTitle } from "../components/signTitle";

const $signUpDiv = document.createElement("div");
$signUpDiv.classList.add("sign-wrapper");

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

  handleAlert();
  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const account = {
      email: $emailInput.value,
      name: $nameInput.value,
      password: $pwInput.value,
    };
    const { email, name, password } = account;
    const passwordConfirm = $pwConfirmInput.value;

    if (authFunc.isEmptyEmail(email)) {
      handleAlert(ALERT_MESSAGE.AUTH.IS_EMPTY_EMAIL);
      return;
    }

    if (!authFunc.isValidEmail(email, emailRegex)) {
      handleAlert(ALERT_MESSAGE.AUTH.IS_NOT_EMAIL_FORM);
      return;
    }

    if (authFunc.isEmptyName(name)) {
      handleAlert(ALERT_MESSAGE.AUTH.IS_EMPTY_NAME);
      return;
    }

    if (authFunc.isEmptyPassword(password)) {
      handleAlert(ALERT_MESSAGE.AUTH.IS_EMPTY_PW);
      return;
    }

    if (authFunc.isInValidPassword(password)) {
      handleAlert(ALERT_MESSAGE.AUTH.IS_INVALID_PW_LENGTH);
      return;
    }

    if (authFunc.isEmptyPasswordConfirm(passwordConfirm)) {
      handleAlert(ALERT_MESSAGE.AUTH.IS_EMPTY_PW_CONFIRM);
      return;
    }

    if (authFunc.isPasswordInCorrect(password, passwordConfirm)) {
      handleAlert(ALERT_MESSAGE.AUTH.IS_INCORRECT_PW);
      return;
    }

    handleAlert();
  });

  return $form;
}

// 경고 메시지 요소 생성
const $alertText = document.createElement("p");
$alertText.classList.add("alert-text");

function handleAlert(message = "") {
  $alertText.style.display = message !== "" ? "block" : "none";
  $alertText.innerText = message;
}

$signUpDiv.appendChild(SignTitle(false));
$signUpDiv.appendChild(signupFormTag());
$signUpDiv.appendChild($alertText);
$signUpDiv.appendChild(SignTextBtn(false));

export default $signUpDiv;
