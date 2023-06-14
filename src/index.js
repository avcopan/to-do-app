import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const themeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#351735",
    },
    secondary: {
      main: "#6000fb",
    },
    text: {
      primary: "#351735",
      secondary: "#562456",
    },
    background: {
      default: "#d8bfd8",
      paper: "#c69fc6",
    },
  },
};

const theme = createTheme(themeOptions);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
