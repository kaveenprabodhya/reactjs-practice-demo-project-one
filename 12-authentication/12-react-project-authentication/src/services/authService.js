import http from "./httpService";
import { apiEndpoint } from "../config.json";

const url = apiEndpoint + "/auth";

export function login(email, password) {
  return http.post(url, { email, password });
}
