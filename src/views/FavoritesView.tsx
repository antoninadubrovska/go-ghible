import { useState } from "react";
import FilmCard from "../components/FilmCard.tsx";
import type { UserFilm } from "../data/types.ts";
import { searchFilmsByTitle } from "../utils/searchFilms.ts";
import SearchBar from "../components/SearchBar.tsx";

type FavoritesViewProps = {
	userFilms: UserFilm[];
	onToggleFavorite: (filmId: string) => void;
};

const FavoritesView = ({ userFilms, onToggleFavorite }: FavoritesViewProps) => {
	const favoriteFilms: UserFilm[] = userFilms.filter((film) => film.favorite);

	const [searchTerm, setSearchTerm] = useState<string>("");

	const favoriteFilmsToShow: UserFilm[] = searchFilmsByTitle(
		favoriteFilms,
		searchTerm,
	);

	return (
		<div>
			{favoriteFilms.length > 2 && (
				<SearchBar
					searchTerm={searchTerm}
					onSearchChange={setSearchTerm}
				/>
			)}
			<div className="film-container">
				{favoriteFilmsToShow.map((film) => (
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

export default FavoritesView;
