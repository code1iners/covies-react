import { useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";

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
  const { loading, error, data } = useQuery(query, {
    ...(variables && { variables }),
  });

  if (loading && !data) return null;

  // There is an error?
  if (error) {
    console.error("[useMovies]", error);
    return null;
  }

  // Return response data.
  return data[key].data;
}
