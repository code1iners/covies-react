export interface IMovieSimilarsResult {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: string;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface IMovieSimilarsResponse {
  page: number;
  results: IMovieSimilarsResult[];
  total_pages: number;
  total_results: number;
}
