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
    let body = { ...movie };
    const genreId = body.genre._id;
    const { _id, genre, ...updatedBody } = body;
    updatedBody.genreId = genreId;
    // console.log(updatedBody);
    return http.put(movieUrl(movie._id), updatedBody);
  }

  return http.post(url, movie);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
