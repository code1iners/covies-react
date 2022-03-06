import { gql } from "@apollo/client";
export const QUERY_MOVIE_LATEST_KEY = "movieLatest";
export const QUERY_MOVIE_LATEST = gql`
  query movieLatest {
    movieLatest {
      ok
      error {
        code
        message
      }
      data {
        adult
        backdrop_path
        budges
        genres {
          id
          name
        }
        homepage
        id
        imdb_id
        original_language
        original_title
        overview
        popularity
        poster_path
        production_companies {
          id
          logo_path
          name
          origin_country
        }
        production_countries {
          iso_3166_1
          name
        }
        release_date
        revenue
        runtime
        spoken_languages {
          english_name
          iso_639_1
          name
        }
        status
        tagline
        video
        vote_average
        vote_count
      }
    }
  }
`;
