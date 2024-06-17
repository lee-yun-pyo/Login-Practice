import { ERROR_MESSAGE } from "../constants";
import { CommonError } from "../utils/CommonError";

export async function infiniteFetch(apiPath) {
  try {
    const response = await fetch(apiPath);

    const { message, data } = await response.json();

    if (!response.ok) {
      throw new CommonError(message, response.status);
    }

    return data;
  } catch (error) {
    if (error instanceof CommonError) {
      const { statusCode } = error;
      switch (statusCode) {
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
