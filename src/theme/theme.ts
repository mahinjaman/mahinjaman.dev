import { createTheme } from "@mui/material/styles";

/**
 * Dark "HUD" theme tuned to match the existing Tailwind portfolio:
 * black backgrounds, orange (#f97316) accent, monospace headings.
 *
 * Applied via <ThemeProvider> only to the MUI-powered surfaces
 * (blog pages, admin dashboard, experience timeline). We intentionally
 * skip a global <CssBaseline> so the Tailwind landing page is untouched.
 */
const ORANGE = "#f97316";
const ORANGE_LIGHT = "#fb923c";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: ORANGE, light: ORANGE_LIGHT, contrastText: "#000000" },
    secondary: { main: "#e2e8f0" },
    background: { default: "#050505", paper: "#0a0a0a" },
    text: { primary: "#f1f5f9", secondary: "#94a3b8" },
    divider: "rgba(255,255,255,0.08)",
    error: { main: "#ef4444" },
    success: { main: "#22c55e" },
  },
  typography: {
    fontFamily:
      'ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, Consolas, monospace',
    h1: { fontWeight: 900, letterSpacing: "-0.03em" },
    h2: { fontWeight: 900, letterSpacing: "-0.03em" },
    h3: { fontWeight: 800, letterSpacing: "-0.02em" },
    h4: { fontWeight: 800, letterSpacing: "-0.02em" },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700, letterSpacing: "0.05em" },
    button: { fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 6 },
        containedPrimary: {
          boxShadow: "0 0 20px rgba(249,115,22,0.25)",
          "&:hover": { boxShadow: "0 0 28px rgba(249,115,22,0.4)" },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(255,255,255,0.08)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        outlined: { borderColor: "rgba(249,115,22,0.4)" },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
  },
});

export default theme;
