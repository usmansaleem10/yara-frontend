import axios from "axios";
import { BASE_URL } from "@/config/constants.js";
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers["Content-Type"] = "application/json";

export const patch = (url, body) => {
  return axios.patch(url, JSON.stringify(body));
};

export const post = (url, body) => {
  return axios.post(url, body);
};

export const put = (url, body = {}) => {
  return axios.put(url, body);
};

export const get = (url, params = {}) => {
  return axios.get(url, params);
};

export const deleteObject = (url) => {
  return axios.delete(url);
};
