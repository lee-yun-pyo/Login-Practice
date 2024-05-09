import $navigation from "./view/navigation.js";
import $main from "./view/main.js";

import store from "./store/index.js";
import { initializeLoginStatus } from "./store/action.js";

import { API_PATH, ROUTES } from "./constants/index.js";
import { CommonError } from "./utils/CommonError.js";
import { logoutHandler } from "./handler/logoutHandler.js";
import { navigate } from "./routes/index.js";
import { handleAlert } from "./components/Alert.js";

const $app = document.getElementById("app");

$app.appendChild($navigation);
$app.appendChild($main);

async function loadedHandler() {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return;
  }

  try {
    const response = await fetch(API_PATH.validate(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { username, userId, message } = await response.json();

    if (!response.ok) {
      throw new CommonError(message, response.status);
    }

    store.dispatch(initializeLoginStatus(username, userId));
  } catch (error) {
    if (error instanceof CommonError) {
      const { message, statusCode } = error;
      if (statusCode === 401) {
        logoutHandler();
        navigate(ROUTES.LOGIN);
        handleAlert(message);
      }
    } else {
      throw new Error(String(error));
    }
  }
}

document.addEventListener("DOMContentLoaded", loadedHandler);
