import FilmCard from "./components/FilmCard.tsx";

import { useState } from "react";
import type { ApiState } from "./data/types.ts";
import { FilmsSchema } from "./data/validate.ts";

import { sortFilmsByReleaseDate } from "./utils/sortFilms.ts";
import { searchFilmsByTitle } from "./utils/searchFilms.ts";

const App = () => {
	const [apiState, setApiState] = useState<ApiState>({
		status: "idle",
	});

	// search state
	const [searchTerm, setSearchTerm] = useState<string>("");

	const getApiData = async (): Promise<void> => {
		//const baseUrl: string = "https://ghibliapi.vercel.app";
		//const url: string = `${baseUrl}/films`;
		const url: string = "/api/films";

		try {
			setApiState({ status: "loading" });

			const response: Response = await fetch(url);

			if (response.ok) {
				const data: unknown = await response.json();

				// const parsedData: Film[] = data as Film[]; //temporary solution instead of zod

				const parsedData = FilmsSchema.parse(data);

				// setApiState({
				// 	status: "success",
				// 	data: parsedData,
				// });

				const sortedFilms = sortFilmsByReleaseDate(parsedData);

				setApiState({
					status: "success",
					data: sortedFilms,
				});

				console.log("Data from Studio Ghibli API:", data);
			} else {
				setApiState({
					status: "error",
					message: "Fel från API. Statuskod: " + response.status,
				});
			}
		} catch (error: unknown) {
			const message: string =
				error instanceof Error ? error.message : "okänt fel.";

			setApiState({
				status: "error",
				message: "Fel vid hämtning av data: " + message,
			});
		}
	};

	return (
		<main>
			<h1>Go Ghibli</h1>
			<button onClick={getApiData}>Hämta filmer</button>

			<p>Status: {apiState.status}</p>
			{apiState.status === "error" && <p>{apiState.message}</p>}
			{/* Film cards */}
			{/* {apiState.status === "success" && (
				<div>
					{apiState.data.map((film) => (
						<FilmCard key={film.id} film={film} />
					))}
				</div>
			)} */}

			{apiState.status === "success" && (
				<div>
					{/* search input */}
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

					{searchFilmsByTitle(apiState.data, searchTerm).map(
						(film) => (
							<FilmCard key={film.id} film={film} />
						),
					)}


					</div>

				</div>
			)}
		</main>
	);
};

export default App;
