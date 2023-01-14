import http from "./httpService";
import { apiEndpoint } from "../config.json";
import jwidecode from "jwt-decode";

const url = apiEndpoint + "/auth";
const token = "token";

http.setJwt(getJWT());

export async function login(email, password) {
  const { data: jwt } = await http.post(url, { email, password });
  localStorage.setItem(token, jwt);
}

export function loginWithJWT(jwt) {
  localStorage.setItem(token, jwt);
}

export function logout() {
  localStorage.removeItem(token);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(token);
    return jwidecode(jwt);
  } catch (ex) {}
}

export function getJWT() {
  return localStorage.getItem(token);
}
