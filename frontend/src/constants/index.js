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
