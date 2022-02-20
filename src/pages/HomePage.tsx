import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  QUERY_MOVIE_TOP_RATED,
  QUERY_MOVIE_TOP_RATED_KEY,
} from "../api/graphql/movies/movieTopRated";
import { ATOM_MOVIE_RETRIEVE_MODAL_IS_SHOWING } from "../atoms/movies/atoms.movies.modals";
import MovieRetrieveModal from "../components/modals/movies/retrieves/MovieRetrieveModal";
import HomeMainMovie from "../components/movies/HomeMainMovie";
import useMovie from "../hooks/movies/useMovies";
import useRandom from "../hooks/useRandom";
import ErrorMessageModal from "../modals/ErrorMessageModal";
import {
  MovieTopRatedResult,
  MovieTopRatedResponse,
} from "../types/movies/movies.topRated";
import { SimpleResponse } from "../types/shared/shared";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
`;

function HomePage() {
  const { getRandomly } = useRandom();

  const movieRetrieveModalIsShowing = useRecoilValue(
    ATOM_MOVIE_RETRIEVE_MODAL_IS_SHOWING
  );

  // Top rated start.
  const [topRatedData, setTopRatedData] = useState<MovieTopRatedResponse>();
  const [randomlyTopRatedData, setRandomlyTopRatedData] =
    useState<MovieTopRatedResult>();
  const topRatedResponse = useMovie<SimpleResponse<MovieTopRatedResponse>>({
    key: QUERY_MOVIE_TOP_RATED_KEY,
    query: QUERY_MOVIE_TOP_RATED,
  });

  useEffect(() => {
    if (topRatedResponse?.ok) {
      setTopRatedData(topRatedResponse.data);
      setRandomlyTopRatedData(getRandomly(topRatedResponse.data!.results));
    }
  }, [topRatedResponse]);

  // Top rated end.

  return (
    <Container>
      {/* Head */}

      {/* Home's main content */}
      {topRatedResponse?.error ? (
        <ErrorMessageModal message={topRatedResponse?.error.message} />
      ) : topRatedResponse?.ok ? (
        <HomeMainMovie {...randomlyTopRatedData} />
      ) : null}

      {movieRetrieveModalIsShowing ? <MovieRetrieveModal /> : null}
    </Container>
  );
}

export default HomePage;
