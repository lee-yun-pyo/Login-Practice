import { COMMENT_ACTION_TYPES, USER_ACTION_TYPES } from "../constants";

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

export function userReducer(state = USER_INIT_STATE, action) {
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

export function commentReducer(state = POST_INIT_STATE, action) {
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
        comments: state.comments.map((comment) => {
          if (comment._id === action.commentId) {
            return { ...comment, content: null };
          }
          return comment;
        }),
      };
    default:
      return state;
  }
}
