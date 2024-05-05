const $alertText = document.createElement("p");
$alertText.classList.add("alert-text");

export function handleAlert(message = "") {
  $alertText.style.display = message !== "" ? "block" : "none";
  $alertText.innerText = message;
}

export { $alertText };
