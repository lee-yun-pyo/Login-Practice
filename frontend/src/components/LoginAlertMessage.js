const $loginAlertMessage = document.createElement("p");
$loginAlertMessage.classList.add("alert-text");

export function handleLoginAlert(message) {
  $loginAlertMessage.style.display = message !== "" ? "block" : "none";
  $loginAlertMessage.innerText = message;
}

export { $loginAlertMessage };