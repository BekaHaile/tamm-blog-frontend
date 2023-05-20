import http from "./baseClient";
import { API_URL } from "../constants";

export const logoutUser = async (): Promise<void> => {
  const response = await http.post(`${API_URL}/auth/logout`, {
    headers: { Accept: "application/json" },
  });

  return response.data;
};
