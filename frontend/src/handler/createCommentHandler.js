import { ACCESS_TOKEN, API_PATH } from "../constants";
import { CommonError } from "../utils/CommonError";

export async function createCommentHandler(content) {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (!accessToken) return;

  try {
    const response = await fetch(API_PATH.createComment(), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ content }),
    });

    const {
      message,
      comment,
      creator: { userId, username },
    } = await response.json();

    if (!response.ok) {
      throw new CommonError(message, response.status);
    }

    return { userId, username, comment };
  } catch (error) {
    if (error instanceof CommonError) {
      const { message, statusCode } = error;
      if (statusCode === 401) {
        logoutHandler();
        navigate(ROUTES.LOGIN);
        handleLoginAlert(message);
      }
    } else {
      throw new Error(String(error));
    }
  }
}
