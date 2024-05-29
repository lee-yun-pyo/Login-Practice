export function ChatToastMessage(message, isError) {
  const $container = document.createElement("div");
  $container.classList.add("chat-toast__container");
  $container.classList.add(isError ? "error-chat__toast" : "plain-chat__toast");

  $container.innerText = message;

  return $container;
}
