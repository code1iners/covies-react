import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  QUERY_MOVIE_TOP_RATED,
  QUERY_MOVIE_TOP_RATED_KEY,
} from "../api/graphql/movies/movieTopRated";
import { ATOM_MOVIE_RETRIEVE_MODAL_IS_SHOWING } from "../atoms/movies/atoms.movies.modals";
import Loader from "../components/loadings/MovieLoader";
import MovieRetrieveModal from "../components/modals/movies/retrieves/MovieRetrieveModal";
import HomeMainMovie from "../components/movies/HomeMainMovie";
import useMovie from "../hooks/movies/useMovies";
import ErrorMessageModal from "../modals/ErrorMessageModal";
import {
  MovieTopRatedProps,
  MovieTopRatedResponse,
} from "../types/movies/movies.topRated";
import { SimpleResponse } from "../types/shared/shared";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
`;

function HomePage() {
  const movieRetrieveModalIsShowing = useRecoilValue(
    ATOM_MOVIE_RETRIEVE_MODAL_IS_SHOWING
  );

  // Top rated start.
  const [topRated, setTopRated] = useState<MovieTopRatedResponse>();
  const topRatedResponse = useMovie<SimpleResponse<MovieTopRatedResponse>>({
    key: QUERY_MOVIE_TOP_RATED_KEY,
    query: QUERY_MOVIE_TOP_RATED,
  });

  useEffect(() => {
    if (topRatedResponse?.ok) setTopRated(topRatedResponse.data);
  }, [topRatedResponse]);
  // Top rated end.

  return (
    <Container>
      {/* Home's main content */}
      {topRatedResponse?.error ? (
        <ErrorMessageModal message={topRatedResponse?.error.message} />
      ) : topRatedResponse?.ok ? (
        <HomeMainMovie {...topRated?.results[0]} />
      ) : null}

      {movieRetrieveModalIsShowing ? <MovieRetrieveModal /> : null}
    </Container>
  );
}

export default HomePage;
