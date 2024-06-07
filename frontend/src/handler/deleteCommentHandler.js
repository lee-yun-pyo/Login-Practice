import { navigate } from "../routes";
import { ACCESS_TOKEN, API_PATH, ROUTES } from "../constants";
import { CommonError } from "../utils/CommonError";

import { handleLoginAlert } from "../components/Sign/alertMessage";

import { logoutHandler } from "./logoutHandler";

export async function deleteCommentHandler(commentId) {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (!accessToken) {
    throw new CommonError("로그인 먼저 해주세요.", 401);
  }

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
  } catch (error) {
    if (error instanceof CommonError) {
      const { message, statusCode } = error;
      if (statusCode === 404) {
        // TO_DO: 페이지 전체화면 에러 표시
      } else if (statusCode === 401) {
        logoutHandler();
        navigate(ROUTES.LOGIN);
        handleLoginAlert(message);
      } else if (statusCode === 500) {
        throw new Error("서버에 문제가 발생했어요. \n 다시 시도해 주세요");
      }
    } else {
      throw new Error(String(error));
    }
  }
}
