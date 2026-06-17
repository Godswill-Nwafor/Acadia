const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("acadia_token") : null;

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message ?? "Request failed");
  }

  return res.json();
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export interface LoginPayload   { email: string; password: string }
export interface RegisterPayload { firstName: string; lastName: string; email: string; password: string; role?: string }
export interface AuthResponse   { access_token: string; user: { id: string; email: string; firstName: string; lastName: string; role: string } }

export const auth = {
  login:    (data: LoginPayload)    => request<AuthResponse>("/auth/login",    { method: "POST", body: JSON.stringify(data) }),
  register: (data: RegisterPayload) => request<AuthResponse>("/auth/register", { method: "POST", body: JSON.stringify(data) }),
};

// ── Users ─────────────────────────────────────────────────────────────────────

export const users = {
  me: () => request<AuthResponse["user"]>("/users/me"),
};

// ── Courses ───────────────────────────────────────────────────────────────────

export interface Course {
  id: string; code: string; title: string; units: number;
  lecturer?: { firstName: string; lastName: string };
  department?: { name: string };
}

export const courses = {
  list: () => request<Course[]>("/courses"),
  get:  (id: string) => request<Course>(`/courses/${id}`),
};

// ── Assignments ───────────────────────────────────────────────────────────────

export interface Assignment {
  id: string; title: string; description: string; dueDate: string;
  course?: { code: string; title: string };
}

export const assignments = {
  list: () => request<Assignment[]>("/assignments"),
  get:  (id: string) => request<Assignment>(`/assignments/${id}`),
};

// ── Announcements ─────────────────────────────────────────────────────────────

export interface Announcement {
  id: string; title: string; content: string; createdAt: string;
  author?: { firstName: string; lastName: string };
}

export const announcements = {
  list: () => request<Announcement[]>("/announcements"),
};

// ── Resources ─────────────────────────────────────────────────────────────────

export interface Resource {
  id: string; title: string; type: string; url: string; createdAt: string;
  course?: { code: string; title: string };
}

export const resources = {
  list: () => request<Resource[]>("/resources"),
};

// ── Messages ──────────────────────────────────────────────────────────────────

export interface Message {
  id: string; content: string; createdAt: string;
  sender?: { firstName: string; lastName: string };
}

export const messages = {
  list: (groupId: string) => request<Message[]>(`/messages/${groupId}`),
};

// ── Token helpers ─────────────────────────────────────────────────────────────

export function saveToken(token: string) {
  if (typeof window !== "undefined") localStorage.setItem("acadia_token", token);
}

export function clearToken() {
  if (typeof window !== "undefined") localStorage.removeItem("acadia_token");
}

export function getToken(): string | null {
  return typeof window !== "undefined" ? localStorage.getItem("acadia_token") : null;
}
