import { API_PATH } from "../constants";
import { CommonError } from "../utils/CommonError";

export async function getCommentsHandler(offset) {
  try {
    const response = await fetch(API_PATH.getComments(offset));

    const { message, comments, nextOffset } = await response.json();

    if (!response.ok) {
      throw new CommonError(message, response.status);
    }

    return { comments, nextOffset };
  } catch (error) {
    throw new Error(error.message);
  }
}
