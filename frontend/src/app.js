import $navigation from "./view/navigation.js";
import $main from "./view/main.js";

import $loading from "./components/Loading.js";

const $app = document.getElementById("app");

$app.appendChild($navigation);
$app.appendChild($main);
$app.appendChild($loading);
