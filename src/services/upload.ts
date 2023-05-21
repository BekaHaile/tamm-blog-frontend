import http from "./baseClient";
import { API_URL } from "../constants";

export const uploadFile = async (data: FormData): Promise<string> => {
  const response = await http.post(`${API_URL}/blogs/upload`, data, {
    headers: { Accept: "application/json" },
  });

  return response.data;
};
