import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { QUERY_COVIE_HELLO } from "../api/graphql/shared";

const Container = styled.div`
  height: 200vh;
`;

function HomePage() {
  console.log(process.env.REACT_APP_GATE_WAY_URI);

  const { loading, error, data } = useQuery(QUERY_COVIE_HELLO);
  console.log(data);

  return <Container>Home</Container>;
}

export default HomePage;
