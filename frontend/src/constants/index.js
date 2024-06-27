export const BASE_URL = "http://localhost:8080";

export const API_PATH = {
  auth: () => `${BASE_URL}/auth`,
  comments: () => `${BASE_URL}/comments`,
  signup: () => `${API_PATH.auth()}/signup`,
  login: () => `${API_PATH.auth()}/login`,
  validate: () => `${API_PATH.auth()}/access-token/validate`,
  createComment: () => `${API_PATH.comments()}`,
  getComments: (page) => `${API_PATH.comments()}?page=${page}`,
  deleteComment: (id) => `${API_PATH.comments()}/${id}`,
};

export const ROUTES = {
  HOME: "/frontend/",
  SIGNUP: "/signup",
  LOGIN: "/login",
};

export const PASSWORD_MIN_LENGTH = 5;

export const ALERT_MESSAGE = {
  AUTH: {
    IS_EMPTY_EMAIL: "이메일을 입력해 주세요.",
    IS_EMPTY_NAME: "이름을 입력해 주세요.",
    IS_EMPTY_PW: "비밀번호를 입력해 주세요.",
    IS_EMPTY_PW_CONFIRM: "비밀번호 확인을 입력해 주세요.",
    IS_NOT_EMAIL_FORM: "이메일 형태로 입력해주세요.",
    IS_INVALID_PW_LENGTH: `비밀번호 최소 ${PASSWORD_MIN_LENGTH}자 이상 입력해주세요.`,
    IS_INCORRECT_PW: "비밀번호가 일치하지 않습니다.",
  },
};

export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const USER_ACTION_TYPES = {
  LOGIN: "LOGIN",
  INIT_LOADED: "INIT_LOADED",
  LOGOUT: "LOGOUT",
  LOADING: "LOADING",
};

export const COMMENT_ACTION_TYPES = {
  SET_COMMENTS: "SET_COMMENTS",
  ADD_COMMENT: "ADD_COMMENT",
  DELETE_COMMENT: "DELETE_COMMENT",
};

export const ACCESS_TOKEN = "accessToken";
export const REMAINING_EXPIRE_TIME = 60 * 60 * 1000; // 1hour

export const DELETED_MESSAGE = "삭제된 메시지입니다.";

export const ERROR_MESSAGE = {
  SERVER_ERROR: "서버에 문제가 발생했어요. \n 다시 시도해 주세요",
  LOGIN_REQUIRED: "로그인 먼저 해주세요.",
};

export const ABORT_TIMEOUT_TIME = 10_000;
