import { navigate } from "../routes";

import { ROUTES } from "../constants";

import { handleLoginAlert } from "../components/Sign/alertMessage";

import { logoutHandler } from "../handler/logoutHandler";

export function handle401Error(message) {
  logoutHandler();
  navigate(ROUTES.LOGIN);
  handleLoginAlert(message);
}
