
import { useState } from "react";

import FilmCard from "./components/FilmCard.tsx";

import type { ApiState, UserFilm } from "./data/types.ts";
import { FilmsSchema } from "./data/validate.ts";

import { sortFilmsByReleaseDate } from "./utils/sortFilms.ts";
import { searchFilmsByTitle } from "./utils/searchFilms.ts";

const App = () => {
	const [apiState, setApiState] = useState<ApiState>({
		status: "idle",
	});

	const [searchTerm, setSearchTerm] = useState<string>("");

	const [userFilms, setUserFilms] = useState<UserFilm[]>([]);

	const getApiData = async (): Promise<void> => {
		const url: string = "/api/films";

		try {
			setApiState({ status: "loading" });

			const response: Response = await fetch(url);

			if (!response.ok) {
				setApiState({
					status: "error",
					message: "Fel från API. Statuskod: " + response.status,
				});

				return;
			}

			const data: unknown = await response.json();

			console.log("Data from Studio Ghibli API:", data);

			const parsedData = FilmsSchema.parse(data);

			const sortedFilms = sortFilmsByReleaseDate(parsedData);

			const filmsWithFavoriteStatus: UserFilm[] = sortedFilms.map(
				(film) => ({
					...film,
					favorite: false,
				}),
			);

			setUserFilms(filmsWithFavoriteStatus);
			setApiState({ status: "success" });
		} catch (error: unknown) {
			const message: string =
				error instanceof Error ? error.message : "okänt fel.";

			setApiState({
				status: "error",
				message: "Fel vid hämtning av data: " + message,
			});
		}
	};

	const toggleFavorite = (filmId: string): void => {
		setUserFilms((currentFilms) =>
			currentFilms.map((film) =>
				film.id === filmId
					? { ...film, favorite: !film.favorite }
					: film,
			),
		);
	};

	const visibleFilms: UserFilm[] = searchFilmsByTitle(
		userFilms,
		searchTerm,
	);

	return (
		<main>
			<h1>Go Ghibli</h1>

			<button onClick={getApiData}>Hämta filmer</button>

			<p>Status: {apiState.status}</p>

			{apiState.status === "error" && (
				<p>{apiState.message}</p>
			)}

			{apiState.status === "success" && (
				<div>
					<div className="search-container">
						<label htmlFor="search">Search films:</label>

						<input
							id="search"
							type="text"
							placeholder="Enter a film title..."
							value={searchTerm}
							onChange={(event) =>
								setSearchTerm(event.target.value)
							}
						/>
					</div>

					<div className="film-container">
						{visibleFilms.map((film) => (
							<FilmCard
								key={film.id}
								film={film}
								favorite={film.favorite}
								onToggleFavorite={toggleFavorite}
							/>
						))}
					</div>
				</div>
			)}
		</main>
	);
};

export default App;

