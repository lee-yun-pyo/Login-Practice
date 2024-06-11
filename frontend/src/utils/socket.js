import { io } from "socket.io-client";

import { store } from "../store";
import { COMMENT_ACTIONS } from "../store/action";

import { scrollToBottom } from "./index";

import { BASE_URL } from "../constants";
import { SOCKET_EVENT, SOCKET_TYPE } from "../constants/socket";

export const socket = io(BASE_URL);
const $chatBoard = document.querySelector(".chatting-board");

socket.on(SOCKET_EVENT.COMMENT, ({ type, data }) => {
  if (type === SOCKET_TYPE.CREATE) {
    store.dispatch(COMMENT_ACTIONS.add(data));
    scrollToBottom($chatBoard);
  }
});
