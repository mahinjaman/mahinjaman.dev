import { useState, type KeyboardEvent } from "react";
import { Box, Chip, Stack, TextField, Typography } from "@mui/material";

interface TagInputProps {
  label: string;
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  helperText?: string;
}

/**
 * Array/tag editor: type a value and press Enter or comma to add a chip;
 * click the × on a chip (or Backspace on an empty field) to remove.
 * Used for both project/blog tags and experience technologies.
 */
export default function TagInput({
  label,
  value,
  onChange,
  placeholder,
  helperText,
}: TagInputProps) {
  const [draft, setDraft] = useState("");

  const addTag = (raw: string) => {
    const tag = raw.trim();
    if (!tag) return;
    if (!value.includes(tag)) onChange([...value, tag]);
    setDraft("");
  };

  const removeTag = (tag: string) => onChange(value.filter((t) => t !== tag));

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(draft);
    } else if (e.key === "Backspace" && draft === "" && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <Box>
      <Typography sx={{ fontSize: 12, color: "text.secondary", mb: 1 }}>
        {label}
      </Typography>
      <TextField
        fullWidth
        size="small"
        value={draft}
        placeholder={placeholder ?? "Type and press Enter…"}
        helperText={helperText}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => addTag(draft)}
      />
      {value.length > 0 && (
        <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{ mt: 1.5 }}>
          {value.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              onDelete={() => removeTag(tag)}
              sx={{ color: "primary.main" }}
              variant="outlined"
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}
