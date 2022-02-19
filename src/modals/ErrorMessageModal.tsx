import { motion } from "framer-motion";
import styled from "styled-components";

const Overlay = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorMessage = styled(motion.span)`
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: transform 0.5s ease, color 0.5s ease;
  cursor: default;
  &:hover {
    color: ${(props) => props.theme.colors.sexyRed};
    transform: scale(1.25);
  }
`;

interface ErrorMessageModalProps {
  message: string | undefined;
}

function ErrorMessageModal({ message }: ErrorMessageModalProps) {
  return (
    <Overlay>
      <ErrorMessage>{message}</ErrorMessage>
    </Overlay>
  );
}

export default ErrorMessageModal;
