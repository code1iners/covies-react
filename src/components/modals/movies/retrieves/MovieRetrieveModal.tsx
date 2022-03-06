import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { QUERY_MOVIE_DETAIL } from "../../../../api/graphql/movies/movieDetail";
import { ATOM_MOVIE_SELECTED_ID } from "../../../../atoms/movies/atoms.movies.common";
import { ATOM_MOVIE_RETRIEVE_MODAL_IS_SHOWING } from "../../../../atoms/movies/atoms.movies.modals";
import useMovies from "../../../../hooks/movies/useMovies";
import { IMovieDetailResult } from "../../../../types/movies/movies.detail";
import { SimpleResponse } from "../../../../types/shared/shared";
import CircleCloseButton from "../../../buttons/CircleCloseButton";
import MovieLoader from "../../../loadings/MovieLoader";
import { QUERY_MOVIE_CREDITS } from "../../../../api/graphql/movies/movieCredits";
import { IMovieCreditsResponse } from "../../../../types/movies/movies.credits";
import MovieRetrieveModalThumbnail from "./MovieRetrieveModalThumbnail";
import MovieRetrieveModalDescription from "./MovieRetrieveModalDescription";
import { IMovieSimilarsResponse } from "../../../../types/movies/movies.similars";
import { QUERY_MOVIE_SIMILARS } from "../../../../api/graphql/movies/movieSimilars";
import { AnimatePresence, motion } from "framer-motion";
import MovieRetrieveModalSimilars from "./MovieRetrieveModalSimilars";
import { QUERY_MOVIE_RECOMMENDATIONS } from "../../../../api/graphql/movies/movieRecommendations";
import MovieRetrieveModalRecommendations from "./MovieRetrieveModalRecommendations";

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const Container = styled(motion.div)`
  position: absolute;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  width: 70%;
  height: 90%;
  border-radius: 10px;
  overflow: hidden;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

// Variants.
const ContainerVariants = {
  idle: {
    scale: 0.3,
    rotateZ: 30,
  },
  in: {
    scale: 1,
    rotateZ: 0,
  },
  out: {},
};

export default function MovieRetrieveModal() {
  // Recoils.
  const setMovieRetrieveModalIsShowing = useSetRecoilState(
    ATOM_MOVIE_RETRIEVE_MODAL_IS_SHOWING
  );
  const [movieSelectedId, setMovieSelectedId] = useRecoilState(
    ATOM_MOVIE_SELECTED_ID
  );

  // States.
  const [movie, setMovie] = useState<IMovieDetailResult>();
  const [credits, setCredits] = useState<IMovieCreditsResponse>();
  const [similars, setSimilars] = useState<IMovieSimilarsResponse>();
  const [recommendations, setRecommendations] =
    useState<IMovieRecommendationsResponse>();

  /**
   * ### Close movie retrieve modal.
   */
  const onCloseClick = () => closeModal();

  /**
   * ### Close movie retrieve modal when overlay clicked.
   */
  const onOverlayClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  /**
   * ### Close current modal.
   */
  const closeModal = () => {
    setMovieRetrieveModalIsShowing(false);
    setMovieSelectedId(undefined);
  };

  // Movie start.

  const movieResponse = useMovies<IMovieDetailResult>({
    key: "movieDetail",
    query: QUERY_MOVIE_DETAIL,
    variables: { movieId: Number(movieSelectedId) },
  });

  useEffect(() => {
    if (movieResponse) {
      setMovie(movieResponse);
      console.log("movie", movieResponse);
    }
  }, [movieResponse]);

  // Movie end.

  // Credits start.

  const creditsResponse = useMovies<IMovieCreditsResponse>({
    key: "movieCredits",
    query: QUERY_MOVIE_CREDITS,
    variables: { movieId: Number(movieSelectedId) },
  });

  useEffect(() => {
    if (creditsResponse) {
      setCredits(creditsResponse);
      console.log("credits", creditsResponse);
    }
  }, [creditsResponse]);

  // Credits end.

  // Similar start.

  const similarsResponse = useMovies<IMovieSimilarsResponse>({
    key: "movieSimilars",
    query: QUERY_MOVIE_SIMILARS,
    variables: { movieId: Number(movieSelectedId) },
  });

  useEffect(() => {
    if (similarsResponse) {
      setSimilars(similarsResponse);
    }
  }, [similarsResponse]);

  // Similar end.

  // Recommendations start.

  const recommendationsResponse = useMovies<IMovieRecommendationsResponse>({
    key: "movieRecommendations",
    query: QUERY_MOVIE_RECOMMENDATIONS,
    variables: { movieId: Number(movieSelectedId) },
  });

  useEffect(() => {
    if (recommendationsResponse) {
      setRecommendations(recommendationsResponse);
      console.log("recommendations", recommendationsResponse);
    }
  }, [recommendationsResponse]);

  // Recommendations end.

  // Observers.
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <Overlay onClick={onOverlayClick}>
      <AnimatePresence>
        <Container
          layoutId={movieSelectedId + ""}
          variants={ContainerVariants}
          initial="idle"
          animate="in"
        >
          {/* Close button */}
          <CircleCloseButton onCloseClick={onCloseClick} />

          {/* Movie thumbnail */}
          {movie ? (
            <MovieRetrieveModalThumbnail
              title={movie.title}
              posterPath={movie.backdrop_path}
            />
          ) : (
            <MovieLoader />
          )}

          {/* Description */}
          {movie && credits ? (
            <MovieRetrieveModalDescription movie={movie} casts={credits.cast} />
          ) : (
            <MovieLoader />
          )}

          {/* Similars */}
          {similars ? (
            <MovieRetrieveModalSimilars similars={similars} />
          ) : (
            <MovieLoader />
          )}

          {/* Recommendations */}
          {recommendations ? (
            <MovieRetrieveModalRecommendations
              recommendations={recommendations.results}
            />
          ) : (
            <MovieLoader />
          )}
        </Container>
      </AnimatePresence>
    </Overlay>
  );
}
