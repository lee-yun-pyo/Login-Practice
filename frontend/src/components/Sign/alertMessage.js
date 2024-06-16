export function handleLoginAlert(message) {
  const $loginAlertMessage = document.querySelector("#loginView .alert-text");

  $loginAlertMessage.classList.toggle("hidden", message === "");
  $loginAlertMessage.innerText = message;
}

export function handleSignupAlert(message) {
  const $signupAlertMessage = document.querySelector("#signupView .alert-text");

  $signupAlertMessage.classList.toggle("hidden", message === "");
  $signupAlertMessage.innerText = message;
}
