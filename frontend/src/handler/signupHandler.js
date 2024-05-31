import { API_PATH } from "../constants";
import { CommonError } from "../utils/CommonError";

export async function signUpHandler(account) {
  try {
    const response = await fetch(API_PATH.signup(), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    });

    const { message, username } = await response.json();

    if (!response.ok) {
      throw new CommonError(message, response.status);
    }

    return username;
  } catch (error) {
    throw error;
  }
}
