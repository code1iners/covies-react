import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 999;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  cursor: pointer;
`;

interface ICircleCloseButtonProps {
  onCloseClick: () => void;
}

export default function CircleCloseButton({
  onCloseClick,
}: ICircleCloseButtonProps) {
  return (
    <Container onClick={onCloseClick}>
      <FontAwesomeIcon icon={faClose} size="lg" />
    </Container>
  );
}
