import styled from "styled-components";
import { MovieTopRatedResult } from "../../types/movies/movies.topRated";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import SquareButton from "../buttons/SquareButton";
import GradientBackground from "../backgrounds/GradientBackground";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ATOM_MOVIE_RETRIEVE_MODAL_IS_SHOWING } from "../../atoms/movies/atoms.movies.modals";
import { ATOM_MOVIE_SELECTED_ID } from "../../atoms/movies/atoms.movies.common";
import { makeContentImagePath } from "../../utils/imageUtils";

const HomeMain = styled.main`
  width: 100%;
  height: 90vh;
  position: relative;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 100px;
  &::before {
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
    z-index: 0;
  }
`;

const MovieTitle = styled.h1`
  letter-spacing: 2px;
  z-index: 2;
`;
const MovieOverview = styled.p`
  margin-top: 10px;
  letter-spacing: 1.2px;
  z-index: 2;
`;

const MovieFooterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const MovieImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  z-index: -1;
`;

const MovieImage = styled.img`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.4;
`;

function HomeMainMovie({
  title,
  overview,
  poster_path,
  id,
}: MovieTopRatedResult) {
  const [movieRetrieveModalIsShowing, setMovieRetrieveModalIsShowing] =
    useRecoilState(ATOM_MOVIE_RETRIEVE_MODAL_IS_SHOWING);
  const setMovieSelectedId = useSetRecoilState(ATOM_MOVIE_SELECTED_ID);

  const onRetrieveClick = () => {
    console.log(id);

    setMovieRetrieveModalIsShowing(true);
    setMovieSelectedId(id);
  };

  return (
    <HomeMain>
      {/* Title */}
      <MovieTitle>{title}</MovieTitle>
      {/* Overview */}
      <MovieOverview>{overview}</MovieOverview>

      {/* Footer Container */}
      <MovieFooterContainer>
        <SquareButton
          icon={faInfoCircle}
          text="상세 정보"
          onClick={onRetrieveClick}
        />
      </MovieFooterContainer>

      {/* Background */}
      <MovieImageWrapper>
        {poster_path ? (
          <MovieImage src={makeContentImagePath(poster_path)} />
        ) : (
          <GradientBackground />
        )}
      </MovieImageWrapper>
    </HomeMain>
  );
}

export default HomeMainMovie;
