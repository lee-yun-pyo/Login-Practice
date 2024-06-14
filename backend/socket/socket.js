import { Server } from "socket.io";

let io;

export function initSocketIO(httpServer) {
  const defaultOptions = {
    cors: {
      origin: "http://127.0.0.1:5500",
    },
    connectionStateRecovery: {},
  };
  io = new Server(httpServer, defaultOptions);
  return io;
}

export function getSocketIO() {
  if (!io) {
    throw new Error("Socket.io가 초기화되지 않았습니다.");
  }
  return io;
}
