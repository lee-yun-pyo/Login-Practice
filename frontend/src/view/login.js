import { SignTextBtn } from "../components/SignTextBtn";
import { SignTitle } from "../components/signTitle";

const $loginDiv = document.createElement("div");
$loginDiv.classList.add("sign-wrapper");

function loginFormTag() {
  const $form = document.createElement("form");
  $form.classList.add("sign-form");
  $form.innerHTML = ` 
      <input
        class="sign-inputText"
        type="text"
        required
        placeholder="example@email.com"
      />
      <input
        class="sign-inputText"
        type="password"
        required
        placeholder="비밀번호"
        autocomplete="off"
      />
      <input class="sign-submitBtn" type="submit" value="로그인" />
    `;
  return $form;
}

$loginDiv.appendChild(SignTitle(true));
$loginDiv.appendChild(loginFormTag());
$loginDiv.appendChild(SignTextBtn(true));

export default $loginDiv;
