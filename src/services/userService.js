import http from "./httpService";
import config from "../config/config.json";

const userEndpoint = config.apiEndpoint + "/users";

export async function register(user) {
  return await http.post(userEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
