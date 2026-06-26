import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { blogApi, getApiErrorMessage } from "../../../lib/api";
import theme from "../../../theme/theme";
import type { IBlog } from "../../../types";

const formatDate = (iso?: string): string =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

/** Public blog index — responsive card grid fed by the backend. */
export default function BlogListPage() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    blogApi
      .getAll()
      .then((data) => !cancelled && setBlogs(data))
      .catch((err) => !cancelled && setError(getApiErrorMessage(err)))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
          pt: { xs: 14, md: 18 },
          pb: 12,
          fontFamily: theme.typography.fontFamily,
        }}
      >
        <Container maxWidth="lg">
          {/* Heading */}
          <Stack alignItems="center" spacing={1.5} sx={{ mb: { xs: 6, md: 9 } }}>
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
              Field Notes
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
              The{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                Blog
              </Box>
            </Typography>
          </Stack>

          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
              <CircularProgress color="primary" />
            </Box>
          )}

          {!loading && error && (
            <Typography sx={{ textAlign: "center", color: "error.main" }}>
              Failed to load posts: {error}
            </Typography>
          )}

          {!loading && !error && blogs.length === 0 && (
            <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
              No posts published yet. Check back soon.
            </Typography>
          )}

          {/* Responsive CSS grid */}
          {!loading && !error && blogs.length > 0 && (
            <Box
              sx={{
                display: "grid",
                gap: 3,
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
              }}
            >
              {blogs.map((blog) => (
                <Card
                  key={blog._id}
                  sx={{
                    bgcolor: "background.paper",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    transition: "all .35s ease",
                    "&:hover": {
                      borderColor: "primary.main",
                      transform: "translateY(-6px)",
                      boxShadow: "0 0 30px rgba(249,115,22,0.12)",
                    },
                  }}
                >
                  <CardActionArea
                    component={RouterLink}
                    to={`/blog/${blog.slug || blog._id}`}
                    sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "stretch" }}
                  >
                    {/* Cover */}
                    <Box
                      sx={{
                        height: 170,
                        backgroundColor: "#111",
                        backgroundImage: blog.coverImage
                          ? `url(${blog.coverImage})`
                          : "linear-gradient(135deg, rgba(249,115,22,0.18), rgba(0,0,0,0.6))",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderBottom: "1px solid",
                        borderColor: "divider",
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                      <Typography sx={{ color: "text.secondary", fontSize: 11, mb: 1 }}>
                        {formatDate(blog.createdAt)}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "1.1rem",
                          lineHeight: 1.3,
                          mb: 1.5,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {blog.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "text.secondary",
                          fontSize: 13,
                          lineHeight: 1.6,
                          mb: 2,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {blog.excerpt}
                      </Typography>

                      <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{ mt: "auto", mb: 1.5 }}>
                        {blog.tags.slice(0, 3).map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: 10, color: "primary.main" }}
                          />
                        ))}
                      </Stack>

                      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: "primary.main" }}>
                        <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em" }}>
                          READ_MORE
                        </Typography>
                        <ArrowForwardIcon sx={{ fontSize: 14 }} />
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Box>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
