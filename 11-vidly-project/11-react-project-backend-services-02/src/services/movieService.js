import http from "./httpService";
import { apiEndpoint } from "../config.json";

const url = apiEndpoint + "/movies";

export function getMovies() {
  return http.get(url);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

function movieUrl(id) {
  return `${url}/${id}`;
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }

  return http.post(url, movie);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
