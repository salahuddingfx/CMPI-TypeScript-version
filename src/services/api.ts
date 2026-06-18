import axios, { type AxiosAdapter, type AxiosRequestConfig } from "axios";
import { instituteData } from "@/services/mockData";

const isDev = import.meta.env.DEV;

const mockAdapter: AxiosAdapter | undefined = isDev
  ? (config: AxiosRequestConfig) =>
      Promise.resolve({
        data: config.data ?? instituteData,
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      } as never)
  : undefined;

export const api = axios.create({
  baseURL: "/api",
  timeout: 8000,
  ...(mockAdapter && { adapter: mockAdapter }),
});

export async function fetchInstituteData() {
  const response = await api.get("/institute", { data: instituteData });
  return response.data;
}
