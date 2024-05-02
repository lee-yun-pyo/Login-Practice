/**
 * 회원가입 또는 로그인 제목
 * @param {boolean} isLoginPage
 * @returns h2 노드
 */
export function SignTitle(isLoginPage) {
  const $title = document.createElement("h2");
  $title.innerText = isLoginPage ? "로그인" : "회원가입";
  return $title;
}
