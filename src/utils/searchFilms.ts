
import type { UserFilm } from "../data/types.ts";

export const searchFilmsByTitle = (
	films: UserFilm[],
	searchTerm: string
): UserFilm[] => {
	return films.filter((film) =>
		film.title.toLowerCase().includes(searchTerm.toLowerCase())
	);
};