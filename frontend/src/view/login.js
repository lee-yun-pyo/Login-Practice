import { $alertText, handleAlert } from "../components/Alert";
import { SignTextBtn } from "../components/SignTextBtn";
import { SignTitle } from "../components/signTitle";
import {
  AUTH_IS_EMPTY_EMAIL_MESSAGE,
  AUTH_IS_EMPTY_PW_MESSAGE,
  AUTH_IS_NOT_EMAIL_FORM,
  emailRegex,
} from "../constants";
import { loginHandler } from "../handler/loginHandler";
import { isEmptyEmail, isEmptyPassword, isValidEmail } from "../utils/auth";

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
      <input class="sign-submitBtn" type="submit" value="로그인" />
  `;

  const emailInput = $form.querySelector('input[type="text"]'),
    passwordInput = $form.querySelector('input[type="password"]');

  handleAlert();
  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const account = { email: emailInput.value, password: passwordInput.value };
    const { email, password } = account;

    if (isEmptyEmail(email)) {
      handleAlert(AUTH_IS_EMPTY_EMAIL_MESSAGE);
      return;
    }

    if (isEmptyPassword(password)) {
      handleAlert(AUTH_IS_EMPTY_PW_MESSAGE);
      return;
    }

    if (!isValidEmail(email, emailRegex)) {
      handleAlert(AUTH_IS_NOT_EMAIL_FORM);
      return;
    }

    handleAlert();
    loginHandler(account);
  });

  return $form;
}

$loginDiv.appendChild(SignTitle(true));
$loginDiv.appendChild(loginFormTag());
$loginDiv.appendChild($alertText);
$loginDiv.appendChild(SignTextBtn(true));

export default $loginDiv;
