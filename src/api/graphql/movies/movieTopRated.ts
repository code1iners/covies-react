import { gql } from "@apollo/client";

export const QUERY_MOVIE_TOP_RATED_KEY: string = "movieTopRated";
export const QUERY_MOVIE_TOP_RATED = gql`
  query movieTopRated($page: Int, $language: String, $region: String) {
    movieTopRated(page: $page, language: $language, region: $region) {
      ok
      error {
        code
        message
      }
      data {
        page
        results {
          poster_path
          adult
          overview
          release_date
          genre_ids
          id
          original_title
          original_language
          title
          backdrop_path
          popularity
          vote_count
          video
          vote_average
        }
        total_results
        total_pages
      }
    }
  }
`;
