import http from "./baseClient";
import { API_URL } from "../constants";
import { Blog } from "../models/blog";

export const updateBlog = async (data: Blog): Promise<Blog> => {
  const response = await http.put(`${API_URL}/blogs`, data, {
    headers: { Accept: "application/json" },
  });

  return response.data;
};
