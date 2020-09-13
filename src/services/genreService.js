import http from "./httpService";

export async function getGenres() {
    const {data} =  await http.get("/genres");
    return data;
  }