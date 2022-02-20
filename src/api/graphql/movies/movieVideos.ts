import { gql } from "@apollo/client";

export const QUERY_MOVIE_VIDEOS = gql`
  query movieVideos($movieId: Int!) {
    movieVideos(movieId: $movieId) {
      ok
      data {
        id
        results {
          id
          name
          key
          site
          size
          type
          official
          iso_639_1
          iso_3166_1
          published_at
        }
      }
    }
  }
`;
