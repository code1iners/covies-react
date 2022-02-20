import { gql } from "@apollo/client";

export const QUERY_MOVIE_RECOMMENDATIONS = gql`
  query movieRecommendations($movieId: Int!) {
    movieRecommendations(movieId: $movieId) {
      ok
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
