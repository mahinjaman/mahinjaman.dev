import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import { Link as RouterLink, Navigate } from "react-router-dom";
import {
  Alert,
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  Link as MuiLink,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import ArticleIcon from "@mui/icons-material/Article";
import SchoolIcon from "@mui/icons-material/School";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RefreshIcon from "@mui/icons-material/Refresh";

import theme from "../../../theme/theme";
import { useAuth } from "../../../lib/auth";
import { useToast } from "../../../lib/toast";
import {
  deleteResource,
  fetchDashboardData,
  getDashboardError,
  type DashboardData,
  type ResourceType,
} from "../../../utils/dashboardApi";
import type { IBlog, IEducation, IExperience, IProject } from "../../../types";
import DashboardModals, {
  CLOSED_MODAL,
  type DashboardModalState,
} from "../../../components/admin/DashboardModals";

const DRAWER_WIDTH = 256;

interface NavItem {
  label: string;
  shortLabel: string;
  resource: ResourceType;
  icon: ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Manage Experience", shortLabel: "Experience", resource: "experience", icon: <WorkOutlineIcon /> },
  { label: "Manage Education", shortLabel: "Education", resource: "education", icon: <SchoolIcon /> },
  { label: "Manage Projects", shortLabel: "Project", resource: "project", icon: <IntegrationInstructionsIcon /> },
  { label: "Manage Blogs", shortLabel: "Blog Post", resource: "blog", icon: <ArticleIcon /> },
];

interface DeleteTarget {
  resource: ResourceType;
  id: string;
  label: string;
}

const headCellSx = {
  color: "text.secondary",
  fontSize: 11,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  borderColor: "divider",
  fontWeight: 700,
};
const cellSx = { borderColor: "divider", color: "text.primary", fontSize: 13.5 };

const formatDate = (iso?: string): string =>
  iso ? new Date(iso).toLocaleDateString() : "—";

/**
 * Production admin dashboard.
 *
 * - Rigid auth guard: renders nothing useful until the persisted token is
 *   validated; redirects to /admin/login when unauthenticated.
 * - Responsive shell: permanent sidebar on desktop, temporary drawer on
 *   mobile, plus a top navbar with user-profile controls.
 * - Three resource engines (Experience / Projects / Blogs) as MUI Tabs,
 *   each with a dynamic "Add New" action and a table of rows with
 *   Edit + Delete buttons.
 */
export default function AdminDashboard() {
  const { user, isAuthenticated, initializing, logout } = useAuth();
  const toast = useToast();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);

  const [data, setData] = useState<DashboardData>({
    experiences: [],
    projects: [],
    blogs: [],
    educations: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modal, setModal] = useState<DashboardModalState>(CLOSED_MODAL);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);
  const [deleting, setDeleting] = useState(false);

  const activeNav = NAV_ITEMS[activeIndex];

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await fetchDashboardData());
    } catch (err) {
      setError(getDashboardError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) void loadAll();
  }, [isAuthenticated, loadAll]);

  const openCreate = (resource: ResourceType) =>
    setModal({ open: true, resource, mode: "create", data: null });

  const openEdit = (
    resource: ResourceType,
    row: IExperience | IProject | IBlog | IEducation
  ) => setModal({ open: true, resource, mode: "edit", data: row });

  const closeModal = useCallback(() => setModal((m) => ({ ...m, open: false })), []);

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    const label = deleteTarget.label;
    setDeleting(true);
    try {
      await deleteResource(deleteTarget.resource, deleteTarget.id);
      setDeleteTarget(null);
      await loadAll();
      toast.success(`Deleted: ${label}`);
    } catch (err) {
      const message = getDashboardError(err);
      setError(message);
      toast.error(message);
    } finally {
      setDeleting(false);
    }
  };

  const counts = useMemo(
    () => ({
      experience: data.experiences.length,
      education: data.educations.length,
      project: data.projects.length,
      blog: data.blogs.length,
    }),
    [data]
  );

  /* ----------------------------- Auth guard ----------------------------- */
  if (initializing) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.default",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      </ThemeProvider>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  /* ------------------------------- Sidebar ------------------------------ */
  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar sx={{ px: 2.5 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <DashboardCustomizeIcon sx={{ color: "primary.main" }} />
          <Typography variant="h6" sx={{ color: "common.white", letterSpacing: "0.05em" }}>
            MAHIN
            <Box component="span" sx={{ color: "primary.main", fontStyle: "italic" }}>
              _CMS
            </Box>
          </Typography>
        </Stack>
      </Toolbar>
      <Divider sx={{ borderColor: "divider" }} />

      <List sx={{ px: 1.5, py: 2, flexGrow: 1 }}>
        {NAV_ITEMS.map((item, index) => {
          const selected = index === activeIndex;
          return (
            <ListItemButton
              key={item.resource}
              selected={selected}
              onClick={() => {
                setActiveIndex(index);
                if (!isDesktop) setMobileOpen(false);
              }}
              sx={{
                borderRadius: 1.5,
                mb: 0.5,
                color: selected ? "primary.main" : "text.secondary",
                "&.Mui-selected": {
                  bgcolor: "rgba(249,115,22,0.10)",
                  "&:hover": { bgcolor: "rgba(249,115,22,0.16)" },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 38, color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 13.5, fontWeight: selected ? 700 : 500 }}
              />
              <Chip
                label={counts[item.resource]}
                size="small"
                sx={{
                  height: 20,
                  fontSize: 11,
                  bgcolor: selected ? "primary.main" : "rgba(255,255,255,0.06)",
                  color: selected ? "common.black" : "text.secondary",
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Divider sx={{ borderColor: "divider" }} />
      <List sx={{ px: 1.5, py: 1 }}>
        <ListItemButton
          component={RouterLink}
          to="/"
          sx={{ borderRadius: 1.5, color: "text.secondary" }}
        >
          <ListItemIcon sx={{ minWidth: 38, color: "inherit" }}>
            <OpenInNewIcon />
          </ListItemIcon>
          <ListItemText primary="View Site" primaryTypographyProps={{ fontSize: 13.5 }} />
        </ListItemButton>
        <ListItemButton onClick={logout} sx={{ borderRadius: 1.5, color: "error.main" }}>
          <ListItemIcon sx={{ minWidth: 38, color: "inherit" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: 13.5 }} />
        </ListItemButton>
      </List>
    </Box>
  );

  /* -------------------------------- Render ------------------------------ */
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default", fontFamily: theme.typography.fontFamily }}>
        {/* Top navbar */}
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
            ml: { md: `${DRAWER_WIDTH}px` },
            bgcolor: "rgba(5,5,5,0.85)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <IconButton
                onClick={() => setMobileOpen(true)}
                sx={{ display: { md: "none" }, color: "text.secondary" }}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ color: "common.white" }}>
                {activeNav.label}
              </Typography>
            </Stack>

            {/* User profile controls */}
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Tooltip title="Refresh data">
                <IconButton onClick={() => void loadAll()} sx={{ color: "text.secondary" }}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Account">
                <IconButton onClick={(e) => setProfileAnchor(e.currentTarget)} sx={{ ml: 0.5 }}>
                  <Avatar
                    sx={{
                      width: 34,
                      height: 34,
                      bgcolor: "primary.main",
                      color: "common.black",
                      fontSize: 15,
                      fontWeight: 800,
                    }}
                  >
                    {(user?.email?.[0] ?? "A").toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={profileAnchor}
                open={Boolean(profileAnchor)}
                onClose={() => setProfileAnchor(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{ sx: { minWidth: 220, bgcolor: "background.paper" } }}
              >
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Typography sx={{ fontSize: 11, color: "text.secondary" }}>Signed in as</Typography>
                  <Typography sx={{ fontSize: 13.5, color: "common.white", wordBreak: "break-all" }}>
                    {user?.email}
                  </Typography>
                  <Chip
                    label={user?.role ?? "admin"}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ mt: 0.75, fontSize: 10, height: 20, textTransform: "uppercase" }}
                  />
                </Box>
                <Divider sx={{ borderColor: "divider" }} />
                <MenuItem component={RouterLink} to="/" onClick={() => setProfileAnchor(null)}>
                  <ListItemIcon>
                    <OpenInNewIcon fontSize="small" sx={{ color: "text.secondary" }} />
                  </ListItemIcon>
                  View Site
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setProfileAnchor(null);
                    logout();
                  }}
                  sx={{ color: "error.main" }}
                >
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" sx={{ color: "error.main" }} />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Stack>
          </Toolbar>
        </AppBar>

        {/* Sidebar: permanent on desktop, temporary on mobile */}
        <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                width: DRAWER_WIDTH,
                boxSizing: "border-box",
                bgcolor: "background.paper",
                borderColor: "divider",
              },
            }}
          >
            {drawerContent}
          </Drawer>
          <Drawer
            variant="permanent"
            open
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {
                width: DRAWER_WIDTH,
                boxSizing: "border-box",
                bgcolor: "background.paper",
                borderRight: "1px solid",
                borderColor: "divider",
              },
            }}
          >
            {drawerContent}
          </Drawer>
        </Box>

        {/* Main content */}
        <Box component="main" sx={{ flexGrow: 1, width: { md: `calc(100% - ${DRAWER_WIDTH}px)` } }}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ py: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
                {error}
              </Alert>
            )}

            {/* Tabs mirror the sidebar selection */}
            <Tabs
              value={activeIndex}
              onChange={(_e: SyntheticEvent, v: number) => setActiveIndex(v)}
              textColor="primary"
              indicatorColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              sx={{ mb: 3, borderBottom: "1px solid", borderColor: "divider" }}
            >
              {NAV_ITEMS.map((item) => (
                <Tab
                  key={item.resource}
                  label={`${item.label} (${counts[item.resource]})`}
                  sx={{ textTransform: "none", fontWeight: 600 }}
                />
              ))}
            </Tabs>

            {/* Top-of-tab action bar */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Typography variant="h6">{activeNav.label}</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => openCreate(activeNav.resource)}
              >
                Add New {activeNav.shortLabel}
              </Button>
            </Stack>

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
                <CircularProgress color="primary" />
              </Box>
            ) : (
              <>
                {activeNav.resource === "experience" && (
                  <ExperienceTable
                    rows={data.experiences}
                    onEdit={(row) => openEdit("experience", row)}
                    onDelete={(row) =>
                      setDeleteTarget({
                        resource: "experience",
                        id: row._id,
                        label: `${row.role} @ ${row.companyName}`,
                      })
                    }
                  />
                )}
                {activeNav.resource === "education" && (
                  <EducationTable
                    rows={data.educations}
                    onEdit={(row) => openEdit("education", row)}
                    onDelete={(row) =>
                      setDeleteTarget({
                        resource: "education",
                        id: row._id,
                        label: `${row.degree} — ${row.institution}`,
                      })
                    }
                  />
                )}
                {activeNav.resource === "project" && (
                  <ProjectTable
                    rows={data.projects}
                    onEdit={(row) => openEdit("project", row)}
                    onDelete={(row) =>
                      setDeleteTarget({ resource: "project", id: row._id, label: row.title })
                    }
                  />
                )}
                {activeNav.resource === "blog" && (
                  <BlogTable
                    rows={data.blogs}
                    onEdit={(row) => openEdit("blog", row)}
                    onDelete={(row) =>
                      setDeleteTarget({ resource: "blog", id: row._id, label: row.title })
                    }
                  />
                )}
              </>
            )}
          </Container>
        </Box>
      </Box>

      {/* Create / Edit modal */}
      <DashboardModals state={modal} onClose={closeModal} onSaved={() => void loadAll()} />

      {/* Delete confirmation */}
      <Dialog
        open={Boolean(deleteTarget)}
        onClose={deleting ? undefined : () => setDeleteTarget(null)}
        PaperProps={{ sx: { bgcolor: "background.paper" } }}
      >
        <DialogTitle>Confirm deletion</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "text.secondary" }}>
            Delete <strong>{deleteTarget?.label}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setDeleteTarget(null)} disabled={deleting} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={deleting}
            startIcon={deleting ? <CircularProgress size={16} color="inherit" /> : <DeleteOutlineIcon />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

/* -------------------------------------------------------------------------- */
/*  Tables                                                                     */
/* -------------------------------------------------------------------------- */

function EmptyState({ text }: { text: string }) {
  return (
    <Paper sx={{ p: 6, textAlign: "center", bgcolor: "background.paper" }}>
      <Typography sx={{ color: "text.secondary" }}>{text}</Typography>
    </Paper>
  );
}

function RowActions<T>({
  row,
  onEdit,
  onDelete,
}: {
  row: T;
  onEdit: (row: T) => void;
  onDelete: (row: T) => void;
}) {
  return (
    <Stack direction="row" spacing={1} justifyContent="flex-end">
      <Button
        size="small"
        variant="outlined"
        startIcon={<EditIcon sx={{ fontSize: 16 }} />}
        onClick={() => onEdit(row)}
        sx={{ minWidth: 0 }}
      >
        Edit
      </Button>
      <Button
        size="small"
        variant="outlined"
        color="error"
        startIcon={<DeleteOutlineIcon sx={{ fontSize: 16 }} />}
        onClick={() => onDelete(row)}
        sx={{ minWidth: 0 }}
      >
        Delete
      </Button>
    </Stack>
  );
}

function ExperienceTable({
  rows,
  onEdit,
  onDelete,
}: {
  rows: IExperience[];
  onEdit: (row: IExperience) => void;
  onDelete: (row: IExperience) => void;
}) {
  if (rows.length === 0) return <EmptyState text="No experience entries yet." />;
  return (
    <TableContainer component={Paper} sx={{ bgcolor: "background.paper" }}>
      <Table size="small" sx={{ minWidth: 720 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={headCellSx}>#</TableCell>
            <TableCell sx={headCellSx}>Company</TableCell>
            <TableCell sx={headCellSx}>Role</TableCell>
            <TableCell sx={headCellSx}>Duration</TableCell>
            <TableCell sx={headCellSx}>Keywords</TableCell>
            <TableCell sx={headCellSx} align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id} hover>
              <TableCell sx={cellSx}>{row.orderIndex}</TableCell>
              <TableCell sx={cellSx}>{row.companyName}</TableCell>
              <TableCell sx={cellSx}>{row.role}</TableCell>
              <TableCell sx={cellSx}>{row.duration}</TableCell>
              <TableCell sx={cellSx}>
                <Stack direction="row" flexWrap="wrap" gap={0.5} sx={{ maxWidth: 280 }}>
                  {row.technologies.slice(0, 4).map((t) => (
                    <Chip key={t} label={t} size="small" variant="outlined" sx={{ fontSize: 10 }} />
                  ))}
                  {row.technologies.length > 4 && (
                    <Chip label={`+${row.technologies.length - 4}`} size="small" sx={{ fontSize: 10 }} />
                  )}
                </Stack>
              </TableCell>
              <TableCell sx={cellSx} align="right">
                <RowActions row={row} onEdit={onEdit} onDelete={onDelete} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function EducationTable({
  rows,
  onEdit,
  onDelete,
}: {
  rows: IEducation[];
  onEdit: (row: IEducation) => void;
  onDelete: (row: IEducation) => void;
}) {
  if (rows.length === 0) return <EmptyState text="No education entries yet." />;
  return (
    <TableContainer component={Paper} sx={{ bgcolor: "background.paper" }}>
      <Table size="small" sx={{ minWidth: 720 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={headCellSx}>#</TableCell>
            <TableCell sx={headCellSx}>Degree</TableCell>
            <TableCell sx={headCellSx}>Institution</TableCell>
            <TableCell sx={headCellSx}>Duration</TableCell>
            <TableCell sx={headCellSx}>Result</TableCell>
            <TableCell sx={headCellSx} align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id} hover>
              <TableCell sx={cellSx}>{row.orderIndex}</TableCell>
              <TableCell sx={cellSx}>
                <Stack>
                  <span>{row.degree}</span>
                  {row.department && (
                    <Box component="span" sx={{ color: "text.secondary", fontSize: 11 }}>
                      {row.department}
                    </Box>
                  )}
                </Stack>
              </TableCell>
              <TableCell sx={cellSx}>{row.institution}</TableCell>
              <TableCell sx={cellSx}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <span>{row.duration}</span>
                  {row.isCurrent && (
                    <Chip
                      label="Current"
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ fontSize: 9, height: 18 }}
                    />
                  )}
                </Stack>
              </TableCell>
              <TableCell sx={cellSx}>{row.result || "—"}</TableCell>
              <TableCell sx={cellSx} align="right">
                <RowActions row={row} onEdit={onEdit} onDelete={onDelete} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function ProjectTable({
  rows,
  onEdit,
  onDelete,
}: {
  rows: IProject[];
  onEdit: (row: IProject) => void;
  onDelete: (row: IProject) => void;
}) {
  if (rows.length === 0) return <EmptyState text="No projects yet." />;
  return (
    <TableContainer component={Paper} sx={{ bgcolor: "background.paper" }}>
      <Table size="small" sx={{ minWidth: 720 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={headCellSx}>Title</TableCell>
            <TableCell sx={headCellSx}>Live URL</TableCell>
            <TableCell sx={headCellSx}>Repository</TableCell>
            <TableCell sx={headCellSx}>Tags</TableCell>
            <TableCell sx={headCellSx} align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id} hover>
              <TableCell sx={cellSx}>{row.title}</TableCell>
              <TableCell sx={cellSx}>
                {row.liveUrl ? (
                  <MuiLink href={row.liveUrl} target="_blank" rel="noopener" sx={{ color: "primary.main", fontSize: 12 }}>
                    Live ↗
                  </MuiLink>
                ) : (
                  "—"
                )}
              </TableCell>
              <TableCell sx={cellSx}>
                {row.githubUrl ? (
                  <MuiLink href={row.githubUrl} target="_blank" rel="noopener" sx={{ color: "primary.main", fontSize: 12 }}>
                    Code ↗
                  </MuiLink>
                ) : (
                  "—"
                )}
              </TableCell>
              <TableCell sx={cellSx}>
                <Stack direction="row" flexWrap="wrap" gap={0.5} sx={{ maxWidth: 240 }}>
                  {row.tags.slice(0, 4).map((t) => (
                    <Chip key={t} label={t} size="small" variant="outlined" sx={{ fontSize: 10 }} />
                  ))}
                </Stack>
              </TableCell>
              <TableCell sx={cellSx} align="right">
                <RowActions row={row} onEdit={onEdit} onDelete={onDelete} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function BlogTable({
  rows,
  onEdit,
  onDelete,
}: {
  rows: IBlog[];
  onEdit: (row: IBlog) => void;
  onDelete: (row: IBlog) => void;
}) {
  if (rows.length === 0) return <EmptyState text="No blog posts yet." />;
  return (
    <TableContainer component={Paper} sx={{ bgcolor: "background.paper" }}>
      <Table size="small" sx={{ minWidth: 720 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={headCellSx}>Title</TableCell>
            <TableCell sx={headCellSx}>Created</TableCell>
            <TableCell sx={headCellSx}>Tags</TableCell>
            <TableCell sx={headCellSx} align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id} hover>
              <TableCell sx={cellSx}>
                <Stack>
                  <span>{row.title}</span>
                  <MuiLink
                    component={RouterLink}
                    to={`/blog/${row.slug || row._id}`}
                    target="_blank"
                    sx={{ color: "text.secondary", fontSize: 11 }}
                  >
                    /{row.slug}
                  </MuiLink>
                </Stack>
              </TableCell>
              <TableCell sx={cellSx}>{formatDate(row.createdAt)}</TableCell>
              <TableCell sx={cellSx}>
                <Stack direction="row" flexWrap="wrap" gap={0.5} sx={{ maxWidth: 260 }}>
                  {row.tags.slice(0, 4).map((t) => (
                    <Chip key={t} label={t} size="small" variant="outlined" sx={{ fontSize: 10 }} />
                  ))}
                </Stack>
              </TableCell>
              <TableCell sx={cellSx} align="right">
                <RowActions row={row} onEdit={onEdit} onDelete={onDelete} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
