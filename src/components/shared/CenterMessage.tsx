import styled from "styled-components";

const CenterMessageWrapper = styled.div`
  width: 100%;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
`;
const CenterMessageText = styled.span`
  transition: 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
    color: ${(props) => props.theme.colors.sexyRed};
  }
`;

interface ICenterMessageProps {
  text?: string;
}

export default function CenterMessage({ text }: ICenterMessageProps) {
  return (
    <CenterMessageWrapper>
      <CenterMessageText>{text ? text : "Error"}</CenterMessageText>
    </CenterMessageWrapper>
  );
}
