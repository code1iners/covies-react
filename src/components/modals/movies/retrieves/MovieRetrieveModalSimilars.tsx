import styled from "styled-components";
import { IMovieSimilarsResponse } from "../../../../types/movies/movies.similars";
import { GridListDivThreeColumn } from "../../../../styles/shared/styled.shared";
import ContentCard from "../../../shared/ContentCard";

const MovieSimilarContainer = styled.div`
  padding: 20px;
`;

const ListWrapper = styled(GridListDivThreeColumn)``;

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

      <ListWrapper>
        {similars.results.map((result, index) => (
          <ContentCard
            key={index}
            index={index}
            overview={result.overview}
            title={result.title}
            posterPath={result.poster_path}
            releaseDate={result.release_date}
            voteAverage={result.vote_average}
          />
        ))}
      </ListWrapper>
    </MovieSimilarContainer>
  );
}
