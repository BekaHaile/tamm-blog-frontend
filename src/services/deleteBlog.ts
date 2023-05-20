import http from "./baseClient";
import { API_URL } from "../constants";
import { Blog } from "../models/blog";

export const deleteBlog = async (id: string): Promise<Blog> => {
  const response = await http.delete(`${API_URL}/blogs/${id}`, {
    headers: { Accept: "application/json" },
  });

  return response.data;
};
