import React from "react";
import { FormControl, MenuItem, Select, Typography } from "@mui/material";

interface SelectExchangeProps {
  exchange: string;
  market: "spot" | "futures";
  setExchange: (exchange: string) => void;
  setMarket: (market: "spot" | "futures") => void;
}

const SelectExchange: React.FC<SelectExchangeProps> = ({ exchange, market, setExchange, setMarket }) => {
  return (
    <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginBottom: "20px" }}>
      <FormControl sx={{ minWidth: 150 }}>
        <Typography sx={{ color: "white", fontWeight: "bold" }}>Exchange</Typography>
        <Select
          value={exchange}
          onChange={(e) => setExchange(e.target.value)}
          sx={{
            color: "white",
            backgroundColor: "#3D087B", // Purple background
            "&:hover": { backgroundColor: "#5508A5" },
            borderRadius: "8px",
          }}
        >
          <MenuItem value="binance">Binance</MenuItem>
          <MenuItem value="bybit">Bybit</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 150 }}>
        <Typography sx={{ color: "white", fontWeight: "bold" }}>Market</Typography>
        <Select
          value={market}
          onChange={(e) => setMarket(e.target.value as "spot" | "futures")}
          sx={{
            color: "white",
            backgroundColor: "#3D087B", // Purple background
            "&:hover": { backgroundColor: "#5508A5" },
            borderRadius: "8px",
          }}
        >
          <MenuItem value="spot">Spot</MenuItem>
          <MenuItem value="futures">Futures</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectExchange;
