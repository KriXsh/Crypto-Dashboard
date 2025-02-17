// src/Components/Navbar.tsx
import { AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ background: "linear-gradient(to right, #000428, #004e92)" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", color: "#ff4da6" }}>
          Crypto Dashboard 🚀
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
