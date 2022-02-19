import { useEffect } from "react";
import { QueryResult, useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import { QUERY_MOVIE_TOP_RATED } from "../../api/graphql/movies/movieTopRated";

interface UseMovieProps {
  key: string;
  query: DocumentNode;
  variables?: any;
}

export default function useMovies<T>({
  key,
  query,
  variables,
}: UseMovieProps): T | null {
  const {
    loading: responseLoading,
    error: responseError,
    data: responseData,
  } = useQuery(query, {
    ...(variables && { variables }),
  });

  if (!responseData) return null;

  // There is an error?
  if (responseError) {
    console.error("[useMovies]", responseError);
    return null;
  }

  // Return response data.
  return responseData[key];
}
