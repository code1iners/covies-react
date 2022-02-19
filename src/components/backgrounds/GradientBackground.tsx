import styled from "styled-components";
import useRandom from "../../hooks/useRandom";

const Background = styled.div<IBackgroundProps>`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  background: ${(props) => props.to}; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to ${(props) => props.direction},
    ${(props) => props.to},
    ${(props) => props.from}
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to ${(props) => props.direction},
    ${(props) => props.to},
    ${(props) => props.from}
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

interface IBackgroundProps {
  to?: string;
  from?: string;
  direction?: "left" | "right" | "top" | "bottom";
}

interface IGradientBackgroundProps extends IBackgroundProps {
  isRandomly?: boolean;
}

export default function GradientBackground({
  to: defaultTo = "#243b55",
  from: defaultFrom = "#141e30",
  direction: defaultDirection = "left",
  isRandomly = true,
}: IGradientBackgroundProps) {
  const { useGradient } = useRandom();
  const {
    colors: { to: toColor, from: fromColor },
    direction: randomDirection,
  } = useGradient();

  // Use randomly?
  if (isRandomly) {
    return (
      <Background to={toColor} from={fromColor} direction={randomDirection} />
    );
  }

  return (
    <Background
      to={defaultTo}
      from={defaultFrom}
      direction={defaultDirection}
    />
  );
}
