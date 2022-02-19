export interface IMovieCreditsCast {
  id;
  adult;
  gender;
  known_for_department;
  name;
  original_name;
}

export interface IMovieCreditsResponse {
  id: Int;
  cast: IMovieCreditsCast[];
}
