export interface TradeData {
    exchange: string;
    market: "spot" | "futures";
    symbol: string;
    price: string;
    volume: string;
    timestamp: number;
  }
  
  export interface OHLCVData {
    time: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
  }
  