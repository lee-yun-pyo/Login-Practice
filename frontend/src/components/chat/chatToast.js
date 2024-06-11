const $chatInputBox = document.querySelector(".chatting-inputBox");

const createToastMessage = (message, isError) => {
  const $container = document.createElement("div");
  $container.classList.add("chat-toast__container");
  $container.classList.add(isError ? "error-chat__toast" : "plain-chat__toast");

  $container.innerText = message;

  return $container;
};

const hideAndRemoveToast = (toastMessage) => {
  setTimeout(() => {
    toastMessage.classList.add("hide-chat__toast");
    toastMessage.addEventListener("animationend", (event) => {
      if (event.animationName === "hideToastMessage") {
        $chatInputBox.removeChild(toastMessage);
      }
    });
  }, 2000);
};

export const showChatToast = (message, isError) => {
  const toastMessage = createToastMessage(message, isError);
  $chatInputBox.appendChild(toastMessage);

  hideAndRemoveToast(toastMessage);
};
