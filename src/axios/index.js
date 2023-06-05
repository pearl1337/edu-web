import axios from "axios";
import { ReadStorage } from "@/api/Storage";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URl,
});

instance.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${ReadStorage("token")}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default instance;
