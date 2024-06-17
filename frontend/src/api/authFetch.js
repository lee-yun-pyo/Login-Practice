import { ACCESS_TOKEN, ERROR_MESSAGE } from "../constants";

import { CommonError } from "../utils/CommonError";
import { handle401Error } from "../utils/handle401Error";

export async function authFetch(apiPath, method, content = null) {
  try {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (!accessToken) {
      throw new CommonError(ERROR_MESSAGE.LOGIN_REQUIRED, 401);
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const options = {
      method,
      headers,
    };

    if (content) {
      options.body = JSON.stringify({ content });
    }

    const response = await fetch(apiPath, options);

    const { message, data } = await response.json();

    if (!response.ok) {
      throw new CommonError(message, response.status);
    }

    return data;
  } catch (error) {
    if (error instanceof CommonError) {
      const { message, statusCode } = error;
      switch (statusCode) {
        case 401:
          handle401Error(message);
          break;
        case 404:
          // TO_DO
          break;
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
