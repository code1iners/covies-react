import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import styled from "styled-components";
import { IMovieSimilarsResponse } from "../../../../types/movies/movies.similars";

const MovieSimilarContainer = styled.div`
  padding: 20px;
`;
const MovieSimilarListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  margin-top: 20px;
`;

const MovieSimilarItemWrapper = styled(motion.div)`
  border-radius: 2px;
  overflow: hidden;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  opacity: 0;
  &:hover {
    transform: scale(1.025);
  }
`;

const MovieSimilarThumbnailWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MovieSimilarThumbnail = styled.img`
  width: 100%;
  height: 130px;
  object-fit: cover;
`;
const MovieSimilarVoteAverage = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 0.7rem;
  z-index: 21;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 3px 6px;
  border-radius: 10px;
  letter-spacing: 1.5px;
  transition: 0.2s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.colors.sexyRed};
    transform: scale(1.1);
  }
`;

const MovieSimilarContentWrapper = styled.div`
  margin: 10px;
`;
const MovieSimilarHeader = styled.header`
  display: flex;
  align-items: center;
  grid-gap: 10px;
  justify-content: space-between;
  margin-bottom: 5px;
`;
const MovieSimilarTitle = styled.span`
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const MovieSimilarDate = styled.span`
  font-size: 0.7rem;
  font-weight: lighter;
`;

const MovieSimilarOverview = styled.p`
  height: 50px;
  font-size: 0.7rem;
  font-weight: lighter;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface IMovieRetrieveModalSimilarsProps {
  similars: IMovieSimilarsResponse;
}

export default function MovieRetrieveModalSimilars({
  similars,
}: IMovieRetrieveModalSimilarsProps) {
  return (
    <MovieSimilarContainer>
      <header>
        <h3>비슷한 콘텐츠</h3>
      </header>

      <MovieSimilarListWrapper>
        {similars.results.map((result, index) => (
          <MovieSimilarItemWrapper
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                delay: index * 0.1,
              },
            }}
          >
            <MovieSimilarThumbnailWrapper>
              <MovieSimilarThumbnail
                src={`${process.env.REACT_APP_TMDB_IMAGE_BASE_ORIGINAL}/${result.poster_path}`}
              />
              <MovieSimilarVoteAverage>
                <FontAwesomeIcon icon={faStar} style={{ marginRight: 5 }} />
                {result.vote_average.toFixed(1)}
              </MovieSimilarVoteAverage>
            </MovieSimilarThumbnailWrapper>

            <MovieSimilarContentWrapper>
              <MovieSimilarHeader>
                <MovieSimilarTitle>{result.title}</MovieSimilarTitle>
                <MovieSimilarDate>
                  {result.release_date.slice(0, 4)}
                </MovieSimilarDate>
              </MovieSimilarHeader>
              <MovieSimilarOverview>{result.overview}</MovieSimilarOverview>
            </MovieSimilarContentWrapper>
          </MovieSimilarItemWrapper>
        ))}
      </MovieSimilarListWrapper>
    </MovieSimilarContainer>
  );
}
