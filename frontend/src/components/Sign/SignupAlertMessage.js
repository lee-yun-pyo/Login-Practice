const $signupAlertMessage = document.createElement("p");
$signupAlertMessage.classList.add("alert-text");

function handleSignupAlert(message) {
  $signupAlertMessage.style.display = message !== "" ? "block" : "none";
  $signupAlertMessage.innerText = message;
}

export { $signupAlertMessage, handleSignupAlert };
