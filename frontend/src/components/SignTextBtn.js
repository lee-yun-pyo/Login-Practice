import { navigate } from "../routes";
import { ROUTES } from "../constants";

/**
 * 회원가입 또는 로그인 페이지 텍스트 버튼
 * @param {boolean} isLoginPage 로그인 페이지 인지 여부
 * @returns span 노드
 */
export function SignTextBtn(isLoginPage) {
  const $span = document.createElement("span");
  $span.classList.add("sign-textBtn");

  $span.innerText = isLoginPage
    ? "계정이 없다면 회원가입"
    : "계정이 있다면 로그인";

  $span.addEventListener("click", () => {
    navigate(isLoginPage ? ROUTES.SIGNUP : ROUTES.LOGIN);
  });

  return $span;
}
