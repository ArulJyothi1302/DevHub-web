import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  console.log("Connecting web socket");
  return io(BASE_URL);
};
