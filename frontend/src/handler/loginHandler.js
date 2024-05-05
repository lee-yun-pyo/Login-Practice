import { handleAlert } from "../components/Alert.js";
import { API_PATH } from "../constants/index.js";
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

  const { token, userId } = await response.json();

  localStorage.setItem("token", token);
  store.dispatch({ type: "LOGIN", isLogin: true, userId });
}
