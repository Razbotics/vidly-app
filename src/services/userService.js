import http from "./httpService";

const userEndpoint = "/users";

export async function register(user) {
  return await http.post(userEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
