import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  QUERY_MOVIE_TOP_RATED,
  QUERY_MOVIE_TOP_RATED_KEY,
} from "../api/graphql/movies/movieTopRated";
import MovieRetrieveModal from "../components/modals/movies/retrieves/MovieRetrieveModal";
import HomeMainMovie from "../components/movies/HomeMainMovie";
import useMovies from "../hooks/movies/useMovies";
import useRandom from "../hooks/useRandom";
import {
  MovieTopRatedResult,
  MovieTopRatedResponse,
} from "../types/movies/movies.topRated";
import { motion } from "framer-motion";
import HorizontalContents from "../components/home/HorizontalContents";
import { ATOM_MOVIE_SELECTED_ID } from "../atoms/movies/atoms.movies.common";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
`;

// Top rated start.

const TopRatedContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const TopRatedTitle = styled.h3`
  margin: 0 60px;
`;

const TopRatedListWrapper = styled.section`
  width: 100%;
  padding: 0 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
`;

const TopRatedRowWrapper = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
  height: 200px;
  display: flex;
  align-items: center;
`;

const TopRatedRow = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  position: absolute;
  width: 100%;
`;

const TopRatedItemBox = styled(motion.div)`
  transition: 0.2s ease-in-out;
  border-radius: 5px;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  cursor: pointer;
  &:hover {
    /* transform: scale(1.05); */
  }
  &:first-child {
    transform-origin: left;
  }
  &:last-child {
    transform-origin: right;
  }
`;
const TopRatedThumbnail = styled.div<{ imagePath: string | undefined }>`
  height: 130px;
  width: 100%;
  background-image: url(${(props) => props.imagePath});
  background-position: center;
  background-size: cover;
`;

const TopRatedTextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
  padding: 3px;
  margin-top: 5px;
`;
const TopRatedItemTitle = styled.span``;
const TopRatedItemAverage = styled.span``;

const Arrow = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  padding: 6px 12px;
  border: 1px solid gray;
  border-radius: 5px;
  transition: border-color 0.2s ease-in-out;
  z-index: 2;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  &:hover {
    border-color: white;
  }
`;
const PreviousArrow = styled(Arrow)``;
const NextArrow = styled(Arrow)``;

// Variants
const TopRatedRowVariants = {
  invisible: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  },
};
const TopRatedBoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
    y: -10,
    transition: {
      type: "tween",
      delay: 0.5,
      duration: 0,
    },
  },
};

// Top rated end.

function HomePage() {
  const { getRandomly } = useRandom();

  // Data.

  const topRatedResponse = useMovies<MovieTopRatedResponse>({
    key: QUERY_MOVIE_TOP_RATED_KEY,
    query: QUERY_MOVIE_TOP_RATED,
  });

  console.log(topRatedResponse);

  // States.

  const [topRatedMovies, setTopRatedMovies] = useState<MovieTopRatedResponse>();
  const [randomTopRatedMovie, setRandomTopRatedMovie] =
    useState<MovieTopRatedResult>();

  const movieRetrieveModalIsShowing = useRecoilValue(ATOM_MOVIE_SELECTED_ID);

  // Observers.

  useEffect(() => {
    if (topRatedResponse) {
      setTopRatedMovies(topRatedResponse);
      setRandomTopRatedMovie(getRandomly(topRatedResponse.results));
    }
  }, [topRatedResponse]);

  return (
    <Container>
      {/* Home's main content */}
      <HomeMainMovie {...randomTopRatedMovie} />

      {/* Top rated */}
      <HorizontalContents
        title="최고 평점 영화"
        list={topRatedMovies?.results}
      />

      {/* Modals */}
      {movieRetrieveModalIsShowing ? <MovieRetrieveModal /> : null}
    </Container>
  );
}

export default HomePage;
