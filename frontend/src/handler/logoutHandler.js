import { persistor, store } from "../store";
import { USER_ACTIONS } from "../store/action";

export async function logoutHandler() {
  localStorage.clear();
  store.dispatch(USER_ACTIONS.logout());
  persistor.purge();
}
