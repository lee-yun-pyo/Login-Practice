import { SOCKET_EVENT } from "../constants/index.js";

export function handleSocketEvents(io) {
  io.on("connection", (socket) => {
    console.log("소켓 연결됨", socket.id);

    socket.on("disconnect", () => {
      console.log("소켓 연결 끊김", socket.id);
    });

    socket.on(SOCKET_EVENT.COMMENT, ({ type, data }) => {
      io.emit(SOCKET_EVENT.COMMENT, { type, data });
    });
  });
}
