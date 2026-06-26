import axios, { type AxiosRequestConfig } from "axios";
import type { IBlog, IEducation, IExperience, IProject } from "../types";
import { API_BASE_URL, tokenStore } from "../lib/api";

/**
 * Dedicated data-access layer for the Admin Dashboard.
 *
 * Every mutating request (POST / PUT / DELETE) explicitly injects the JWT as a
 * Bearer token. GET requests are public on the backend, so they are sent
 * without auth. A single axios instance is used for a consistent base URL.
 */

export type ResourceType = "experience" | "project" | "blog" | "education";

/** Maps a resource type to its REST collection path. */
const RESOURCE_PATHS: Record<ResourceType, string> = {
  experience: "/experiences",
  project: "/projects",
  blog: "/blogs",
  education: "/education",
};

/** Strongly-typed payloads accepted when creating/updating each resource. */
export interface ResourcePayloadMap {
  experience: Partial<IExperience>;
  project: Partial<IProject>;
  blog: Partial<IBlog>;
  education: Partial<IEducation>;
}

/** The hydrated entity returned for each resource type. */
export interface ResourceEntityMap {
  experience: IExperience;
  project: IProject;
  blog: IBlog;
  education: IEducation;
}

/** Aggregated payload returned by {@link fetchDashboardData}. */
export interface DashboardData {
  experiences: IExperience[];
  projects: IProject[];
  blogs: IBlog[];
  educations: IEducation[];
}

interface ApiListResponse<T> {
  success: boolean;
  count: number;
  data: T[];
}

interface ApiItemResponse<T> {
  success: boolean;
  data: T;
}

interface ApiDeleteResponse {
  success: boolean;
  message: string;
  data: { id: string };
}

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

/**
 * Builds the Authorization config baked into every write request.
 * Centralized so the Bearer header is impossible to forget.
 */
const authConfig = (): AxiosRequestConfig => {
  const token = tokenStore.get();
  return {
    headers: {
      Authorization: `Bearer ${token ?? ""}`,
    },
  };
};

/* -------------------------------------------------------------------------- */
/*  Reads                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Fetches every resource collection in parallel for the dashboard tables.
 */
export const fetchDashboardData = async (): Promise<DashboardData> => {
  const [experiences, projects, blogs, educations] = await Promise.all([
    client
      .get<ApiListResponse<IExperience>>(RESOURCE_PATHS.experience)
      .then((r) => r.data.data),
    client
      .get<ApiListResponse<IProject>>(RESOURCE_PATHS.project)
      .then((r) => r.data.data),
    client
      .get<ApiListResponse<IBlog>>(RESOURCE_PATHS.blog)
      .then((r) => r.data.data),
    client
      .get<ApiListResponse<IEducation>>(RESOURCE_PATHS.education)
      .then((r) => r.data.data),
  ]);

  return { experiences, projects, blogs, educations };
};

/* -------------------------------------------------------------------------- */
/*  Mutations (JWT Bearer injected)                                            */
/* -------------------------------------------------------------------------- */

/**
 * Creates a resource of the given type. The return type is narrowed to the
 * matching entity via the generic `T`.
 */
export const createResource = async <T extends ResourceType>(
  type: T,
  data: ResourcePayloadMap[T]
): Promise<ResourceEntityMap[T]> => {
  const res = await client.post<ApiItemResponse<ResourceEntityMap[T]>>(
    RESOURCE_PATHS[type],
    data,
    authConfig()
  );
  return res.data.data;
};

/**
 * Updates an existing resource by id.
 */
export const updateResource = async <T extends ResourceType>(
  type: T,
  id: string,
  data: ResourcePayloadMap[T]
): Promise<ResourceEntityMap[T]> => {
  const res = await client.put<ApiItemResponse<ResourceEntityMap[T]>>(
    `${RESOURCE_PATHS[type]}/${id}`,
    data,
    authConfig()
  );
  return res.data.data;
};

/**
 * Deletes a resource by id.
 */
export const deleteResource = async (
  type: ResourceType,
  id: string
): Promise<ApiDeleteResponse> => {
  const res = await client.delete<ApiDeleteResponse>(
    `${RESOURCE_PATHS[type]}/${id}`,
    authConfig()
  );
  return res.data;
};

/** Normalizes an axios/unknown error into a readable message for the UI. */
export const getDashboardError = (error: unknown): string => {
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
