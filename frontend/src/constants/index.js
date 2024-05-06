export const BASE_URL = "http://localhost:8080";

export const API_PATH = {
  auth: () => `${BASE_URL}/auth`,
  signup: () => `${API_PATH.auth()}/signup`,
  login: () => `${API_PATH.auth()}/login`,
};

export const ROUTES = {
  HOME: "/frontend/",
  SIGNUP: "/signup",
  LOGIN: "/login",
};

export const AUTH_IS_EMPTY_EMAIL_MESSAGE = "이메일을 입력해 주세요.";
export const AUTH_IS_EMPTY_PW_MESSAGE = "비밀번호를 입력해 주세요.";
export const AUTH_IS_NOT_EMAIL_FORM = "이메일 형태로 입력해주세요.";

export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const STORE_ACTION_TYPES = {
  LOGIN: "LOGIN",
  LOADED: "LOADED",
};
