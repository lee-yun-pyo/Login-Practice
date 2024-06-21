import { store } from "../store/index.js";
import { USER_ACTIONS } from "../store/action.js";

import { updateRoute } from "../routes";

import {
  ACCESS_TOKEN,
  API_PATH,
  ERROR_MESSAGE,
  REMAINING_EXPIRE_TIME,
  ROUTES,
} from "../constants";
import { CommonError } from "../utils/CommonError.js";

import { handleSessionExpiry } from "../handler/sessionExpiryHandler.js";

export async function signinFetch(account) {
  try {
    const response = await fetch(API_PATH.login(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    });

    const { message, data } = await response.json();

    if (!response.ok) {
      throw new CommonError(message, response.status);
    }

    const { accessToken, userId, username } = data;

    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem("userId", userId);

    const expiryDate = new Date(new Date().getTime() + REMAINING_EXPIRE_TIME); // 세션 만료 시간
    store.dispatch(USER_ACTIONS.login(userId, username, expiryDate));
    handleSessionExpiry(REMAINING_EXPIRE_TIME);

    updateRoute(ROUTES.HOME);
  } catch (error) {
    if (error instanceof CommonError) {
      const { message, statusCode } = error;
      switch (statusCode) {
        case 401:
          throw new Error(message);
        case 500:
          throw new Error(ERROR_MESSAGE.SERVER_ERROR);
        default:
          throw new Error(String(error));
      }
    } else {
      throw new Error(String(error));
    }
  }
}
