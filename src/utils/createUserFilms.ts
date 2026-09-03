import type { Film, UserFilm } from "../data/types.ts";

export const createUserFilms = (films: Film[]): UserFilm[] => {
	return films.map((film) => ({
		...film,
		favorite: false,
	}));
};