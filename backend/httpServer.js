import { createServer } from "http";

export function createHttpServer(app) {
  const server = createServer(app);
  server.listen(8080, () => {
    console.log("HTTP Server 연결");
  });
  return server;
}
