import { useEffect, useState } from "react";
import io from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL as string;

interface TradeData {
  exchange: string;
  market: "spot" | "futures";
  symbol: string;
  price: string;
  volume: string;
}

const useWebSocket = (exchange: string, market: "spot" | "futures") => {
  const [tradeData, setTradeData] = useState<TradeData | null>(null); // Store only the latest trade
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!SOCKET_URL) {
      console.error("WebSocket URL is missing! Check your .env file.");
      return;
    }

    const socket = io(SOCKET_URL, { transports: ["websocket"] });

    socket.on("connect", () => {
      console.log("WebSocket Connected to:", SOCKET_URL);
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("WebSocket Disconnected");
      setIsConnected(false);
    });

    socket.on("spot_trade_update", (trade: TradeData) => {
      if (trade.exchange === exchange && trade.market === market) {
        console.log("Incoming Trade Data:", trade); // ✅ Check if trade is coming
        setTradeData(trade); // Store only the latest trade
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [exchange, market]);

  return { tradeData, isConnected };
};

export default useWebSocket;


