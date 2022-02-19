import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCalendar,
  faHourglass,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { QUERY_MOVIE_DETAIL } from "../../../api/graphql/movies/movieDetail";
import { ATOM_MOVIE_SELECTED_ID } from "../../../atoms/movies/atoms.movies.common";
import { ATOM_MOVIE_RETRIEVE_MODAL_IS_SHOWING } from "../../../atoms/movies/atoms.movies.modals";
import useMovies from "../../../hooks/movies/useMovies";
import { IMovieDetailResponse } from "../../../types/movies/movies.detail";
import { SimpleResponse } from "../../../types/shared/shared";
import CircleCloseButton from "../../buttons/CircleCloseButton";
import MovieLoader from "../../loadings/MovieLoader";
import { QUERY_MOVIE_CREDITS } from "../../../api/graphql/movies/movieCredits";
import { IMovieCreditsResponse } from "../../../types/movies/movies.credits";

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
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

const MovieThumbnailContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 80vh;
  padding: 20px;
  ::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(
      to top,
      ${(props) => props.theme.colors.backgroundColor},
      transparent
    );
    z-index: 2;
  }
`;
const MovieThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const MovieThumbnailTitle = styled.h1`
  position: relative;
  z-index: 2;
  font-size: 2rem;
  letter-spacing: 2px;
  transform: translateY(100px);
  cursor: default;
`;

const MovieDescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
`;

const MovieDescriptionLeftWrapper = styled.div`
  flex: 0.6;
  display: flex;
  flex-direction: column;
  cursor: default;
`;

const MovieDescriptionTagContainer = styled.ul`
  display: flex;
  align-items: center;
  grid-gap: 10px;
  margin-bottom: 20px;
`;
const MovieDescriptionTag = styled.li`
  list-style: none;
  font-size: 0.9rem;
`;
const MovieDescriptionMessage = styled.span``;
const MovieDescriptionOverview = styled.span``;

const MovieDescriptionRightWrapper = styled.div`
  flex: 0.4;
  background-color: gold;
`;

export default function MovieRetrieveModal() {
  const setMovieRetrieveModalIsShowing = useSetRecoilState(
    ATOM_MOVIE_RETRIEVE_MODAL_IS_SHOWING
  );
  const [movieSelectedId, setMovieSelectedId] = useRecoilState(
    ATOM_MOVIE_SELECTED_ID
  );
  const [movie, setMovie] = useState<IMovieDetailResponse>();
  const [credits, setCredits] = useState<IMovieCreditsResponse>();

  const movieResponse = useMovies<SimpleResponse<IMovieDetailResponse>>({
    key: "movieDetail",
    query: QUERY_MOVIE_DETAIL,
    variables: { movieId: Number(movieSelectedId) },
  });

  useEffect(() => {
    if (movieResponse?.ok) {
      setMovie(movieResponse.data);
    }
  }, [movieResponse]);

  console.log("movie", movie);

  // TODO : Genres, credits

  const creditsResponse = useMovies<SimpleResponse<IMovieCreditsResponse>>({
    key: "movieCredits",
    query: QUERY_MOVIE_CREDITS,
    variables: { movieId: Number(movieSelectedId) },
  });

  useEffect(() => {
    if (creditsResponse?.ok) {
      setCredits(creditsResponse.data);
    }
  }, [creditsResponse]);

  console.log("credits", credits);

  /**
   * ### Close movie retrieve modal.
   */
  const onCloseClick = () => {
    setMovieRetrieveModalIsShowing(false);
    setMovieSelectedId(undefined);
  };

  return (
    <Overlay>
      <Container>
        {/* Close button */}
        <CircleCloseButton onCloseClick={onCloseClick} />

        {/* Movie thumbnail */}
        {movie ? (
          <MovieThumbnailContainer>
            <MovieThumbnailImage
              src={`${process.env.REACT_APP_TMDB_IMAGE_BASE_ORIGINAL}/${movie.poster_path}`}
            />
            <MovieThumbnailTitle>{movie.title}</MovieThumbnailTitle>
          </MovieThumbnailContainer>
        ) : (
          <MovieLoader />
        )}

        {/* Description */}
        <MovieDescriptionContainer>
          <MovieDescriptionLeftWrapper>
            {/* Tags */}
            <MovieDescriptionTagContainer>
              {/* Year */}
              <MovieDescriptionTag>
                <FontAwesomeIcon
                  icon={faCalendar}
                  size="sm"
                  style={{ marginRight: 5 }}
                />
                {movie?.release_date.slice(0, 4)}
              </MovieDescriptionTag>
              {/* Review average */}
              <MovieDescriptionTag>
                <FontAwesomeIcon
                  icon={faStar}
                  size="sm"
                  style={{ marginRight: 5 }}
                />
                {movie?.vote_average}
              </MovieDescriptionTag>
              {/* Review count */}
              <MovieDescriptionTag>
                <FontAwesomeIcon
                  icon={faUsers}
                  size="sm"
                  style={{ marginRight: 5 }}
                />
                {movie?.vote_count}
              </MovieDescriptionTag>
              {/* Run time */}
              <MovieDescriptionTag>
                <FontAwesomeIcon
                  icon={faHourglass}
                  size="sm"
                  style={{ marginRight: 5 }}
                />
                {movie?.runtime}m
              </MovieDescriptionTag>
            </MovieDescriptionTagContainer>
            {/* Message */}

            {/* Overview */}
            <MovieDescriptionOverview>
              {movie?.overview}
            </MovieDescriptionOverview>
          </MovieDescriptionLeftWrapper>
          <MovieDescriptionRightWrapper></MovieDescriptionRightWrapper>
        </MovieDescriptionContainer>
      </Container>
    </Overlay>
  );
}
