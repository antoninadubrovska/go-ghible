import FilmCard from "../components/FilmCard.tsx";
import type { UserFilm } from "../data/types.ts";

type FavoritesViewProps = {
	userFilms: UserFilm[];
	onToggleFavorite: (filmId: string) => void;
};

const FavoritesView = ({
	userFilms,
	onToggleFavorite,
}: FavoritesViewProps) => {
	const favoriteFilms: UserFilm[] = userFilms.filter(
		(film) => film.favorite,
	);

	return (
		<div className="film-container">
			{favoriteFilms.map((film) => (
				<FilmCard
					key={film.id}
					film={film}
					favorite={film.favorite}
					onToggleFavorite={onToggleFavorite}
				/>
			))}
		</div>
	);
};

export default FavoritesView;