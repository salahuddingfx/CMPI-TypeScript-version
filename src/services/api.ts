import axios, { type AxiosRequestConfig } from "axios";
import { instituteData } from "@/services/mockData";

const isDev = import.meta.env.DEV;

const mockAdapter = isDev
  ? {
      handle(config: AxiosRequestConfig) {
        return Promise.resolve({
          data: config.data ?? instituteData,
          status: 200,
          statusText: "OK",
          headers: {},
          config,
        });
      },
    }
  : undefined;

export const api = axios.create({
  baseURL: "/api",
  timeout: 8000,
  ...(mockAdapter && { adapter: mockAdapter.handle }),
});

export async function fetchInstituteData() {
  const response = await api.get("/institute", { data: instituteData });
  return response.data;
}
