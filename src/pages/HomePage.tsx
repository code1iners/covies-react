import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  QUERY_MOVIE_TOP_RATED,
  QUERY_MOVIE_TOP_RATED_KEY,
} from "../api/graphql/movies/movieTopRated";
import MovieRetrieveModal from "../components/modals/movies/retrieves/MovieRetrieveModal";
import HomeMainMovie from "../components/movies/HomeMainMovie";
import useMovies from "../hooks/movies/useMovies";
import useRandom from "../hooks/useRandom";
import {
  MovieTopRatedResult,
  MovieTopRatedResponse,
} from "../types/movies/movies.topRated";
import HorizontalContents from "../components/home/HorizontalContents";
import { ATOM_MOVIE_SELECTED_ID } from "../atoms/movies/atoms.movies.common";
import {
  IMoviePopularsResponse,
  QUERY_MOVIE_POPULARS,
  QUERY_MOVIE_POPULARS_KEY,
} from "../api/graphql/movies/moviePopulars";
import {
  IMovieUpcomingResponse,
  QUERY_MOVIE_UPCOMING,
  QUERY_MOVIE_UPCOMING_KEY,
} from "../api/graphql/movies/movieUpcomings";
import {
  IMovieNowPlayingResponse,
  QUERY_MOVIE_NOW_PLAYING,
  QUERY_MOVIE_NOW_PLAYING_KEY,
} from "../api/graphql/movies/movieNowPlayings";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
`;

// Top rated end.

function HomePage() {
  const { getRandomly } = useRandom();
  console.log(getRandomly);

  // Data.

  // Movies top rated.
  const topRatedMoviesResponse = useMovies<MovieTopRatedResponse>({
    key: QUERY_MOVIE_TOP_RATED_KEY,
    query: QUERY_MOVIE_TOP_RATED,
  });

  // Movies populars.
  const popularMoviesResponse = useMovies<IMoviePopularsResponse>({
    key: QUERY_MOVIE_POPULARS_KEY,
    query: QUERY_MOVIE_POPULARS,
  });

  // Movies upcomings.
  const upcomingMoviesResponse = useMovies<IMovieUpcomingResponse>({
    key: QUERY_MOVIE_UPCOMING_KEY,
    query: QUERY_MOVIE_UPCOMING,
  });

  // Movies now playings.
  const nowPlayingMoviesResponse = useMovies<IMovieNowPlayingResponse>({
    key: QUERY_MOVIE_NOW_PLAYING_KEY,
    query: QUERY_MOVIE_NOW_PLAYING,
  });

  // console.log(latestResponse);

  // States.

  const [topRatedMovies, setTopRatedMovies] = useState<MovieTopRatedResponse>();
  const [randomTopRatedMovie, setRandomTopRatedMovie] =
    useState<MovieTopRatedResult>();
  const [popularMovies, setPopularMovies] = useState<IMoviePopularsResponse>();
  const [upcomingMovies, setUpcomingMovies] =
    useState<IMovieUpcomingResponse>();
  const [nowPlayingMovies, setNowPlayingMovies] =
    useState<IMovieNowPlayingResponse>();

  const movieRetrieveModalIsShowing = useRecoilValue(ATOM_MOVIE_SELECTED_ID);

  // Observers.

  useEffect(() => {
    if (topRatedMoviesResponse) {
      setTopRatedMovies(topRatedMoviesResponse);
      setRandomTopRatedMovie(getRandomly(topRatedMoviesResponse.results));
    }
  }, [topRatedMoviesResponse, popularMoviesResponse]);

  useEffect(() => {
    if (popularMoviesResponse) {
      setPopularMovies(popularMoviesResponse);
    }
  }, [popularMoviesResponse]);

  useEffect(() => {
    if (upcomingMoviesResponse) {
      setUpcomingMovies(upcomingMoviesResponse);
    }
  }, [upcomingMoviesResponse]);

  useEffect(() => {
    if (nowPlayingMoviesResponse) {
      setNowPlayingMovies(nowPlayingMoviesResponse);
    }
  }, [nowPlayingMoviesResponse]);

  return (
    <Container>
      {/* Home's main content */}
      <HomeMainMovie {...randomTopRatedMovie} />

      {/* Top rated */}
      <HorizontalContents
        title="최고 평점 영화"
        list={topRatedMovies?.results}
      />

      {/* Populars */}
      <HorizontalContents title="인기 영화" list={popularMovies?.results} />

      {/* Upcomings */}
      <HorizontalContents title="개봉 예정작" list={upcomingMovies?.results} />

      {/* Now playings */}
      <HorizontalContents title="상영작" list={nowPlayingMovies?.results} />

      {/* Modals */}
      {movieRetrieveModalIsShowing ? <MovieRetrieveModal /> : null}
    </Container>
  );
}

export default HomePage;
