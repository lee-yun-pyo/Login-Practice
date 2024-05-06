import { legacy_createStore } from "redux";

import { STORE_ACTION_TYPES } from "../constants";

const INIT_STATE = {
  isLogin: false,
  username: "",
  userId: "",
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case STORE_ACTION_TYPES.LOGIN:
      return {
        ...state,
        isLogin: action.isLogin,
        userId: action.userId,
        username: action.username,
      };
    case STORE_ACTION_TYPES.LOADED:
      return {
        ...state,
        isLogin: action.isLogin,
        userId: action.userId,
      };
    default:
      return state;
  }
}

const store = legacy_createStore(reducer);

export default store;
