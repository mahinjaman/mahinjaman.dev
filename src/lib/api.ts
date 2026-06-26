import axios, { AxiosError } from "axios";
import type {
  ApiItemResponse,
  ApiListResponse,
  IBlog,
  IEducation,
  IExperience,
  IProject,
} from "../types";

/**
 * Base URL of the backend API. Configure in `.env`:
 *   VITE_API_URL=http://localhost:5000/api
 */
export const API_BASE_URL: string =
  (import.meta.env.VITE_API_URL as string | undefined) ??
  "http://localhost:5000/api";

const TOKEN_KEY = "mahin_admin_token";

export const tokenStore = {
  get: (): string | null => localStorage.getItem(TOKEN_KEY),
  set: (token: string): void => localStorage.setItem(TOKEN_KEY, token),
  clear: (): void => localStorage.removeItem(TOKEN_KEY),
};

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach the Bearer token (if present) to every request.
api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) {
    // `headers` is always an AxiosHeaders instance on outgoing requests.
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On 401, drop the stale token so guards can redirect to login.
api.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      tokenStore.clear();
    }
    return Promise.reject(error);
  }
);

/** Normalizes an axios error into a human-readable message. */
export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { message?: string; errors?: string[] }
      | undefined;
    if (data?.errors?.length) return data.errors.join(", ");
    if (data?.message) return data.message;
    return error.message;
  }
  return error instanceof Error ? error.message : "Unexpected error";
};

/* -------------------------------------------------------------------------- */
/*  Typed endpoint helpers                                                     */
/* -------------------------------------------------------------------------- */

export interface AuthResponse {
  success: boolean;
  token: string;
  user: { email: string; role: string };
}

export const authApi = {
  login: (email: string, password: string) =>
    api
      .post<AuthResponse>("/auth/login", { email, password })
      .then((r) => r.data),
  me: () =>
    api
      .get<{ success: boolean; user: { email: string; role: string } }>(
        "/auth/me"
      )
      .then((r) => r.data),
};

export const experienceApi = {
  getAll: () =>
    api.get<ApiListResponse<IExperience>>("/experiences").then((r) => r.data.data),
  create: (payload: Partial<IExperience>) =>
    api
      .post<ApiItemResponse<IExperience>>("/experiences", payload)
      .then((r) => r.data.data),
  update: (id: string, payload: Partial<IExperience>) =>
    api
      .put<ApiItemResponse<IExperience>>(`/experiences/${id}`, payload)
      .then((r) => r.data.data),
  remove: (id: string) => api.delete(`/experiences/${id}`).then((r) => r.data),
};

export const projectApi = {
  getAll: () =>
    api.get<ApiListResponse<IProject>>("/projects").then((r) => r.data.data),
  create: (payload: Partial<IProject>) =>
    api
      .post<ApiItemResponse<IProject>>("/projects", payload)
      .then((r) => r.data.data),
  update: (id: string, payload: Partial<IProject>) =>
    api
      .put<ApiItemResponse<IProject>>(`/projects/${id}`, payload)
      .then((r) => r.data.data),
  remove: (id: string) => api.delete(`/projects/${id}`).then((r) => r.data),
};

export const educationApi = {
  getAll: () =>
    api.get<ApiListResponse<IEducation>>("/education").then((r) => r.data.data),
  create: (payload: Partial<IEducation>) =>
    api
      .post<ApiItemResponse<IEducation>>("/education", payload)
      .then((r) => r.data.data),
  update: (id: string, payload: Partial<IEducation>) =>
    api
      .put<ApiItemResponse<IEducation>>(`/education/${id}`, payload)
      .then((r) => r.data.data),
  remove: (id: string) => api.delete(`/education/${id}`).then((r) => r.data),
};

export const blogApi = {
  getAll: () =>
    api.get<ApiListResponse<IBlog>>("/blogs").then((r) => r.data.data),
  getByIdOrSlug: (idOrSlug: string) =>
    api
      .get<ApiItemResponse<IBlog>>(`/blogs/${idOrSlug}`)
      .then((r) => r.data.data),
  create: (payload: Partial<IBlog>) =>
    api.post<ApiItemResponse<IBlog>>("/blogs", payload).then((r) => r.data.data),
  update: (id: string, payload: Partial<IBlog>) =>
    api
      .put<ApiItemResponse<IBlog>>(`/blogs/${id}`, payload)
      .then((r) => r.data.data),
  remove: (id: string) => api.delete(`/blogs/${id}`).then((r) => r.data),
};
