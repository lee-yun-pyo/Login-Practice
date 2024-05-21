import { legacy_createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { STORE_ACTION_TYPES } from "../constants";

const persistConfig = {
  key: "root",
  storage,
};

const INIT_STATE = {
  isLogin: false,
  username: "",
  userId: "",
  isLoading: false,
};

function rootReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case STORE_ACTION_TYPES.LOGIN:
      return {
        ...state,
        isLogin: action.isLogin,
        userId: action.userId,
        username: action.username,
        isLoading: false,
      };
    case STORE_ACTION_TYPES.INIT_LOADED:
      return {
        ...state,
        isLogin: action.isLogin,
        userId: action.userId,
        username: action.username,
        isLoading: false,
      };
    case STORE_ACTION_TYPES.LOGOUT:
      return INIT_STATE;
    case "LOADING":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = legacy_createStore(persistedReducer);
export const persistor = persistStore(store);
