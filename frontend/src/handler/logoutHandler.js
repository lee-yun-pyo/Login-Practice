import store from "../store";
import { logout } from "../store/action";

export function logoutHandler() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userId");
  store.dispatch(logout());
}
