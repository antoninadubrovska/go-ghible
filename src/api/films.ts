import type { Film } from "../data/types.ts";
import { FilmsSchema } from "../data/validate.ts";
import { sortFilmsByReleaseDate } from "../utils/sortFilms.ts";

export const getFilms = async (): Promise<Film[]> => {
	const url: string = "/api/films";

	const response: Response = await fetch(url);

	if (!response.ok) {
		throw new Error(
			"Fel från API. Statuskod: " + response.status,
		);
	}

	const data: unknown = await response.json();

	console.log("Data from Studio Ghibli API:", data);

	const parsedData = FilmsSchema.parse(data);

	const sortedFilms = sortFilmsByReleaseDate(parsedData);

	// App.tsx needs to receive the films
	return sortedFilms;
};