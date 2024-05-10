import $navigation from "./view/navigation.js";
import $main from "./view/main.js";

import store from "./store/index.js";
import { initializeLoginStatus } from "./store/action.js";

import { API_PATH, ROUTES, STORE_ACTION_TYPES } from "./constants/index.js";
import { CommonError } from "./utils/CommonError.js";
import { logoutHandler } from "./handler/logoutHandler.js";
import { navigate } from "./routes/index.js";
import { handleAlert } from "./components/Alert.js";
import { Loading } from "./components/Loading.js";

const $app = document.getElementById("app");
const $loading = Loading();

$app.appendChild($navigation);
$app.appendChild($main);
$app.appendChild($loading);

function showLoadingUI() {
  $loading.style.display = "flex";
  $main.classList.toggle("hidden");
}

function showContentUI() {
  $loading.style.display = "none";
  $main.classList.toggle("hidden");
}

async function loadedHandler() {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return;
  }

  store.dispatch({ type: STORE_ACTION_TYPES.LOADING });
  showLoadingUI();
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
    showContentUI();
  } catch (error) {
    if (error instanceof CommonError) {
      const { message, statusCode } = error;
      if (statusCode === 401) {
        logoutHandler();
        navigate(ROUTES.LOGIN);
        handleAlert(message);
        showContentUI();
      }
    } else {
      throw new Error(String(error));
    }
  }
}

document.addEventListener("DOMContentLoaded", loadedHandler);
