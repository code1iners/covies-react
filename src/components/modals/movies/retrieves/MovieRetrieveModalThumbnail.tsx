import styled from "styled-components";

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

interface IMovieRetrieveModalThumbnailProps {
  title: string;
  posterPath: string;
}

export default function MovieRetrieveModalThumbnail({
  title,
  posterPath,
}: IMovieRetrieveModalThumbnailProps) {
  return (
    <MovieThumbnailContainer>
      <MovieThumbnailImage
        src={`${process.env.REACT_APP_TMDB_IMAGE_BASE_ORIGINAL}/${posterPath}`}
      />
      <MovieThumbnailTitle>{title}</MovieThumbnailTitle>
    </MovieThumbnailContainer>
  );
}
