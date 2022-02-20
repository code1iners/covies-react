export interface IMovieVideosResult {
  id: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  iso_639_1: string;
  iso_3166_1: string;
  published_at: string;
}

export interface IMovieVideosResponse {
  id: number;
  results: IMovieVideosResult[];
}
