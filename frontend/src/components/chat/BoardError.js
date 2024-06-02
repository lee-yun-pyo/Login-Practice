export function BoardError(message) {
  const $container = document.createElement("div");
  $container.classList.add("error-board__container");

  $container.innerHTML = `
        <i class="fa-solid fa-triangle-exclamation fa-3x error-board__icon"></i>
        <p class="error-board__text">정보를 불러올 수 없어요</p>
        <p>${message}</p>
        <button class="error-board__refresh-button">다시 불러오기</button>
    `;

  const $refreshButton = $container.querySelector(
    ".error-board__refresh-button"
  );
  $refreshButton.addEventListener("click", () => location.reload());

  return $container;
}
