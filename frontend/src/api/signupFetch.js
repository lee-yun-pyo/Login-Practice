import { API_PATH, ERROR_MESSAGE } from "../constants";
import { CommonError } from "../utils/CommonError";

export async function signupFetch(account) {
  try {
    const response = await fetch(API_PATH.signup(), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    });

    const { message, data } = await response.json();

    if (!response.ok) {
      throw new CommonError(message, response.status);
    }

    return data;
  } catch (error) {
    if (error instanceof CommonError) {
      const { message, statusCode } = error;
      switch (statusCode) {
        case 409:
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
