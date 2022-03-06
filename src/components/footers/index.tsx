import styled from "styled-components";

const Container = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  margin-bottom: 20px;
  letter-spacing: 1.2px;
  font-weight: 200;
  font-size: 0.8rem;
  cursor: default;
  color: rgba(255, 255, 255, 0.5);

  h3 {
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 1.2rem;
    transition: 0.2s ease-in-out;
    &:hover {
      color: ${(props) => props.theme.colors.sexyRed};
    }
  }
`;

const Line = styled.div`
  width: 95%;
  height: 1px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin: 0 auto;
`;

const Footer = () => {
  return (
    <>
      <Line />
      <Container>
        <Row>
          <h3>Covies</h3>
        </Row>
        <Row>Copyright © 2022 Covies, Built with Codeliners.</Row>
      </Container>
    </>
  );
};

export default Footer;
