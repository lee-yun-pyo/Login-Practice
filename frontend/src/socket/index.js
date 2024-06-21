import { io } from "socket.io-client";

import { store } from "../store";
import { COMMENT_ACTIONS } from "../store/action";

import { BASE_URL } from "../constants";
import { SOCKET_EVENT, SOCKET_TYPE } from "../constants/socket";
import { scrollToBottom } from "../utils/index";

export const socket = io(BASE_URL);
const $chatBoard = document.querySelector(".chatting-board");

export function socketEventListner({ type, data }) {
  switch (type) {
    case SOCKET_TYPE.CREATE:
      store.dispatch(COMMENT_ACTIONS.add(data));
      scrollToBottom($chatBoard);
      break;
    case SOCKET_TYPE.DELETE:
      store.dispatch(COMMENT_ACTIONS.delete(data));
      break;
  }
}

export function socketEmit(event, type, data) {
  socket.emit(event, { type, data });
}

socket.on(SOCKET_EVENT.COMMENT, socketEventListner);
