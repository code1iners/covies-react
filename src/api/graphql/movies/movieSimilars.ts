import { gql } from "@apollo/client";

export const QUERY_MOVIE_SIMILARS = gql`
  query movieSimilars($movieId: Int!) {
    movieSimilars(movieId: $movieId) {
      ok
      error {
        code
        message
      }
      data {
        page
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
        total_pages
        total_results
      }
    }
  }
`;
