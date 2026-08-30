import type { Film } from "../data/types.ts";

type FilmCardProps = {
    film: Film;
};

const FilmCard = ({ film }: FilmCardProps) => {
    return (
        <article>
            <h2>{film.title}</h2>

            <img
                src={film.image}
                alt={film.title}
            />

            <p>{film.description}</p>

            <p>
                Director: {film.director}
            </p>

            <p>
                Release year: {film.release_date}
            </p>
        </article>
    );
};

export default FilmCard;