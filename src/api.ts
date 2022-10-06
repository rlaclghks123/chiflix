export const API_KEY = "6e95db29c8f6051ed76f375c99c01040";
export const BASE_URL = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}
export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export const getMovies = () => {
  return fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then(
    response => response.json()
  );
};
