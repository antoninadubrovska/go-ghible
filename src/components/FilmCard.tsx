import type { Film } from "../data/types.ts";

type FilmCardProps = {
	film: Film;
	favorite: boolean;
	onToggleFavorite: (filmId: string) => void;
};

const FilmCard = ({ film, favorite, onToggleFavorite }: FilmCardProps) => {
	return (
		<article className="film-card">
			<h2>{film.title}</h2>

			<img src={film.image} alt={film.title} />



			<p>{film.description}</p>

			<p>Director: {film.director}</p>

			<p>Release year: {film.release_date}</p>

			<button onClick={() => onToggleFavorite(film.id)}>
				{favorite ? "★ Favorite" : "☆ Add to favorites"}
			</button>
			
		</article>
	);
};

export default FilmCard;
