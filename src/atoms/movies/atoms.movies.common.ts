import { atom } from "recoil";

/**
 * ### Movie retrieve modal
 */
export const ATOM_MOVIE_SELECTED_ID = atom<number | undefined>({
  key: "ATOM_MOVIE_SELECTED_ID",
  default: undefined,
});
