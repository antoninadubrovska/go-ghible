import type { Film } from "../data/types.ts";

export const searchFilmsByTitle = (
    films: Film[],
    searchTerm: string
): Film[] => {
    return films.filter((film) =>
        film.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
};