import http from "./httpService";
import config from "../config/config.json";
import { toast } from "react-toastify";

const movieEndpoint = config.apiEndpoint + "/movies";

export async function getMovies() {
  const { data } = await http.get(movieEndpoint);
  return data;
}

export async function getMovie(id) {
  const { data } = await http.get(`${movieEndpoint}/${id}`);
  return data;
}

export async function saveMovie(movie) {
  const id = movie.id;
  delete movie["id"];

  if (id === "new") {
    const { data } = http.post(movieEndpoint, movie);
    toast.success("Movie has been added");
    return data;
  }
  console.log(movie);
  const { data } = http.put(`${movieEndpoint}/${id}`, movie);
  toast.success("Movie has been updated");
  return data;
}

export async function deleteMovie(id) {
  const { data } = await http.delete(`${movieEndpoint}/${id}`);
  return data;
}
