import { API_PATH } from "../constants";
import { CommonError } from "../utils/CommonError";

export async function getCommentsHandler(pageNum) {
  try {
    const response = await fetch(API_PATH.getComments(pageNum));

    const { message, comments } = await response.json();

    if (!response.ok) {
      throw new CommonError(message, response.status);
    }

    return comments;
  } catch (error) {
    throw new Error(error.message);
  }
}
