import { SignTextBtn } from "../components/SignTextBtn";
import { SignTitle } from "../components/signTitle";

const $signUpDiv = document.createElement("div");
$signUpDiv.classList.add("sign-wrapper");

function signupFormTag() {
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
          type="text"
          required
          placeholder="이름"
        />
        <input
          class="sign-inputText"
          type="password"
          required
          placeholder="비밀번호"
          autocomplete="off"
        />
        <input
          class="sign-inputText"
          type="password"
          required
          placeholder="비밀번호 확인"
          autocomplete="off"
        />
        <input class="sign-submitBtn" type="submit" value="회원가입" />
      `;
  return $form;
}

$signUpDiv.appendChild(SignTitle(false));
$signUpDiv.appendChild(signupFormTag());
$signUpDiv.appendChild(SignTextBtn(false));

export default $signUpDiv;
