import * as authFunc from "../../utils/auth";
import { CommonError } from "../../utils/CommonError";
import { disableButton, enableButton } from "../../utils";
import { ALERT_MESSAGE, emailRegex } from "../../constants";

import { SignupComplete } from "./SignupComplete";
import { handleSignupAlert } from "./SignupAlertMessage";

import { signUpHandler } from "../../handler/signupHandler";

export function SignUpForm() {
  const $form = document.createElement("form");
  $form.classList.add("sign-form");

  $form.innerHTML = ` 
    <input id="email-input" class="sign-inputText" type="text" placeholder="example@email.com" />
    <input id="name-input" class="sign-inputText" type="text" placeholder="이름" />
    <input id="pw-input" class="sign-inputText" type="password" placeholder="비밀번호" autocomplete="off" />
    <input id="pwConfirm-input" class="sign-inputText" type="password" placeholder="비밀번호 확인" autocomplete="off" />
    <input id="signup-submitBtn" class="sign-submitBtn" type="submit" value="회원가입" />
   `;

  const formElements = {
    $emailInput: $form.querySelector("#email-input"),
    $nameInput: $form.querySelector("#name-input"),
    $pwInput: $form.querySelector("#pw-input"),
    $pwConfirmInput: $form.querySelector("#pwConfirm-input"),
    $submitButton: $form.querySelector("#signup-submitBtn"),
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
    handleSignupAlert(message);
    if ($submitButton) {
      enableButton($submitButton);
    }
  };
};

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
    const username = await signUpHandler(account);
    showAlert("");
    moveToSignupComplete(username);
  } catch (error) {
    if (error instanceof CommonError) {
      const { statusCode, message } = error;

      // 이메일 중복 에러 메시지 출력
      if (statusCode === 409) {
        showAlert(message);
      }
    } else {
      showAlert("에러가 발생했어요. 다시 시도해주세요");
    }
  }
}

function moveToSignupComplete(username) {
  const $signupWrapper = document.querySelector(".sign-wrapper");

  $signupWrapper.replaceChild(
    SignupComplete(username),
    $signupWrapper.childNodes[0]
  );
}
