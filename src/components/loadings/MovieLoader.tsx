import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)``;

const boxVariants = {
  stop: {},
  start: {},
};

function MovieLoader() {
  return (
    <Container>
      <Box
        variants={boxVariants}
        initial={{
          scale: 0.5,
        }}
        animate={{
          scale: 1,
          transition: {
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.3,
          },
        }}
      >
        <FontAwesomeIcon icon={faFilm} size="3x" />
      </Box>
    </Container>
  );
}

export default MovieLoader;
