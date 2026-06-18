import axios, { type AxiosAdapter } from "axios";
import { instituteData } from "@/services/mockData";

const mockAdapter: AxiosAdapter = (config) =>
  Promise.resolve({
    data: config.data ?? instituteData,
    status: 200,
    statusText: "OK",
    headers: {},
    config,
  });

export const api = axios.create({
  baseURL: "/api",
  timeout: 8000,
  adapter: mockAdapter,
});

export async function fetchInstituteData() {
  const response = await api.get("/institute", { data: instituteData });
  return response.data;
}
