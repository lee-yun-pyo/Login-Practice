export function handleSignupAlert(message) {
  const $signupAlertMessage = document.querySelector("#signupView .alert-text");

  $signupAlertMessage.classList.toggle("hidden", message === "");
  $signupAlertMessage.innerText = message;
}
