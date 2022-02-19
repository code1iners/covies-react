import styled from "styled-components";
import { MovieTopRatedProps } from "../../types/movies/movies.topRated";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import SquareButton from "../buttons/SquareButton";
import GradientBackground from "../backgrounds/GradientBackground";

const HomeMain = styled.main`
  width: 100%;
  height: 90vh;
  position: absolute;
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
    z-index: 1000;
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

function HomeMainMovie({ title, overview, poster_path }: MovieTopRatedProps) {
  return (
    <HomeMain>
      {/* Title */}
      <MovieTitle>{title}</MovieTitle>
      {/* Overview */}
      <MovieOverview>{overview}</MovieOverview>

      {/* Footer Container */}
      <MovieFooterContainer>
        <SquareButton icon={faInfoCircle} text="상세 정보" />
      </MovieFooterContainer>

      {/* Background */}
      <MovieImageWrapper>
        {poster_path ? (
          <MovieImage
            src={`${process.env.REACT_APP_TMDB_IMAGE_BASE_NOT_ORIGINAL}/${poster_path}`}
          />
        ) : (
          <GradientBackground />
        )}
      </MovieImageWrapper>
    </HomeMain>
  );
}

export default HomeMainMovie;
