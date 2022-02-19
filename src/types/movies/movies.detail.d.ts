export interface IMovieDetailGenreProps {
  id: number;
  name: string;
}

export interface IMovieDetailProductionCompany {
  id;
  logoPath;
  name;
  originCountry;
}

export interface IMovieDetailProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface IMovieDetailSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface IMovieDetailResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  genres: IMovieDetailGenreProps[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IMovieDetailProductionCompany[];
  production_countries: IMovieDetailProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: IMovieDetailSpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
