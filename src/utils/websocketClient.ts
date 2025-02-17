import io from "socket.io-client"; 
import type { Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

/**
 * Initializes a WebSocket client.
 * @returns A connected WebSocket instance.
 */
export const createWebSocketConnection = () => {
    if (!SOCKET_URL) {
        throw new Error("WebSocket URL is missing! Check your .env.local file.");
    }

    const socket = io(SOCKET_URL, { transports: ["websocket"] });

    socket.on("connect", () => {
        console.log("WebSocket Connected:.......", SOCKET_URL);
    });

    return socket;
};
