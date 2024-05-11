import store from "../store/index.js";
import { ACTIONS } from "../store/action.js";

import { API_PATH, ROUTES, ACCESS_TOKEN } from "../constants/index.js";

import { logoutHandler } from "./logoutHandler.js";
import { navigate } from "../routes/index.js";
import { CommonError } from "../utils/CommonError.js";

import { handleAlert } from "../components/Alert.js";
import $loading from "../components/Loading.js";
import $main from "../view/main.js";

export async function loadedHandler() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (!accessToken) {
    return;
  }

  store.dispatch(ACTIONS.loading());
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

    store.dispatch(ACTIONS.initializeLoginStatus(username, userId));
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

function showLoadingUI() {
  $loading.style.display = "flex";
  $main.classList.toggle("hidden");
}

function showContentUI() {
  $loading.style.display = "none";
  $main.classList.toggle("hidden");
}
