import http from "./baseClient";
import { API_URL } from "../constants";

export const signupUser = async (userInput: any): Promise<string> => {
  const response = await http.post(`${API_URL}/auth/signup`, userInput, {
    headers: { Accept: "application/json" },
  });

  return response.data;
};
