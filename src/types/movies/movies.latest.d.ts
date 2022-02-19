export interface MovieLatestProps {
  adult: string;
  backdrop_path: string;
  budges: string;
  genres: {
    id: string;
    name: string;
  };
  hompage: string;
  id: string;
  imdb_id: string;
  original_language;
  original_title: string;
  overview: string;
  popularity: string;
  poster_path: string;
  production_companies: {
    id: string;
    logo_path: string;
    name: string;
    origin_count: string;
  };
  production_countries: {
    iso_3166_1: string;
    name: string;
  };
  release_date: string;
  revenue: string;
  runtime: string;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  };
  status: string;
  tagline: string;
  video: string;
  vote_average: string;
  vote_count: string;
}
