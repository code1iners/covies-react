import { gql } from "@apollo/client";
export const QUERY_MOVIE_CREDITS = gql`
  query movieCredits($movieId: Int!, $language: String) {
    movieCredits(movieId: $movieId, language: $language) {
      ok
      error {
        code
        message
      }
      data {
        id
        cast {
          id
          adult
          gender
          known_for_department
          name
          original_name
        }
      }
    }
  }
`;
