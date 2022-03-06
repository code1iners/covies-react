import { gql } from "@apollo/client";

export interface IMoviePopularsResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: IMoviePopularsResult[];
}

export interface IMoviePopularsResult {
  id: number;
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export const QUERY_MOVIE_POPULARS_KEY = "moviePopulars";
export const QUERY_MOVIE_POPULARS = gql`
  query moviePopulars($page: Int, $language: String, $region: String) {
    moviePopulars(page: $page, language: $language, region: $region) {
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
          original_title
          original_language
          title
          backdrop_path
          popularity
          vote_count
          video
          vote_average
        }
      }
    }
  }
`;
