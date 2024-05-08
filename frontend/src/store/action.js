import { STORE_ACTION_TYPES } from "../constants";

export function login(userId, username) {
  return { type: STORE_ACTION_TYPES.LOGIN, isLogin: true, userId, username };
}

export function initializeLoginStatus(username, userId) {
  return { type: STORE_ACTION_TYPES.LOADED, isLogin: true, userId, username };
}

export function logout() {
  return { type: STORE_ACTION_TYPES.LOGOUT };
}
