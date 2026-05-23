import { io } from "socket.io-client";

// backend URL (change when deploying)
const SOCKET_URL = "http://localhost:5000";

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: true,
});