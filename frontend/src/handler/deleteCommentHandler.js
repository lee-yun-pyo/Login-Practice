import { store } from "../store";
import { COMMENT_ACTIONS } from "../store/action";

import { handleLoginAlert } from "../components/LoginAlertMessage";
import { ACCESS_TOKEN, API_PATH, ROUTES } from "../constants";
import { navigate } from "../routes";
import { CommonError } from "../utils/CommonError";
import { logoutHandler } from "./logoutHandler";

export async function deleteCommentHandler(commentId) {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (!accessToken) return;

  try {
    const response = await fetch(API_PATH.deleteComment(commentId), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new CommonError(result.message, response.status);
    }

    store.dispatch(COMMENT_ACTIONS.delete(commentId));
  } catch (error) {
    if (error instanceof CommonError) {
      const { message, statusCode } = error;
      if (statusCode === 404) {
        // TO_DO: 페이지 전체화면 에러 표시
      } else if (statusCode === 401) {
        logoutHandler();
        navigate(ROUTES.LOGIN);
        handleLoginAlert(message);
      }
    } else {
      throw new Error(String(error));
    }
  }
}