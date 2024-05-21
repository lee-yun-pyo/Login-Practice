import { persistor, store } from "../store";
import { ACTIONS } from "../store/action";

export async function logoutHandler() {
  localStorage.clear();
  store.dispatch(ACTIONS.logout());
  persistor.purge();
}
