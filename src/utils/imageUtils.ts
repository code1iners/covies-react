/**
 * ### Make movie or tv content image path.
 * @param path {string} Content path.
 * @returns {string} Content image path.
 */
export const makeContentImagePath = (
  path: string | undefined,
  size: "origin" | "w500" = "origin"
): string | undefined => {
  return path
    ? `${
        size === "origin"
          ? process.env.REACT_APP_TMDB_IMAGE_BASE_ORIGINAL
          : process.env.REACT_APP_TMDB_IMAGE_BASE_NOT_ORIGINAL
      }/${path}`
    : undefined;
};
