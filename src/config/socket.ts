import { io } from "socket.io-client";

const URL = import.meta.env.VITE_BASE_URL;

export const socket = io(URL, {
    transports: ["websocket"],
    autoConnect: false,
});
