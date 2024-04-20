import { API_PATH } from "../constants/index.js";

const loginForm = document.getElementById("login-form"),
  emailInput = loginForm.querySelector('input[type="text"]'),
  passwordInput = loginForm.querySelector('input[type="password"]');

async function loginHandler(event) {
  event.preventDefault();
  const response = await fetch(API_PATH.login(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailInput.value,
      password: passwordInput.value,
    }),
  });

  const { token, userId } = await response.json();

  if (!response.ok) {
    console.error("로그인 에러");
  }
  localStorage.setItem("token", token);
}

loginForm.addEventListener("submit", loginHandler);
