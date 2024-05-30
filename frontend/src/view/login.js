import { SignTitle } from "../components/Sign/SignTitle";
import { LoginForm } from "../components/Sign/LoginForm";
import { $loginAlertMessage } from "../components/Sign/LoginAlertMessage";
import { SignTextBtn } from "../components/Sign/SignTextBtn";

export function LoginView() {
  const $container = document.createElement("div");
  $container.classList.add("sign-wrapper");

  $container.appendChild(SignTitle(true));
  $container.appendChild(LoginForm());
  $container.appendChild($loginAlertMessage);
  $container.appendChild(SignTextBtn(true));

  return $container;
}
