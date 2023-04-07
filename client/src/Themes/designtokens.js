export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: { main: "#fff", light: "#f5f5f5", contrastText: "#222831" },
    secondary: { main: "#f2f5fa", contrastText: "#222831" },
    yellowCombination: {
      y1: "#f3912e",
      y2: "#f6ad62",
      y3: "#f9c897",
      y4: "#fce4cb",
      y5: "#fff",
    },
    text: {
      primary: "#222831",
    },
    typography: {
      fontFamily: "'Open Sans', sans-serif",
    },
  },
});
