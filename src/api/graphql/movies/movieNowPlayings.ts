import { gql } from "@apollo/client";

export interface IMovieNowPlayingResult {
  id: number;
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
}

export interface IMovieNowPlayingResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: IMovieNowPlayingResult[];
}

export const QUERY_MOVIE_NOW_PLAYING_KEY = "movieNowPlaying";
export const QUERY_MOVIE_NOW_PLAYING = gql`
  query movieNowPlaying($page: Int, $language: String, $region: String) {
    movieNowPlaying(page: $page, language: $language, region: $region) {
      ok
      error {
        code
        message
      }
      data {
        page
        total_results
        total_pages
        results {
          id
          poster_path
          adult
          overview
          release_date
          genre_ids
        }
      }
    }
  }
`;
