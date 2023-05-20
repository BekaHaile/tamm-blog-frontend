import http from "./baseClient";
import { API_URL } from "../constants";
import { Blog } from "../models/blog";

export const getBlogs = async (): Promise<Blog[]> => {
  const response = await http.get(`${API_URL}/blogs`, {
    headers: { Accept: "application/json" },
  });

  return response.data;
};
