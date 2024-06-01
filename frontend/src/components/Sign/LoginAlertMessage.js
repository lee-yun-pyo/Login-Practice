export function handleLoginAlert(message) {
  const $loginContainer = document.querySelector("#loginView"),
    $loginAlertMessage = $loginContainer.querySelector(".alert-text");

  $loginAlertMessage.style.display = message !== "" ? "block" : "none";
  $loginAlertMessage.innerText = message;
}
