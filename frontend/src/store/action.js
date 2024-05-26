import { COMMENT_ACTION_TYPES, USER_ACTION_TYPES } from "../constants";

export const USER_ACTIONS = {
  login: (userId, username, expiresAt) => ({
    type: USER_ACTION_TYPES.LOGIN,
    isLogin: true,
    userId,
    username,
    expiresAt,
  }),
  logout: () => ({ type: USER_ACTION_TYPES.LOGOUT }),
  loading: () => ({ type: USER_ACTION_TYPES.LOADING }),
  initializeLoginStatus: (username, userId) => ({
    type: USER_ACTION_TYPES.INIT_LOADED,
    isLogin: true,
    userId,
    username,
  }),
};

export const COMMENT_ACTIONS = {
  set: (fetchedComments) => ({
    type: COMMENT_ACTION_TYPES.SET_COMMENTS,
    fetchedComments,
  }),
  add: (newComment) => ({
    type: COMMENT_ACTION_TYPES.ADD_COMMENT,
    newComment,
  }),
  delete: (commentId) => ({
    type: COMMENT_ACTION_TYPES.DELETE_COMMENT,
    commentId,
  }),
};
