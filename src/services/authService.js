import http from "./httpService";
import config from "../config/config.json";
import jwtDecode from "jwt-decode";

const authEndpoint = config.apiEndpoint + "/auth";
const tokenKey = "token";

async function login(email, password) {
  const { data: jwt } = await http.post(authEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
};
