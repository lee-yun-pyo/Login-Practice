import store from "../store";
import { ACTIONS } from "../store/action";

import { ACCESS_TOKEN } from "../constants";

export function logoutHandler() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem("userId");
  store.dispatch(ACTIONS.logout());
}
