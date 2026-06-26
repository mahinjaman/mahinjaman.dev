import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import {
  Alert,
  Snackbar,
  ThemeProvider,
  type AlertColor,
} from "@mui/material";
import theme from "../theme/theme";

interface ToastContextValue {
  notify: (message: string, severity?: AlertColor) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
}

interface ToastState {
  open: boolean;
  message: string;
  severity: AlertColor;
  /** Changes on each notify so a new toast replaces an in-flight one. */
  key: number;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

/**
 * App-wide toast/snackbar notifications. Wrap the app once, then call
 * `useToast()` anywhere to surface feedback for create/update/delete (or any)
 * operations. Rendered in its own dark ThemeProvider + portal so it never
 * disturbs the Tailwind landing page.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ToastState>({
    open: false,
    message: "",
    severity: "success",
    key: 0,
  });

  const notify = useCallback(
    (message: string, severity: AlertColor = "success") => {
      setState({ open: true, message, severity, key: Date.now() });
    },
    []
  );

  const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setState((s) => ({ ...s, open: false }));
  };

  const value = useMemo<ToastContextValue>(
    () => ({
      notify,
      success: (message) => notify(message, "success"),
      error: (message) => notify(message, "error"),
      info: (message) => notify(message, "info"),
      warning: (message) => notify(message, "warning"),
    }),
    [notify]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ThemeProvider theme={theme}>
        <Snackbar
          key={state.key}
          open={state.open}
          autoHideDuration={3500}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity={state.severity}
            variant="filled"
            sx={{
              width: "100%",
              fontFamily: theme.typography.fontFamily,
              alignItems: "center",
              boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
            }}
          >
            {state.message}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a <ToastProvider>");
  return ctx;
}
