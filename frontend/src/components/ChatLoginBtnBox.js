import { navigate } from "../routes";
import { ROUTES } from "../constants";

export function ChatLoginBtnBox() {
  const $loginBtnBox = document.createElement("div");

  $loginBtnBox.classList.add("chatting-loginBtnBox");
  $loginBtnBox.innerHTML = `
      <span>채팅하기 위해 <strong>로그인</strong> 해주세요.<span>
    `;

  $loginBtnBox.addEventListener("click", ({ target }) => {
    if (!target.matches("strong")) return;
    navigate(ROUTES.LOGIN);
  });

  return $loginBtnBox;
}
