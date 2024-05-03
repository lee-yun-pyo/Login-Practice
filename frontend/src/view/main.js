import { changeUrl } from "../routes/index.js";
import Home from "./chatting.js";

const $main = document.createElement("main");

function render() {
  $main.append(Home);
}

render();

window.addEventListener("popstate", () => changeUrl(window.location.pathname));

export default $main;
