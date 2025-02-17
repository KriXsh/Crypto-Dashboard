import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import type { AppProps } from "next/app";
import "../styles/globals.css";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#6a0dad" },
    background: { default: "#121212", paper: "#1E1E1E" },
  },
  typography: { allVariants: { color: "white" } },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
