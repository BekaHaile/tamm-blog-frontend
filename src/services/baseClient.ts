import axios from "axios";
const axiosInstance = axios;

axiosInstance.defaults.headers.common = {
  "Access-Control-Allow-Origin": "*",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  delete: axiosInstance.delete,
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
};