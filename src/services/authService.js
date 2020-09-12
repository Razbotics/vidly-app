import http from "./httpService";
import config from "../config/config.json";

const authEndpoint = config.apiEndpoint + "/auth";

export async function login(email, password) {
  return http.post(authEndpoint, { email, password });
}
