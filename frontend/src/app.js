import $navigation from "./view/navigation.js";
import $main from "./view/main.js";

import store from "./store/index.js";
import { initializeLoginStatus } from "./store/action.js";

import { API_PATH } from "./constants/index.js";

const $app = document.getElementById("app");

$app.appendChild($navigation);
$app.appendChild($main);

async function loadedHandler() {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return;
  }

  try {
    const response = await fetch(API_PATH.validate(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { username, userId, message, statusCode } = await response.json();

    if (!response.ok) {
      throw new Error(message);
    }

    store.dispatch(initializeLoginStatus(username, userId));
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", loadedHandler);
