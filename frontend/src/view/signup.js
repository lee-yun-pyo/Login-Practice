import { SignTitle } from "../components/Sign/SignTitle";
import { SignUpForm } from "../components/Sign/SignUpForm";
import { $signupAlertMessage } from "../components/Sign/SignupAlertMessage";
import { SignTextBtn } from "../components/Sign/SignTextBtn";

export function SignupView() {
  const $container = document.createElement("div");
  $container.classList.add("sign-wrapper");

  const $signBox = document.createElement("div");
  $signBox.classList.add("sign-box");

  $signBox.appendChild(SignTitle(false));
  $signBox.appendChild(SignUpForm());
  $signBox.appendChild($signupAlertMessage);
  $signBox.appendChild(SignTextBtn(false));

  $container.appendChild($signBox);

  return $container;
}
