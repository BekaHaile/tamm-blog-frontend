import http from "./baseClient";
import { API_URL } from "../constants";
import { Blog } from "../models/blog";

interface CreateRequest {
  title: string;
  content: string;
  author: string;
  img: string;
  desc: string;
  date: string;
  userImg: string;
}

export const createNewBlog = async (data: CreateRequest): Promise<Blog> => {
  const response = await http.post(`${API_URL}/blogs`, data, {
    headers: { Accept: "application/json" },
  });

  return response.data;
};
