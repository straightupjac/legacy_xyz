import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: "#2a9954",
    },
    white: {
      main: "#FAEDE2",
    },
    background: {
      default: "#FAEDE2",
    },
  },
  typography: {
    h1: {
      color: "#2a9954",
      fontFamily: `Lora, serif`,
      fontSize: `4rem`,
      fontWeight: "bold",
    },
    h6: {
      color: "#000",
      fontFamily: `Lora, serif`,
      fontSize: `1rem`,
      fontWeight: "bold",
    }
  },
});

theme = responsiveFontSizes(theme);

export default theme;
