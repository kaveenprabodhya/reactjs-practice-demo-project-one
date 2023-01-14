import http from "./httpService";
import { apiEndpoint } from "../config.json";

const url = apiEndpoint + "/users";

/* function userUrl(id) {
  return `${url}/${id}`;
} */

export function register(user) {
  return http.post(url, {
    email: user.usermail,
    password: user.password,
    name: user.username,
  });
}
