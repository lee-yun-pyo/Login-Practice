import { combineReducers, legacy_createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { COMMENT_ACTION_TYPES, USER_ACTION_TYPES } from "../constants";

const persistConfig = {
  key: "root",
  storage,
};

const USER_INIT_STATE = {
  isLogin: false,
  username: "",
  userId: "",
  isLoading: false,
  expiresAt: null,
};

const POST_INIT_STATE = {
  comments: [],
};

function userReducer(state = USER_INIT_STATE, action) {
  switch (action.type) {
    case USER_ACTION_TYPES.LOGIN:
      return {
        ...state,
        isLogin: action.isLogin,
        userId: action.userId,
        username: action.username,
        isLoading: false,
        expiresAt: action.expiresAt,
      };
    case USER_ACTION_TYPES.INIT_LOADED:
      return {
        ...state,
        isLogin: action.isLogin,
        userId: action.userId,
        username: action.username,
        isLoading: false,
      };
    case USER_ACTION_TYPES.LOGOUT:
      return USER_INIT_STATE;
    case "LOADING":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

function commentReducer(state = POST_INIT_STATE, action) {
  switch (action.type) {
    case COMMENT_ACTION_TYPES.SET_COMMENTS:
      return {
        ...state,
        comments: [...action.fetchedComments],
      };
    case COMMENT_ACTION_TYPES.ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.newComment],
      };
    case COMMENT_ACTION_TYPES.DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment._id !== action.commentId
        ),
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user: userReducer,
  comment: commentReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = legacy_createStore(persistedReducer);
export const persistor = persistStore(store);
