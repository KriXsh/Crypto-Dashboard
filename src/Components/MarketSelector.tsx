import React from "react";

interface MarketSelectorProps {
  exchange: string;
  market: "spot" | "futures";
  setExchange: (exchange: string) => void;
  setMarket: (market: "spot" | "futures") => void;
}

const MarketSelector: React.FC<MarketSelectorProps> = ({ exchange, market, setExchange, setMarket }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-4">
      <div className="flex items-center">
        <label className="mr-2 font-medium text-white">Exchange:</label>
        <select 
          value={exchange} 
          onChange={(e) => setExchange(e.target.value)} 
          className="p-2 border rounded bg-gray-800 text-white"
        >
          <option value="binance">Binance</option>
          <option value="bybit">ByBit</option>
        </select>
      </div>
      
      <div className="flex items-center">
        <label className="mr-2 font-medium text-white">Market:</label>
        <select 
          value={market} 
          onChange={(e) => setMarket(e.target.value as "spot" | "futures")} 
          className="p-2 border rounded bg-gray-800 text-white"
        >
          <option value="spot">Spot</option>
          <option value="futures">Futures</option>
        </select>
      </div>
    </div>
  );
};

export default MarketSelector;
