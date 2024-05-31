import { logoutHandler } from "../../handler/logoutHandler";

const $modalExtendBtn = document.querySelector(".modal_extend-btn");
const $modalLogoutBtn = document.querySelector(".modal_logout-btn");

function removeModal() {
  const $modalOverlay = document.querySelector(".modal_overlay");
  $modalOverlay.classList.add("hidden");
}

function handleClickLogoutBtn() {
  logoutHandler();
  removeModal();
}

function handleClickExtendBtn() {
  // 📌 TO_DO: refresh 토큰 사용하여 세션 연장하기
  removeModal();
}

$modalLogoutBtn.addEventListener("click", handleClickLogoutBtn);
$modalExtendBtn.addEventListener("click", handleClickExtendBtn);
