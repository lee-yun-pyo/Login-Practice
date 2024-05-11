export const BASE_URL = "http://localhost:8080";

export const API_PATH = {
  auth: () => `${BASE_URL}/auth`,
  signup: () => `${API_PATH.auth()}/signup`,
  login: () => `${API_PATH.auth()}/login`,
  validate: () => `${API_PATH.auth()}/access-token/validate`,
};

export const ROUTES = {
  HOME: "/frontend/",
  SIGNUP: "/signup",
  LOGIN: "/login",
};

export const ALERT_MESSAGE = {
  AUTH: {
    IS_EMPTY_EMAIL: "이메일을 입력해 주세요.",
    IS_EMPTY_NAME: "이름을 입력해 주세요.",
    IS_EMPTY_PW: "비밀번호를 입력해 주세요.",
    IS_EMPTY_PW_CONFIRM: "비밀번호 확인을 입력해 주세요.",
    IS_NOT_EMAIL_FORM: "이메일 형태로 입력해주세요.",
  },
};

export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const STORE_ACTION_TYPES = {
  LOGIN: "LOGIN",
  INIT_LOADED: "INIT_LOADED",
  LOGOUT: "LOGOUT",
  LOADING: "LOADING",
};

export const ACCESS_TOKEN = "accessToken";
