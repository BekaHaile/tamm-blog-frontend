import http from "./baseClient";
import { API_URL } from "../constants";
import { Blog } from "../models/blog";

export const updateBlog = async (data: Blog, id: string): Promise<Blog> => {
  const response = await http.put(`${API_URL}/blogs/${id}`, data, {
    headers: { Accept: "application/json" },
    withCredentials: true,
  });

  return response.data;
};
