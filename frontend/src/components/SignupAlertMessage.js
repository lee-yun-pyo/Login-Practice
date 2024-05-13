const $signupAlertMessage = document.createElement("p");
$signupAlertMessage.classList.add("alert-text");

export function handleSignupAlert(message) {
  $signupAlertMessage.style.display = message !== "" ? "block" : "none";
  $signupAlertMessage.innerText = message;
}

export { $signupAlertMessage };
