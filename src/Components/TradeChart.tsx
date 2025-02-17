
// src/components/TradeChart.tsx
import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { Box, Typography } from "@mui/material";

const TradeChart = ({ data, title }: { data: any[]; title: string }) => {
  return (
    <Box sx={{ width: "100%", height: 300, backgroundColor: "#121212", padding: 2, borderRadius: 2 }}>
      <Typography sx={{ color: "white", textAlign: "center", fontWeight: "bold" }}>{title}</Typography>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip wrapperStyle={{ backgroundColor: "#333", color: "white" }} />
          <Line type="monotone" dataKey="price" stroke="#ff4081" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TradeChart;
