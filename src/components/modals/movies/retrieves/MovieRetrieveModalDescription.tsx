import {
  faCalendar,
  faHourglass,
  faStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import { IMovieCreditsCast } from "../../../../types/movies/movies.credits";
import { IMovieDetailResult } from "../../../../types/movies/movies.detail";

const MovieDescriptionContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px;
  grid-gap: 30px;
  cursor: default;
`;

const MovieDescriptionLeftWrapper = styled.div`
  flex: 0.6;
  display: flex;
  flex-direction: column;
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
  transition: 0.2s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.colors.sexyRed};
    transform: scale(1.1);
  }
`;

const MovieDescriptionOverview = styled.span`
  font-weight: lighter;
  font-size: 0.9rem;
`;

const MovieDescriptionRightWrapper = styled.div`
  flex: 0.4;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-gap: 10px;
`;
const MovieDescriptionTextWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  grid-gap: 10px;
`;

const MovieDescriptionLabel = styled.label`
  font-weight: lighter;
  font-size: 0.8rem;
  white-space: nowrap;
`;

const MovieDescriptionText = styled.span`
  list-style: none;
  font-size: 0.8rem;
  font-weight: lighter;
`;

const MovieDescriptionCastMore = styled.span`
  font-size: 0.8rem;
  margin-left: 4;
  font-weight: normal;
  cursor: pointer;
`;

interface IMovieRetrieveModalDescriptionProps {
  casts: IMovieCreditsCast[];
  movie: IMovieDetailResult;
}

export default function MovieRetrieveModalDescription({
  casts,
  movie,
}: IMovieRetrieveModalDescriptionProps) {
  const [more, setMore] = useState(false);

  const getCastNamesWithCount = (count: number) => {
    const converted = casts.map((cast) => cast.name);
    const slicedList = converted?.slice(
      0,
      count === 0 ? converted.length : count
    );
    const result = slicedList?.join(", ");
    return result;
  };

  const getGenreNames = () => {
    const converted = movie.genres.map((genre) => genre.name);
    const result = converted?.join(", ");
    return result;
  };

  return (
    <MovieDescriptionContainer>
      {/* Left side wrapper */}
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
        <MovieDescriptionOverview>{movie?.overview}</MovieDescriptionOverview>
      </MovieDescriptionLeftWrapper>

      {/* Right side wrapper */}
      <MovieDescriptionRightWrapper>
        {/* Cast */}
        <MovieDescriptionTextWrapper>
          <MovieDescriptionLabel>출연 :</MovieDescriptionLabel>
          <MovieDescriptionText>
            {more ? (
              <>
                {getCastNamesWithCount(0)}
                <MovieDescriptionCastMore
                  onClick={() => setMore((previous) => !previous)}
                >
                  {" "}
                  숨기기
                </MovieDescriptionCastMore>
              </>
            ) : (
              <>
                {getCastNamesWithCount(10)}
                <MovieDescriptionCastMore
                  onClick={() => setMore((previous) => !previous)}
                >
                  {" "}
                  더 보기
                </MovieDescriptionCastMore>
              </>
            )}
          </MovieDescriptionText>
        </MovieDescriptionTextWrapper>
        {/* Genres */}
        <MovieDescriptionTextWrapper>
          <MovieDescriptionLabel>장르 :</MovieDescriptionLabel>
          <MovieDescriptionText>{getGenreNames()}</MovieDescriptionText>
        </MovieDescriptionTextWrapper>
      </MovieDescriptionRightWrapper>
    </MovieDescriptionContainer>
  );
}
