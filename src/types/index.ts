export interface IMenuItem {
  title: string;
  link: string;
  /** When true, the navbar renders a react-router <Link> instead of an anchor. */
  route?: boolean;
}

/** Mirrors the backend Experience model. */
export interface IExperience {
  _id: string;
  companyName: string;
  role: string;
  /** ISO start (join) date. */
  startDate: string;
  /** ISO end date, or null/undefined when the role is ongoing ("Present"). */
  endDate?: string | null;
  /** Server-computed, auto-updating label e.g. "Jan 2024 – Present · 1 yr 5 mos". Read-only. */
  duration?: string;
  description: string;
  technologies: string[];
  orderIndex: number;
  createdAt?: string;
  updatedAt?: string;
}

/** Mirrors the backend Project model. */
export interface IProject {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

/** Mirrors the backend Blog model. */
export interface IBlog {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  coverImage?: string;
  slug: string;
  excerpt?: string;
  createdAt?: string;
  updatedAt?: string;
}

/** Mirrors the backend Education model. */
export interface IEducation {
  _id: string;
  degree: string;
  institution: string;
  department?: string;
  duration: string;
  result?: string;
  isCurrent: boolean;
  orderIndex: number;
  createdAt?: string;
  updatedAt?: string;
}

/** Generic API envelopes. */
export interface ApiListResponse<T> {
  success: boolean;
  count: number;
  data: T[];
}

export interface ApiItemResponse<T> {
  success: boolean;
  data: T;
}
