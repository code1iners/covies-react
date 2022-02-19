// useRandom start.
export interface IUseRandomResult {
  useGradient: () => IUseGradientResult;
}
// useRandom end.

// useGradient start.

export interface IUseGradientResult {
  colors: {
    to: string;
    from: string;
  };
  direction: GradientDirection;
}

export type GradientDirection = "left" | "right" | "top" | "bottom";

// useGradient end.
