export function handleLoginAlert(message) {
  const $loginAlertMessage = document.querySelector("#loginView .alert-text");

  $loginAlertMessage.classList.toggle("hidden", message === "");
  $loginAlertMessage.innerText = message;
}
