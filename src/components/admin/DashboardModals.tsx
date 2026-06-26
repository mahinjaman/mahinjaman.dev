import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import TagInput from "./TagInput";
import {
  createResource,
  getDashboardError,
  updateResource,
  type ResourceType,
} from "../../utils/dashboardApi";
import type { IBlog, IEducation, IExperience, IProject } from "../../types";
import { useToast } from "../../lib/toast";

export type ModalMode = "create" | "edit";

/** Drives which dialog is shown and whether it creates or edits. */
export interface DashboardModalState {
  open: boolean;
  resource: ResourceType;
  mode: ModalMode;
  /** The row being edited; null when creating. */
  data: IExperience | IProject | IBlog | IEducation | null;
}

export const CLOSED_MODAL: DashboardModalState = {
  open: false,
  resource: "experience",
  mode: "create",
  data: null,
};

interface DashboardModalsProps {
  state: DashboardModalState;
  onClose: () => void;
  /** Called after a successful create/update so the parent can refetch. */
  onSaved: () => void;
}

/** Professional keyword shortcuts surfaced in the Experience form. */
const KEYWORD_SUGGESTIONS = [
  "Performance Optimization",
  "Debugging & Problem Solving",
  "REST API Development",
  "Database Modeling",
];

/** One broad, controlled form state covering all three resource shapes. */
interface FormState {
  // experience
  companyName: string;
  role: string;
  startDate: string; // yyyy-mm-dd (date input)
  endDate: string; // yyyy-mm-dd, empty = ongoing ("Present")
  orderIndex: string;
  // shared chip arrays (experience.technologies / blog.tags)
  chips: string[];
  // project
  title: string;
  description: string;
  projectTags: string; // comma-separated -> array on submit
  liveUrl: string;
  githubUrl: string;
  image: string;
  // blog
  coverImage: string;
  content: string;
  excerpt: string;
  // education
  degree: string;
  institution: string;
  department: string;
  eduDuration: string;
  result: string;
  isCurrent: boolean;
}

const EMPTY_FORM: FormState = {
  companyName: "",
  role: "",
  startDate: "",
  endDate: "",
  orderIndex: "0",
  chips: [],
  title: "",
  description: "",
  projectTags: "",
  liveUrl: "",
  githubUrl: "",
  image: "",
  coverImage: "",
  content: "",
  excerpt: "",
  degree: "",
  institution: "",
  department: "",
  eduDuration: "",
  result: "",
  isCurrent: false,
};

/** Converts an ISO date string to the yyyy-mm-dd value a date input expects. */
const toDateInputValue = (iso?: string | null): string =>
  iso ? new Date(iso).toISOString().slice(0, 10) : "";

/**
 * Native <input type="date"> renders a black calendar-picker icon that is
 * invisible on our dark theme. Invert it to white and make it clearly clickable.
 */
const dateFieldSx = {
  "& input::-webkit-calendar-picker-indicator": {
    filter: "invert(1)",
    opacity: 0.7,
    cursor: "pointer",
  },
  "& input::-webkit-calendar-picker-indicator:hover": { opacity: 1 },
};

const RESOURCE_LABEL: Record<ResourceType, string> = {
  experience: "Experience",
  project: "Project",
  blog: "Blog Post",
  education: "Education",
};

/**
 * Contextual modal manager for the admin dashboard. A single <Dialog> renders
 * the Experience, Project, or Blog form based on `state.resource`, switching
 * between CREATE and EDIT via `state.mode`. All persistence flows through
 * `dashboardApi`, which injects the JWT Bearer token on every mutation.
 */
export default function DashboardModals({
  state,
  onClose,
  onSaved,
}: DashboardModalsProps) {
  const { open, resource, mode, data } = state;
  const toast = useToast();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hydrate the form whenever the dialog opens (or its target changes).
  useEffect(() => {
    if (!open) return;
    setError(null);

    if (mode === "create" || !data) {
      setForm(EMPTY_FORM);
      return;
    }

    if (resource === "experience") {
      const e = data as IExperience;
      setForm({
        ...EMPTY_FORM,
        companyName: e.companyName ?? "",
        role: e.role ?? "",
        startDate: toDateInputValue(e.startDate),
        endDate: toDateInputValue(e.endDate),
        orderIndex: String(e.orderIndex ?? 0),
        chips: e.technologies ?? [],
      });
    } else if (resource === "project") {
      const p = data as IProject;
      setForm({
        ...EMPTY_FORM,
        title: p.title ?? "",
        description: p.description ?? "",
        projectTags: (p.tags ?? []).join(", "),
        liveUrl: p.liveUrl ?? "",
        githubUrl: p.githubUrl ?? "",
        image: p.image ?? "",
      });
    } else if (resource === "education") {
      const ed = data as IEducation;
      setForm({
        ...EMPTY_FORM,
        degree: ed.degree ?? "",
        institution: ed.institution ?? "",
        department: ed.department ?? "",
        eduDuration: ed.duration ?? "",
        result: ed.result ?? "",
        isCurrent: ed.isCurrent ?? false,
        orderIndex: String(ed.orderIndex ?? 0),
      });
    } else {
      const b = data as IBlog;
      setForm({
        ...EMPTY_FORM,
        title: b.title ?? "",
        coverImage: b.coverImage ?? "",
        excerpt: b.excerpt ?? "",
        content: b.content ?? "",
        chips: b.tags ?? [],
      });
    }
  }, [open, mode, resource, data]);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const addSuggestion = (keyword: string) => {
    if (!form.chips.includes(keyword)) {
      setForm((prev) => ({ ...prev, chips: [...prev.chips, keyword] }));
    }
  };

  /** Splits the project comma-separated tag string into a clean array. */
  const parseCommaTags = (raw: string): string[] =>
    raw
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

  const validate = (): string | null => {
    if (resource === "experience") {
      if (!form.companyName.trim()) return "Company name is required.";
      if (!form.role.trim()) return "Role is required.";
      if (!form.startDate) return "Start date is required.";
      if (form.endDate && form.endDate < form.startDate)
        return "End date must be on or after the start date.";
    } else if (resource === "education") {
      if (!form.degree.trim()) return "Degree / certificate is required.";
      if (!form.institution.trim()) return "Institution is required.";
      if (!form.eduDuration.trim()) return "Duration is required.";
    } else {
      if (!form.title.trim()) return "Title is required.";
      if (resource === "project" && !form.description.trim())
        return "Description is required.";
      if (resource === "blog" && !form.content.trim())
        return "Content is required.";
    }
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      if (resource === "experience") {
        const parsedOrder = Number(form.orderIndex);
        const payload: Partial<IExperience> = {
          companyName: form.companyName.trim(),
          role: form.role.trim(),
          startDate: form.startDate,
          endDate: form.endDate ? form.endDate : null,
          orderIndex: Number.isFinite(parsedOrder) ? parsedOrder : 0,
          technologies: form.chips,
        };
        if (mode === "edit" && data) {
          await updateResource("experience", data._id, payload);
        } else {
          await createResource("experience", payload);
        }
      } else if (resource === "project") {
        const payload: Partial<IProject> = {
          title: form.title.trim(),
          description: form.description.trim(),
          tags: parseCommaTags(form.projectTags),
          liveUrl: form.liveUrl.trim() || undefined,
          githubUrl: form.githubUrl.trim() || undefined,
          image: form.image.trim() || undefined,
        };
        if (mode === "edit" && data) {
          await updateResource("project", data._id, payload);
        } else {
          await createResource("project", payload);
        }
      } else if (resource === "education") {
        const parsedOrder = Number(form.orderIndex);
        const payload: Partial<IEducation> = {
          degree: form.degree.trim(),
          institution: form.institution.trim(),
          department: form.department.trim() || undefined,
          duration: form.eduDuration.trim(),
          result: form.result.trim() || undefined,
          isCurrent: form.isCurrent,
          orderIndex: Number.isFinite(parsedOrder) ? parsedOrder : 0,
        };
        if (mode === "edit" && data) {
          await updateResource("education", data._id, payload);
        } else {
          await createResource("education", payload);
        }
      } else {
        const payload: Partial<IBlog> = {
          title: form.title.trim(),
          content: form.content,
          excerpt: form.excerpt.trim() || undefined,
          coverImage: form.coverImage.trim() || undefined,
          tags: form.chips,
        };
        if (mode === "edit" && data) {
          await updateResource("blog", data._id, payload);
        } else {
          await createResource("blog", payload);
        }
      }

      toast.success(
        `${RESOURCE_LABEL[resource]} ${mode === "edit" ? "updated" : "created"} successfully`
      );
      onSaved();
      onClose();
    } catch (err) {
      const message = getDashboardError(err);
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const dialogTitle = `${mode === "edit" ? "Edit" : "Add New"} ${RESOURCE_LABEL[resource]}`;

  return (
    <Dialog
      open={open}
      onClose={submitting ? undefined : onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { bgcolor: "background.paper", backgroundImage: "none" } }}
    >
      <DialogTitle
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        {dialogTitle}
        <IconButton onClick={onClose} disabled={submitting} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2.5} sx={{ pt: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}

          {/* ---------------- EXPERIENCE ---------------- */}
          {resource === "experience" && (
            <>
              <TextField
                label="Company Name"
                fullWidth
                required
                value={form.companyName}
                onChange={(e) => setField("companyName", e.target.value)}
              />
              <TextField
                label="Role"
                fullWidth
                required
                value={form.role}
                onChange={(e) => setField("role", e.target.value)}
              />
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Start Date (join date)"
                  type="date"
                  fullWidth
                  required
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={dateFieldSx}
                  value={form.startDate}
                  onChange={(e) => setField("startDate", e.target.value)}
                />
                <TextField
                  label="End Date"
                  type="date"
                  fullWidth
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={dateFieldSx}
                  helperText="Leave empty if current — duration counts automatically."
                  value={form.endDate}
                  onChange={(e) => setField("endDate", e.target.value)}
                />
              </Stack>
              <TextField
                label="Order Index"
                type="number"
                helperText="Lower number appears first on the timeline."
                sx={{ width: { xs: "100%", sm: 200 } }}
                value={form.orderIndex}
                onChange={(e) => setField("orderIndex", e.target.value)}
              />

              <Box>
                <Typography sx={{ fontSize: 12, color: "text.secondary", mb: 1 }}>
                  Quick-add keywords
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={0.75}>
                  {KEYWORD_SUGGESTIONS.map((kw) => {
                    const active = form.chips.includes(kw);
                    return (
                      <Chip
                        key={kw}
                        label={kw}
                        size="small"
                        icon={active ? undefined : <AddIcon sx={{ fontSize: 14 }} />}
                        onClick={() => addSuggestion(kw)}
                        color={active ? "primary" : "default"}
                        variant={active ? "filled" : "outlined"}
                        sx={{ fontSize: 11, cursor: "pointer" }}
                      />
                    );
                  })}
                </Stack>
              </Box>

              <TagInput
                label="Technologies"
                value={form.chips}
                onChange={(next) => setField("chips", next)}
                placeholder="Add a technology and press Enter"
                helperText="Press Enter or comma to add each item."
              />
            </>
          )}

          {/* ---------------- PROJECT ---------------- */}
          {resource === "project" && (
            <>
              <TextField
                label="Title"
                fullWidth
                required
                value={form.title}
                onChange={(e) => setField("title", e.target.value)}
              />
              <TextField
                label="Description"
                fullWidth
                required
                multiline
                minRows={3}
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
              />
              <TextField
                label="Tags"
                fullWidth
                placeholder="React, Node.js, MongoDB"
                helperText="Comma-separated; saved as an array."
                value={form.projectTags}
                onChange={(e) => setField("projectTags", e.target.value)}
              />
              <TextField
                label="Live URL"
                fullWidth
                placeholder="https://example.com"
                value={form.liveUrl}
                onChange={(e) => setField("liveUrl", e.target.value)}
              />
              <TextField
                label="GitHub URL"
                fullWidth
                placeholder="https://github.com/…"
                value={form.githubUrl}
                onChange={(e) => setField("githubUrl", e.target.value)}
              />
              <TextField
                label="Image URL"
                fullWidth
                placeholder="https://…/cover.png"
                value={form.image}
                onChange={(e) => setField("image", e.target.value)}
              />
            </>
          )}

          {/* ---------------- EDUCATION ---------------- */}
          {resource === "education" && (
            <>
              <TextField
                label="Degree / Certificate"
                fullWidth
                required
                placeholder="Diploma in Engineering"
                value={form.degree}
                onChange={(e) => setField("degree", e.target.value)}
              />
              <TextField
                label="Institution"
                fullWidth
                required
                value={form.institution}
                onChange={(e) => setField("institution", e.target.value)}
              />
              <TextField
                label="Department"
                fullWidth
                placeholder="e.g. Computer Science and Technology"
                value={form.department}
                onChange={(e) => setField("department", e.target.value)}
              />
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Duration"
                  fullWidth
                  required
                  placeholder="2020 — 2023  ·  or  ·  Running"
                  value={form.eduDuration}
                  onChange={(e) => setField("eduDuration", e.target.value)}
                />
                <TextField
                  label="Result"
                  fullWidth
                  placeholder="GPA: 4.56"
                  value={form.result}
                  onChange={(e) => setField("result", e.target.value)}
                />
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                gap={2}
              >
                <TextField
                  label="Order Index"
                  type="number"
                  helperText="Lower number appears first."
                  sx={{ width: { xs: "100%", sm: 200 } }}
                  value={form.orderIndex}
                  onChange={(e) => setField("orderIndex", e.target.value)}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={form.isCurrent}
                      onChange={(e) => setField("isCurrent", e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Currently studying"
                />
              </Stack>
            </>
          )}

          {/* ---------------- BLOG ---------------- */}
          {resource === "blog" && (
            <>
              <TextField
                label="Title"
                fullWidth
                required
                value={form.title}
                onChange={(e) => setField("title", e.target.value)}
              />
              <TextField
                label="Cover Image URL"
                fullWidth
                placeholder="https://…/cover.png"
                value={form.coverImage}
                onChange={(e) => setField("coverImage", e.target.value)}
              />
              <TextField
                label="Excerpt"
                fullWidth
                multiline
                minRows={2}
                helperText="Optional. Auto-generated from content if left blank."
                value={form.excerpt}
                onChange={(e) => setField("excerpt", e.target.value)}
              />
              <TagInput
                label="Tags"
                value={form.chips}
                onChange={(next) => setField("chips", next)}
                placeholder="Add a tag and press Enter"
              />
              <TextField
                label="Content (Markdown)"
                fullWidth
                required
                multiline
                minRows={10}
                placeholder={"# Heading\n\nWrite your post in **Markdown**…"}
                value={form.content}
                onChange={(e) => setField("content", e.target.value)}
                sx={{ "& textarea": { fontFamily: "monospace", fontSize: 13.5 } }}
              />
            </>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} disabled={submitting} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={submitting}
          startIcon={
            submitting ? <CircularProgress size={16} color="inherit" /> : undefined
          }
        >
          {mode === "edit" ? "Save Changes" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
