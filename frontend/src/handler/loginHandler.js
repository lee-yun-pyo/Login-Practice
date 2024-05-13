import { navigate } from "../routes/index.js";

import { ACTIONS } from "../store/action.js";
import store from "../store/index.js";

import { ACCESS_TOKEN, API_PATH, ROUTES } from "../constants/index.js";
import { CommonError } from "../utils/CommonError.js";

import { handleLoginAlert } from "../components/LoginAlertMessage.js";

export async function loginHandler(account) {
  try {
    const response = await fetch(API_PATH.login(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    });

    const { accessToken, userId, username, message } = await response.json();

    if (!response.ok) {
      throw new CommonError(message, response.status);
    }

    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem("userId", userId);

    store.dispatch(ACTIONS.login(userId, username));
    navigate(ROUTES.HOME);
  } catch (error) {
    if (error instanceof CommonError) {
      const { statusCode, message } = error;

      if (statusCode === 401) {
        handleLoginAlert(message);
      } else {
        throw error;
      }
    }
  }
}
