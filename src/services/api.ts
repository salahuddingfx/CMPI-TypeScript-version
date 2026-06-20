import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("cmpi-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("cmpi-token");
      localStorage.removeItem("cmpi-user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export async function fetchInstituteData() {
  const response = await api.get("/institute");
  return response.data;
}

export async function login(email: string, password: string) {
  const response = await api.post("/login", { email, password });
  return response.data;
}

export async function register(data: Record<string, any>) {
  const response = await api.post("/register", data);
  return response.data;
}

export async function logout() {
  await api.post("/logout");
  localStorage.removeItem("cmpi-token");
  localStorage.removeItem("cmpi-user");
}

export async function getDashboard() {
  const response = await api.get("/dashboard");
  return response.data;
}

export async function getStudentCourses() {
  const response = await api.get("/dashboard/courses");
  return response.data;
}

export async function getStudentResults() {
  const response = await api.get("/dashboard/results");
  return response.data;
}

export async function getStudentBills() {
  const response = await api.get("/dashboard/bills");
  return response.data;
}

export async function getStudentEmails() {
  const response = await api.get("/dashboard/emails");
  return response.data;
}

export async function getEmailBody(id: string) {
  const response = await api.get(`/dashboard/emails/${id}/body`);
  return response.data;
}

export async function getNotices() {
  const response = await api.get("/notices");
  return response.data;
}

export async function getNotice(id: string) {
  const response = await api.get(`/notices/${id}`);
  return response.data;
}

export async function getEvents() {
  const response = await api.get("/events");
  return response.data;
}

export async function getEvent(id: string) {
  const response = await api.get(`/events/${id}`);
  return response.data;
}

export async function getBlogs() {
  const response = await api.get("/blogs");
  return response.data;
}

export async function getBlogBySlug(slug: string) {
  const response = await api.get(`/blogs/${slug}`);
  return response.data;
}

export async function getDepartments() {
  const response = await api.get("/departments");
  return response.data;
}

export async function getDepartmentBySlug(slug: string) {
  const response = await api.get(`/departments/${slug}`);
  return response.data;
}

export async function getFaculty() {
  const response = await api.get("/faculty");
  return response.data;
}

export async function searchAll(query: string) {
  const response = await api.get("/search", { params: { q: query } });
  return response.data;
}

export async function submitAdmission(data: Record<string, string>) {
  const response = await api.post("/admissions", data);
  return response.data;
}

export async function getFeedbacks() {
  const response = await api.get("/feedbacks");
  return response.data;
}

export async function submitFeedback(data: { title: string; category: string; description: string }) {
  const response = await api.post("/feedbacks", data);
  return response.data;
}

export async function upvoteFeedback(id: number) {
  const response = await api.post(`/feedbacks/${id}/upvote`);
  return response.data;
}

export async function fetchSocialLinks() {
  const response = await api.get("/social-links");
  return response.data;
}
