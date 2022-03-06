import styled from "styled-components";
import { GridListDivThreeColumn } from "../../../../styles/shared/styled.shared";
import ContentCard from "../../../shared/ContentCard";

const ContentWrapper = styled(GridListDivThreeColumn)``;

interface IMovieRetrieveModalRecommendationsProps {
  recommendations: IMovieRecommendationsResult[];
}

export default function MovieRetrieveModalRecommendations({
  recommendations,
}: IMovieRetrieveModalRecommendationsProps) {
  return (
    <div style={{ padding: 20 }}>
      <header>
        <h3>추천 콘텐츠</h3>
      </header>

      <ContentWrapper>
        {recommendations.map((recommendation, index) => (
          <ContentCard
            key={index}
            index={index}
            id={recommendation.id}
            overview={recommendation.overview}
            title={recommendation.title}
            posterPath={recommendation.poster_path}
            releaseDate={recommendation.release_date}
            voteAverage={recommendation.vote_average}
          />
        ))}
      </ContentWrapper>
    </div>
  );
}
