export interface TradeData {
    exchange: string;
    market: "spot" | "futures";
    symbol: string;
    price: string;
    volume: string;
    timestamp: number;
  }
  
  /**
   * Formats trade data to a readable structure.
   * @param trade - The raw trade data object.
   * @returns Formatted trade data with date and formatted price.
   */
  export const formatTradeData = (trade: TradeData) => {
    return {
      ...trade,
      formattedPrice: parseFloat(trade.price).toFixed(2),
      formattedTime: new Date(trade.timestamp).toLocaleTimeString(),
    };
  };
  