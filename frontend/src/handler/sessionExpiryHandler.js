import { store } from "../store";

const showModal = () => {
  const $modal_overlay = document.querySelector(".modal_overlay");
  $modal_overlay.classList.remove("hidden");
};

export const handleSessionExpiry = (milliseconds) => {
  setTimeout(showModal, milliseconds);
};

export const initSessionExpiryCheck = () => {
  const {
    user: { expiresAt },
  } = store.getState();
  if (!expiresAt) return;

  const remainingMilliseconds =
    new Date(expiresAt).getTime() - new Date().getTime();

  handleSessionExpiry(remainingMilliseconds);
};
