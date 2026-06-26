import { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Link as MuiLink,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { blogApi, getApiErrorMessage } from "../../../lib/api";
import theme from "../../../theme/theme";
import type { IBlog } from "../../../types";

const formatDate = (iso?: string): string =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

/**
 * Blog detail / reader view. Resolves by slug OR id (`/blog/:id`) and renders
 * the stored Markdown with GitHub-flavored extensions, styled to the theme.
 */
export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    blogApi
      .getByIdOrSlug(id)
      .then((data) => !cancelled && setBlog(data))
      .catch((err) => !cancelled && setError(getApiErrorMessage(err)))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
          pt: { xs: 13, md: 16 },
          pb: 12,
          fontFamily: theme.typography.fontFamily,
        }}
      >
        <Container maxWidth="md">
          <Button
            component={RouterLink}
            to="/blog"
            startIcon={<ArrowBackIcon />}
            sx={{ color: "text.secondary", mb: 4, "&:hover": { color: "primary.main" } }}
          >
            Back to all posts
          </Button>

          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
              <CircularProgress color="primary" />
            </Box>
          )}

          {!loading && error && (
            <Typography sx={{ textAlign: "center", color: "error.main" }}>
              {error}
            </Typography>
          )}

          {!loading && !error && blog && (
            <article>
              {/* Meta */}
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                {blog.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    variant="outlined"
                    sx={{ color: "primary.main", fontSize: 10 }}
                  />
                ))}
              </Stack>

              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2rem", md: "3rem" },
                  lineHeight: 1.15,
                  mb: 2,
                }}
              >
                {blog.title}
              </Typography>

              <Typography sx={{ color: "text.secondary", fontSize: 13, mb: 4 }}>
                Published {formatDate(blog.createdAt)}
              </Typography>

              {blog.coverImage && (
                <Box
                  component="img"
                  src={blog.coverImage}
                  alt={blog.title}
                  sx={{
                    width: "100%",
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    mb: 5,
                  }}
                />
              )}

              <Divider sx={{ mb: 5 }} />

              {/* Markdown body */}
              <Box sx={{ "& > *:first-of-type": { mt: 0 } }}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <Typography variant="h3" sx={{ mt: 5, mb: 2 }}>
                        {children}
                      </Typography>
                    ),
                    h2: ({ children }) => (
                      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
                        {children}
                      </Typography>
                    ),
                    h3: ({ children }) => (
                      <Typography variant="h5" sx={{ mt: 3, mb: 1.5 }}>
                        {children}
                      </Typography>
                    ),
                    p: ({ children }) => (
                      <Typography
                        sx={{
                          color: "text.secondary",
                          fontSize: 16,
                          lineHeight: 1.85,
                          mb: 2.5,
                        }}
                      >
                        {children}
                      </Typography>
                    ),
                    a: ({ href, children }) => (
                      <MuiLink
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: "primary.main", textDecorationColor: "rgba(249,115,22,0.5)" }}
                      >
                        {children}
                      </MuiLink>
                    ),
                    ul: ({ children }) => (
                      <Box component="ul" sx={{ pl: 3, mb: 2.5, color: "text.secondary" }}>
                        {children}
                      </Box>
                    ),
                    ol: ({ children }) => (
                      <Box component="ol" sx={{ pl: 3, mb: 2.5, color: "text.secondary" }}>
                        {children}
                      </Box>
                    ),
                    li: ({ children }) => (
                      <Box component="li" sx={{ mb: 0.75, lineHeight: 1.8, fontSize: 16 }}>
                        {children}
                      </Box>
                    ),
                    blockquote: ({ children }) => (
                      <Box
                        sx={{
                          borderLeft: "3px solid",
                          borderColor: "primary.main",
                          pl: 2.5,
                          py: 0.5,
                          my: 3,
                          color: "text.secondary",
                          fontStyle: "italic",
                          bgcolor: "rgba(249,115,22,0.04)",
                        }}
                      >
                        {children}
                      </Box>
                    ),
                    code: ({ className, children }) => {
                      const isBlock = Boolean(className);
                      if (isBlock) {
                        return (
                          <Box
                            component="code"
                            sx={{
                              display: "block",
                              fontFamily: "monospace",
                              fontSize: 13.5,
                              color: "#e2e8f0",
                              whiteSpace: "pre",
                            }}
                          >
                            {children}
                          </Box>
                        );
                      }
                      return (
                        <Box
                          component="code"
                          sx={{
                            fontFamily: "monospace",
                            fontSize: "0.9em",
                            px: 0.75,
                            py: 0.25,
                            borderRadius: 0.5,
                            bgcolor: "rgba(255,255,255,0.08)",
                            color: "primary.light",
                          }}
                        >
                          {children}
                        </Box>
                      );
                    },
                    pre: ({ children }) => (
                      <Box
                        component="pre"
                        sx={{
                          p: 2.5,
                          my: 3,
                          borderRadius: 2,
                          bgcolor: "#0d0d0d",
                          border: "1px solid",
                          borderColor: "divider",
                          overflowX: "auto",
                        }}
                      >
                        {children}
                      </Box>
                    ),
                    img: ({ src, alt }) => (
                      <Box
                        component="img"
                        src={typeof src === "string" ? src : undefined}
                        alt={alt}
                        sx={{ maxWidth: "100%", borderRadius: 2, my: 3 }}
                      />
                    ),
                    hr: () => <Divider sx={{ my: 4 }} />,
                  }}
                >
                  {blog.content}
                </ReactMarkdown>
              </Box>
            </article>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
