import { store } from "../../store";

const toggleChatInput = () => {
  const $chattingForm = document.querySelector(".chatting-form");
  const $chattingLoginBtnBox = document.querySelector(".chatting-loginBtnBox");
  const {
    user: { isLogin },
  } = store.getState();

  $chattingForm.classList.toggle("hidden", !isLogin);
  $chattingLoginBtnBox.classList.toggle("hidden", isLogin);
};

toggleChatInput();

store.subscribe(toggleChatInput);
