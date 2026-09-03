import { useState } from "react";

import FilmCard from "../components/FilmCard.tsx";
import type { UserFilm } from "../data/types.ts";
import { searchFilmsByTitle } from "../utils/searchFilms.ts";

type AllFilmsViewProps = {
	userFilms: UserFilm[];
	onToggleFavorite: (filmId: string) => void;
};

const AllFilmsView = ({
	userFilms,
	onToggleFavorite,
}: AllFilmsViewProps) => {
	const [searchTerm, setSearchTerm] = useState<string>("");

	const visibleFilms: UserFilm[] = searchFilmsByTitle(
		userFilms,
		searchTerm,
	);

	return (
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
						onToggleFavorite={onToggleFavorite}
					/>
				))}
			</div>
		</div>
	);
};

export default AllFilmsView;