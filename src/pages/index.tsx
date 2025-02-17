import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import SelectExchange from "../Components/SelectExchange";
import LiveTrades from "../Components/LiveTrades";
import { Container, Grid } from "@mui/material";

const Home = () => {
  const [exchange, setExchange] = useState("binance");
  const [market, setMarket] = useState<"spot" | "futures">("spot");

  return (
    <div style={{ background: "#0F0F0F", minHeight: "100vh", paddingBottom: "30px" }}>
      <Navbar />
      <Container sx={{ marginTop: "30px", maxWidth: "1200px" }}>
        <SelectExchange exchange={exchange} market={market} setExchange={setExchange} setMarket={setMarket} />

        <Grid container spacing={3} sx={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Grid item xs={12} md={6} sx={{ width: "100%", marginTop: "20px" }}>
            <LiveTrades market={market} exchange={exchange} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
