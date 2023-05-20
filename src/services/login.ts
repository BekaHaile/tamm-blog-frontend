import http from "./baseClient";
import { API_URL } from "../constants";
import { User } from "../models/user";

export const loginUser = async (userInput: any): Promise<User> => {
  const response = await http.post(`${API_URL}/auth/login`, userInput, {
    headers: { Accept: "application/json" },
  });

  return response.data;
};
