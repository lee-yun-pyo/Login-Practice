import { Server } from "socket.io";

let io;
export function initSocketIO(httpServer) {
  const defaultOptions = {
    cors: {
      origin: "http://127.0.0.1:5500",
    },
  };
  io = new Server(httpServer, defaultOptions);
  return io;
}

export function getSocketIO() {
  if (!io) {
    throw new Error("Socket.io is not initialized.");
  }
  return io;
}
