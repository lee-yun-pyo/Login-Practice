import { scrollToBottom } from "../utils";

const $chattingBox = document.querySelector(".chatting-box");
const $chatBoard = $chattingBox.querySelector(".chatting-board");
const $scollToBottomElement = $chattingBox.querySelector(
  "#scollToBottomElement"
);
const $scrollButton = $chattingBox.querySelector("#scrollToBottomBtn");
$scrollButton.addEventListener("click", () => scrollToBottom($chatBoard));

const observer = new IntersectionObserver(handleIntersection);
if ($scollToBottomElement) {
  observer.observe($scollToBottomElement);
}

let intersecting = false;
function handleIntersection(entries) {
  intersecting = entries.some((entry) => entry.isIntersecting);
  $scrollButton.classList.toggle("hidden", intersecting);
}
