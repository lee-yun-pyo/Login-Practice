import { SignTitle } from "../components/Sign/SignTitle";
import { LoginForm } from "../components/Sign/LoginForm";
import { $loginAlertMessage } from "../components/Sign/LoginAlertMessage";
import { SignTextBtn } from "../components/Sign/SignTextBtn";

export function LoginView() {
  const $container = document.createElement("div");
  $container.classList.add("sign-wrapper");

  const $signBox = document.createElement("div");
  $signBox.classList.add("sign-box");

  $signBox.appendChild(SignTitle(true));
  $signBox.appendChild(LoginForm());
  $signBox.appendChild($loginAlertMessage);
  $signBox.appendChild(SignTextBtn(true));

  $container.appendChild($signBox);

  return $container;
}
