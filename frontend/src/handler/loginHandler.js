import { navigate } from "../routes/index.js";
import { handleAlert } from "../components/Alert.js";

import { login } from "../store/action.js";
import store from "../store/index.js";

import { API_PATH, ROUTES } from "../constants/index.js";

export async function loginHandler(account) {
  const response = await fetch(API_PATH.login(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(account),
  });

  const { accessToken, userId, username, message } = await response.json();

  if (!response.ok) {
    handleAlert(message);
    return;
  }

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("userId", userId);

  store.dispatch(login(userId, username));
  navigate(ROUTES.HOME);
}
