function showModal() {
  const $modal_overlay = document.querySelector(".modal_overlay");
  $modal_overlay.classList.remove("hidden");
}

export function handleSessionExpiry(milliseconds) {
  setTimeout(showModal, milliseconds);
}
