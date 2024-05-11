import { navigate } from "../routes/index.js";
import { handleAlert } from "../components/Alert.js";

import { ACTIONS } from "../store/action.js";
import store from "../store/index.js";

import { ACCESS_TOKEN, API_PATH, ROUTES } from "../constants/index.js";

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

  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem("userId", userId);

  store.dispatch(ACTIONS.login(userId, username));
  navigate(ROUTES.HOME);
}
