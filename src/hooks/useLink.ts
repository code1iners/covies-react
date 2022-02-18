import { CreateLinkProp, LinkUri } from "../types/useLink";
import { ApolloLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";

/**
 * ### Create upload link by uri.
 * @param uri Backend endpoint uri.
 * @returns Upload link.
 */
export const createUploadLinkByUri = (uri: LinkUri): ApolloLink => {
  return createUploadLink({
    uri,
  });
};

/**
 * ### Create apollo client basic error link.
 * @returns Error link.
 */
export const createErrorLink = (): ApolloLink => {
  return onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.error("[graphQLErrors]", graphQLErrors);
    }

    if (networkError) {
      console.error("[networkError]", networkError);
    }
  });
};

/**
 * ### Create context link.
 * @returns Context link.
 */
export const createContextLink = (): ApolloLink => {
  return setContext((_, context) => {
    return {
      headers: {
        ...context?.headers,
      },
    };
  });
};

export const createBasicLink = ({ uri }: CreateLinkProp): ApolloLink => {
  // Upload link (related to file).
  const uploadLink = createUploadLinkByUri(uri);

  // Error link.
  const errorLink = createErrorLink();

  // Authorization link.
  const authLink = createContextLink();

  return authLink.concat(errorLink).concat(uploadLink);
};
