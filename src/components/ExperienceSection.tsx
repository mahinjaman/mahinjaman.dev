import { useEffect, useState } from "react";
import {
  Box,
  Chip,
  CircularProgress,
  Container,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { experienceApi, getApiErrorMessage } from "../lib/api";
import theme from "../theme/theme";
import type { IExperience } from "../types";

/**
 * Public professional-experience timeline. Data is fetched live from the
 * backend, so anything added in the admin dashboard appears here instantly.
 *
 * Rendered inside its own <ThemeProvider> so it can drop into the existing
 * Tailwind landing page without a global MUI baseline.
 */
export default function ExperienceSection() {
  const [items, setItems] = useState<IExperience[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    experienceApi
      .getAll()
      .then((data) => {
        if (!cancelled) setItems(data);
      })
      .catch((err) => {
        if (!cancelled) setError(getApiErrorMessage(err));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="section"
        id="experience"
        sx={{
          py: { xs: 10, md: 14 },
          color: "text.primary",
          position: "relative",
          fontFamily: theme.typography.fontFamily,
        }}
      >
        <Container maxWidth="lg">
          {/* Heading */}
          <Stack alignItems="center" spacing={1.5} sx={{ mb: { xs: 6, md: 10 } }}>
            <Box sx={{ width: 100, height: "1px", bgcolor: "primary.main" }} />
            <Typography
              sx={{
                color: "primary.main",
                letterSpacing: "0.5em",
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              Professional Experience
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2.25rem", md: "3.5rem" },
                fontStyle: "italic",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              Work{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                History
              </Box>
            </Typography>
          </Stack>

          {/* States */}
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress color="primary" />
            </Box>
          )}

          {!loading && error && (
            <Typography sx={{ textAlign: "center", color: "error.main" }}>
              Failed to load experience: {error}
            </Typography>
          )}

          {!loading && !error && items.length === 0 && (
            <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
              No experience entries yet.
            </Typography>
          )}

          {/* Timeline */}
          {!loading && !error && items.length > 0 && (
            <Box
              sx={{
                position: "relative",
                pl: { xs: 3, md: 0 },
                // Vertical spine (desktop: centered-left; mobile: left edge)
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: { xs: 8, md: 24 },
                  width: "2px",
                  background:
                    "linear-gradient(180deg, rgba(249,115,22,0.6), rgba(249,115,22,0.05))",
                },
              }}
            >
              <Stack spacing={4}>
                {items.map((exp) => (
                  <Box key={exp._id} sx={{ position: "relative", pl: { xs: 4, md: 7 } }}>
                    {/* Node */}
                    <Box
                      sx={{
                        position: "absolute",
                        left: { xs: 0, md: 16 },
                        top: 6,
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        bgcolor: "background.default",
                        border: "2px solid",
                        borderColor: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 0 14px rgba(249,115,22,0.5)",
                      }}
                    >
                      <Box
                        sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "primary.main" }}
                      />
                    </Box>

                    {/* Card */}
                    <Box
                      sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 2,
                        p: { xs: 2.5, md: 3.5 },
                        bgcolor: "rgba(255,255,255,0.02)",
                        backdropFilter: "blur(6px)",
                        transition: "all .4s ease",
                        "&:hover": {
                          borderColor: "primary.main",
                          transform: "translateY(-4px)",
                          boxShadow: "0 0 30px rgba(249,115,22,0.12)",
                        },
                      }}
                    >
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="space-between"
                        alignItems={{ xs: "flex-start", sm: "center" }}
                        spacing={1}
                        sx={{ mb: 1 }}
                      >
                        <Stack direction="row" spacing={1} alignItems="center">
                          <WorkOutlineIcon sx={{ color: "primary.main", fontSize: 20 }} />
                          <Typography variant="h5" sx={{ lineHeight: 1.2 }}>
                            {exp.role}
                          </Typography>
                        </Stack>
                        <Chip
                          label={exp.duration}
                          size="small"
                          variant="outlined"
                          sx={{
                            color: "primary.main",
                            fontSize: 11,
                            letterSpacing: "0.1em",
                          }}
                        />
                      </Stack>

                      <Typography
                        sx={{
                          color: "primary.main",
                          fontSize: 12,
                          fontWeight: 700,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          mb: 1.5,
                        }}
                      >
                        {exp.companyName}
                      </Typography>

                      <Typography sx={{ color: "text.secondary", fontSize: 14, lineHeight: 1.7, mb: 2 }}>
                        {exp.description}
                      </Typography>

                      <Stack direction="row" flexWrap="wrap" gap={1}>
                        {exp.technologies.map((tech) => (
                          <Chip
                            key={tech}
                            label={tech}
                            size="small"
                            sx={{
                              bgcolor: "rgba(0,0,0,0.4)",
                              border: "1px solid rgba(255,255,255,0.08)",
                              color: "text.secondary",
                              fontSize: 10,
                              "&:hover": { color: "text.primary", borderColor: "primary.main" },
                            }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
