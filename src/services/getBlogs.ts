import http from "./baseClient";
import { API_URL, LIMIT } from "../constants";
import { Blog } from "../models/blog";

export const getBlogs = async (offset: number): Promise<Blog[]> => {
  const response = await http.get(
    `${API_URL}/blogs?offset=${offset}&limit=${LIMIT}`,
    {
      headers: { Accept: "application/json" },
    }
  );

  return response.data;
};
