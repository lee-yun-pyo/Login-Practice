import { STORE_ACTION_TYPES as action_type } from "../constants";

export const ACTIONS = {
  login: (userId, username) => ({
    type: action_type.LOGIN,
    isLogin: true,
    userId,
    username,
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
