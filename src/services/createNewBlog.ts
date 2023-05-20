import http from "./baseClient";
import { API_URL } from "../constants";
import { Blog } from "../models/blog";

interface CreateRequest {
  title: string;
  content: string;
  img?: string;
}

export const createNewBlog = async (data: CreateRequest): Promise<Blog> => {
  const response = await http.post(`${API_URL}/blogs`, data, {
    headers: { Accept: "application/json" },
    withCredentials: true,
  });

  return response.data;
};
