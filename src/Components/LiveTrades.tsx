import React, { useState, useEffect } from "react";
import { Paper, Typography, Button, Modal, Box } from "@mui/material";
import useWebSocket from "../hooks/useWebSocket";
import { ChartCanvas, Chart } from "@react-financial-charts/core";
import { XAxis, YAxis } from "@react-financial-charts/axes";
import { CandlestickSeries } from "@react-financial-charts/series";
import { discontinuousTimeScaleProvider } from "@react-financial-charts/scales";
import { OHLCTooltip } from "@react-financial-charts/tooltip";
import axios from "axios";

// Define OHLCV Data Type
interface OHLCVData {
  createdAt: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  date?: Date;
}

interface LiveTradesProps {
  exchange: string;
  market: "spot" | "futures";
}

const LiveTrades: React.FC<LiveTradesProps> = ({ exchange, market }) => {
  const { tradeData, isConnected } = useWebSocket(exchange, market);
  const [showGraph, setShowGraph] = useState(false);
  const [ohlcvData, setOhlcvData] = useState<OHLCVData[]>([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);

  // **Fetch Historical OHLCV Data**
  const fetchOHLCVData = async () => {
    if (!fromDate || !toDate) {
      alert("Please select both From Date and To Date.");
      return;
    }

    setLoading(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL;
      const endpoint = `${apiBase}/${exchange.toLowerCase()}/${market}OHLCV?symbol=BTCUSDT&interval=1m&limit=100&page=1&pageSize=10&fromDate=${fromDate}&toDate=${toDate}`;

      const response = await axios.get(endpoint);
      const fetchedData = response.data.data;

      if (!fetchedData || fetchedData.length === 0) {
        alert("No OHLCV data found.");
        setLoading(false);
        return;
      }

      const formattedData = fetchedData.map((entry: OHLCVData) => ({
        ...entry,
        date: new Date(entry.createdAt),
      }));

      console.log("Fetched OHLCV Data:", formattedData);
      setOhlcvData(formattedData);
      setShowGraph(true);
    } catch (error) {
      console.error("Failed to fetch OHLCV data:", error);
      alert("Failed to fetch data. Check API.");
    } finally {
      setLoading(false);
    }
  };

  // **Handle Live Trade Updates from WebSocket (Every 3 Sec)**
  useEffect(() => {
    if (!tradeData || ohlcvData.length === 0) return; // Exit if no data

    console.log("Live Trade Data:", tradeData);

    const tradeTimestamp = new Date(tradeData.createdAt || new Date());
    const tradeMinute = new Date(tradeTimestamp.setSeconds(0, 0));

    const newTradeData: OHLCVData = {
      createdAt: tradeMinute.toISOString(),
      open: Number(tradeData.price),
      high: Number(tradeData.price),
      low: Number(tradeData.price),
      close: Number(tradeData.price),
      volume: Number(tradeData.volume),
      date: tradeMinute,
    };

    setOhlcvData((prevData) => {
      let updatedData = [...prevData];

      if (updatedData.length > 0) {
        const lastCandle = updatedData[updatedData.length - 1];

        if (lastCandle.createdAt === newTradeData.createdAt) {
          // Update the existing candle
          lastCandle.high = Math.max(lastCandle.high, newTradeData.high);
          lastCandle.low = Math.min(lastCandle.low, newTradeData.low);
          lastCandle.close = newTradeData.close;
          lastCandle.volume += newTradeData.volume;
        } else {
          // Add new candle & remove oldest (Queue FIFO)
          updatedData.push(newTradeData);
          if (updatedData.length > 100) {
            updatedData.shift();
          }
        }
      } else {
        updatedData = [newTradeData]; // Initialize if empty
      }

      console.log("Updated Candlestick Data:", updatedData);
      return updatedData;
    });
  }, [tradeData]);

  // **Ensure Graph Updates Every 3 Seconds**
  useEffect(() => {
    const interval = setInterval(() => {
      setOhlcvData((prevData) => [...prevData]); // Force re-render
    }, 3000); // Every 3 sec

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // **Fix X Scale Provider for Zooming**
  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor((d) => d.date);
  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(ohlcvData);

  console.log("Updated Chart Data:", data);

  return (
    <Paper elevation={3} sx={{ padding: "12px", background: "#1E1E1E", color: "white", borderRadius: "12px", textAlign: "center" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
        Live {market} Trades - <span style={{ color: isConnected ? "green" : "red" }}>{isConnected ? "Connected" : "Disconnected"}</span>
      </Typography>

      <Box sx={{ marginTop: "12px" }}>
        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        <Button variant="contained" onClick={fetchOHLCVData} disabled={loading}>
          {loading ? "Loading..." : "Visualize Data"}
        </Button>
      </Box>

      <Modal open={showGraph} onClose={() => setShowGraph(false)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 900, bgcolor: "#121212", borderRadius: 2, boxShadow: 24, p: 4 }}>
          <Typography variant="h6" sx={{ textAlign: "center", marginBottom: "10px", color: "white" }}>Candlestick Chart (Live)</Typography>
          <ChartCanvas height={400} width={800} ratio={1} data={data} xScale={xScale} xAccessor={xAccessor} displayXAccessor={displayXAccessor} seriesName="CryptoChart">
            <Chart id={1} yExtents={(d) => [d.high, d.low]}>
              <XAxis stroke="#0f0" />
              <YAxis stroke="#0f0" />
              <CandlestickSeries />
              <OHLCTooltip origin={[10, 10]} textFill="white" />
            </Chart>
          </ChartCanvas>
        </Box>
      </Modal>
    </Paper>
  );
};

export default LiveTrades;
