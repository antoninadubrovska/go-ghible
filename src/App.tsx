import { useState } from "react";

import FilmCard from "./components/FilmCard.tsx";

import type { ApiState, UserFilm } from "./data/types.ts";

import { searchFilmsByTitle } from "./utils/searchFilms.ts";
import { getFilms } from "./api/films.ts";
//1
type View = "all" | "favorites";

const App = () => {

	const [currentView, setCurrentView] = useState<View>("all");

	const [apiState, setApiState] = useState<ApiState>({
		status: "idle",
	});

	const [searchTerm, setSearchTerm] = useState<string>("");

	const [userFilms, setUserFilms] = useState<UserFilm[]>([]);

	const getApiData = async (): Promise<void> => {
		//const url: string = "/api/films";

		try {
			setApiState({ status: "loading" });

			const sortedFilms = await getFilms();

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

	// const visibleFilms: UserFilm[] = searchFilmsByTitle(
	// 	userFilms,
	// 	searchTerm,
	// );


	const filmsForCurrentView: UserFilm[] =
		currentView === "favorites"
			? userFilms.filter((film) => film.favorite)
			: userFilms;

	const visibleFilms: UserFilm[] = searchFilmsByTitle(
		filmsForCurrentView,
		searchTerm,
	);

	return (
		<main>
			<h1>Go Ghibli</h1>
			<button onClick={getApiData}>Hämta filmer</button>
			<p>Status: {apiState.status}</p>
			{apiState.status === "error" && <p>{apiState.message}</p>}
			{apiState.status === "success" && (
				<div>

					<div className="view-navigation">
						<button onClick={() => setCurrentView("all")}>
							All Films
						</button>

						<button onClick={() => setCurrentView("favorites")}>
							Favorites
						</button>
					</div>

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
