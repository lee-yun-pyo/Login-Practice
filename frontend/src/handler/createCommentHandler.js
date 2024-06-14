import { ACCESS_TOKEN, API_PATH, ROUTES } from "../constants";
import { CommonError } from "../utils/CommonError";

import { navigate } from "../routes/index";

import { handleLoginAlert } from "../components/Sign/alertMessage";

import { logoutHandler } from "./logoutHandler";

export async function createCommentHandler(content) {
  try {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (!accessToken) {
      throw new CommonError("로그인 먼저 해주세요.", 401);
    }

    const response = await fetch(API_PATH.createComment(), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ content }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new CommonError(result.message, response.status);
    }

    const {
      comment,
      creator: { userId, username },
    } = result;

    const newComment = { ...comment, creator: { _id: userId, name: username } };

    return newComment;
  } catch (error) {
    if (error instanceof CommonError) {
      const { message, statusCode } = error;
      if (statusCode === 401) {
        logoutHandler();
        navigate(ROUTES.LOGIN);
        handleLoginAlert(message);
      } else if (statusCode === 500) {
        throw new Error("서버에 문제가 발생했어요. \n 다시 시도해 주세요");
      } else {
        throw new Error(String(error));
      }
    } else {
      throw new Error(String(error));
    }
  }
}
