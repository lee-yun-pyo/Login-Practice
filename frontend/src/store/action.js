import { STORE_ACTION_TYPES as action_type } from "../constants";

export const ACTIONS = {
  login: (userId, username, expiresAt) => ({
    type: action_type.LOGIN,
    isLogin: true,
    userId,
    username,
    expiresAt,
  }),
  logout: () => ({ type: action_type.LOGOUT }),
  loading: () => ({ type: action_type.LOADING }),
  initializeLoginStatus: (username, userId) => ({
    type: action_type.INIT_LOADED,
    isLogin: true,
    userId,
    username,
  }),
};
