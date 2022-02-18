import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createBasicLink } from "../hooks/useLink";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createBasicLink({ uri: process.env.REACT_APP_GATE_WAY_URI }),
});
