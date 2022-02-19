import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  cursor: pointer;
  padding: 7px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  transition: 0.2s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.colors.sexyRed};
    transform: scale(1.1);
  }
`;

const ButtonText = styled.span`
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
  font-size: 0.8rem;
  letter-spacing: 1.2px;
  font-weight: 500;
`;

interface ISquareButtonProps {
  icon: IconProp;
  text: string;
}

/**
 * ### Simple Square button.
 * @param icon FontAwesome icon's prop.
 * @param text Button text.
 * @returns
 */
export default function SquareButton({ icon, text }: ISquareButtonProps) {
  return (
    <ButtonWrapper>
      {/* Button icon */}
      <FontAwesomeIcon
        icon={icon}
        style={{
          marginRight: 10,
        }}
        size="sm"
      />
      {/* Button text */}
      <ButtonText>{text}</ButtonText>
    </ButtonWrapper>
  );
}
