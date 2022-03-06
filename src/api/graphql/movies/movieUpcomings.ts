import { gql } from "@apollo/client";

export interface IMovieUpcomingResult {
  id: number;
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
}

export interface IMovieUpcomingResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: IMovieUpcomingResult[];
}

export const QUERY_MOVIE_UPCOMING_KEY = "movieUpcomings";
export const QUERY_MOVIE_UPCOMING = gql`
  query movieUpcomings($page: Int, $language: String, $region: String) {
    movieUpcomings(page: $page, language: $language, region: $region) {
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
