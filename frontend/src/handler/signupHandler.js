import { API_PATH } from "../constants";
import { CommonError } from "../utils/CommonError";

import { handleSignupAlert } from "../components/Sign/SignupAlertMessage";

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
    if (error instanceof CommonError) {
      const { statusCode, message } = error;

      // 이메일 중복 에러 메시지 출력
      if (statusCode === 409) {
        handleSignupAlert(message);
      }
    } else {
      throw error;
    }
  }
}
