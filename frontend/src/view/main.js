import Home from "./chatting.js";

const $main = document.createElement("main");

function render() {
  $main.append(Home);
}

render();

export default $main;
