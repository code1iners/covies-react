import {
  GradientDirection,
  IUseRandomResult,
  IUseGradientResult,
} from "./useRandom.d";
import { gradients } from "../../styles/themes";

export const gradientDirections: GradientDirection[] = [
  "left",
  "right",
  "top",
  "bottom",
];

export default function useRandom(): IUseRandomResult {
  /**
   * ### Get randomly gradient color set.
   * @returns Color object (to, from).
   */
  const useGradient = (): IUseGradientResult => {
    // Select random gradient colors.
    const selectedGradientIndex = Math.floor(
      Math.random() * Object.keys(gradients).length
    );
    const selectedGradient = Object.values(gradients)[selectedGradientIndex];

    // Select random direction.
    const selectedDirectionIndex = Math.floor(
      Math.random() * gradientDirections.length
    );
    const selectedDirection = gradientDirections[selectedDirectionIndex];

    return {
      colors: selectedGradient,
      direction: selectedDirection,
    };
  };

  return {
    useGradient,
  };
}
