import { useState } from "react";

import type { ApiState, UserFilm, View } from "./data/types.ts";

import { getFilms } from "./api/films.ts";

import AllFilmsView from "./views/AllFilmsView.tsx";
import FavoritesView from "./views/FavoritesView.tsx";
import ViewNavigation from "./components/ViewNavigation.tsx";
import { createUserFilms } from "./utils/createUserFilms.ts";



const App = () => {
	const [currentView, setCurrentView] = useState<View>("all");

	const [apiState, setApiState] = useState<ApiState>({
		status: "idle",
	});

	const [userFilms, setUserFilms] = useState<UserFilm[]>([]);

	const getApiData = async (): Promise<void> => {
		try {
			setApiState({ status: "loading" });

			const films = await getFilms();
			const userFilms = createUserFilms(films);

			setUserFilms(userFilms);
			setApiState({ status: "success" });
		} catch (error: unknown) {
			const message =
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


	return (
		<main>

			<h1>Go Ghibli</h1>
			<button onClick={getApiData}>Hämta filmer</button>

			<p>Status: {apiState.status}</p>
			{apiState.status === "error" && <p>{apiState.message}</p>}
			{apiState.status === "success" && (
				<>

					<ViewNavigation
						currentView={currentView}
						onViewChange={setCurrentView}
					/>
					{currentView === "all" && (
						<AllFilmsView
							userFilms={userFilms}
							onToggleFavorite={toggleFavorite}
						/>
					)}
					{currentView === "favorites" && (
						<FavoritesView
							userFilms={userFilms}
							onToggleFavorite={toggleFavorite}
						/>
					)}
				</>
			)}
		</main>
	);
};

export default App;
