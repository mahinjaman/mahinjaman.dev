import { useState, type FormEvent } from "react";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Link as MuiLink,
  Paper,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuth } from "../../../lib/auth";
import { getApiErrorMessage } from "../../../lib/api";
import { useToast } from "../../../lib/toast";
import theme from "../../../theme/theme";

interface LocationState {
  from?: { pathname?: string };
}

/** Admin sign-in. On success, bounces to the originally requested page. */
export default function AdminLoginPage() {
  const { login, isAuthenticated } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectTo =
    (location.state as LocationState | null)?.from?.pathname ?? "/admin/dashboard";

  // Already signed in? Skip the form.
  if (isAuthenticated) {
    navigate(redirectTo, { replace: true });
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await login(email, password);
      toast.success("Signed in successfully");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const message = getApiErrorMessage(err);
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          display: "flex",
          alignItems: "center",
          fontFamily: theme.typography.fontFamily,
        }}
      >
        <Container maxWidth="xs">
          <Paper sx={{ p: { xs: 3, sm: 5 }, bgcolor: "background.paper" }}>
            <Stack alignItems="center" spacing={1} sx={{ mb: 3 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid",
                  borderColor: "primary.main",
                  color: "primary.main",
                  boxShadow: "0 0 18px rgba(249,115,22,0.3)",
                }}
              >
                <LockOutlinedIcon />
              </Box>
              <Typography variant="h5" sx={{ textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Admin Access
              </Typography>
              <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
                Restricted control panel
              </Typography>
            </Stack>

            <form onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={submitting}
                  startIcon={
                    submitting ? <CircularProgress size={16} color="inherit" /> : undefined
                  }
                >
                  {submitting ? "Authenticating…" : "Sign In"}
                </Button>
              </Stack>
            </form>

            <Typography sx={{ mt: 3, textAlign: "center", fontSize: 12, color: "text.secondary" }}>
              <MuiLink component={RouterLink} to="/" sx={{ color: "primary.main" }}>
                ← Back to site
              </MuiLink>
            </Typography>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
