import http from "./httpService";
import { toast } from "react-toastify";

const movieEndpoint = "/movies";

export async function getMovies() {
  const { data } = await http.get(movieEndpoint);
  return data;
}

export async function getMovie(id) {
  const { data } = await http.get(`${movieEndpoint}/${id}`);
  return data;
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie }
    delete body._id;
    const { data } = http.put(`${movieEndpoint}/${movie._id}`, body);
    toast.success("Movie has been updated");
    return data;
  }
  const { data } = http.post(movieEndpoint, movie);
  toast.success("Movie has been added");
  return data;
}

export async function deleteMovie(id) {
  const { data } = await http.delete(`${movieEndpoint}/${id}`);
  return data;
}
