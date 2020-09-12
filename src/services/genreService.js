import http from "./httpService";
import config from "../config/config.json";

export async function getGenres() {
    const {data} =  await http.get(config.apiEndpoint + "/genres");
    return data;
  }