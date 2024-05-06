import { handleAlert } from "../components/Alert.js";
import { API_PATH } from "../constants/index.js";
import { login } from "../store/action.js";
import store from "../store/index.js";

export async function loginHandler(account) {
  const response = await fetch(API_PATH.login(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(account),
  });

  if (!response.ok) {
    const { message } = await response.json();
    handleAlert(message);
    return;
  }

  const { token, userId, username } = await response.json();

  localStorage.setItem("token", token);
  localStorage.setItem("userId", userId);

  store.dispatch(login(userId, username));
}
