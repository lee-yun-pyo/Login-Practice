import { ROUTES } from "../constants";
import { navigate } from "../routes";

export function SignupComplete(username) {
  const $contianer = document.createElement("div");
  $contianer.classList.add("signup-complete");

  $contianer.innerHTML = `
    <h5 class="signup-complete__title">회원가입 완료</h5>
    <div class="signup-complete__box">
        <p class="signup-complete__content">${username}님의 회원가입이</p>
        <p class="signup-complete__content">완료되었습니다.</p>
    </div>
    <button id="moveToLoginBtn" class="signup-complete__button">로그인 하기</button>
  `;

  const $moveToLoginBtn = $contianer.querySelector("#moveToLoginBtn");
  $moveToLoginBtn.addEventListener("click", () => navigate(ROUTES.LOGIN));

  return $contianer;
}
