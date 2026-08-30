import type { Film } from "../data/types.ts";

export const sortFilmsByReleaseDate = (films: Film[]): Film[] => {
    return [...films].sort(
        (a, b) => Number(b.release_date) - Number(a.release_date)
    );
};