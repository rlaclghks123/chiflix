export const API_KEY = "6e95db29c8f6051ed76f375c99c01040";
export const BASE_URL = "https://api.themoviedb.org/3";

export const getMovies = () => {
  return fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then(
    response => response.json()
  );
};
