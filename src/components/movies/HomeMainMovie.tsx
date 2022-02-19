import styled from "styled-components";
import { MovieTopRatedProps } from "../../types/movies/movies.topRated";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

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

const SquareButton = styled.div`
  cursor: pointer;
  padding: 7px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  transition: 0.2s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.colors.sexyRed};
    transform: scale(1.1);
  }
`;

const ButtonText = styled.span`
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
  font-size: 0.8rem;
  letter-spacing: 1.2px;
  font-weight: 500;
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

const GradientBackground = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  background: #141e30; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #243b55,
    #141e30
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #243b55,
    #141e30
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

function HomeMainMovie({ title, overview, poster_path }: MovieTopRatedProps) {
  return (
    <HomeMain>
      <MovieTitle>{title}</MovieTitle>
      <MovieOverview>{overview}</MovieOverview>

      <MovieFooterContainer>
        <SquareButton>
          {/* Button icon */}
          <FontAwesomeIcon
            icon={faInfoCircle}
            style={{
              marginRight: 10,
            }}
            size="sm"
          />
          {/* Button text */}
          <ButtonText>상세 정보</ButtonText>
        </SquareButton>
      </MovieFooterContainer>

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
