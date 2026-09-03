

export type Film = {
    id: string;
	title: string;
	image: string;
    description: string;
    director: string;
    release_date: string;
};

export type UserFilm = Film & {
    favorite: boolean;
};

export type FavoriteFilm = UserFilm & {
    seen: boolean;
    order: number;
};

// 	Film
//  ↓
// Ghibli API information

// UserFilm
//  ↓
// Film + favorite status

// FavoriteFilm
//  ↓
// UserFilm + information needed only
// for the Favorites view


// export type ApiState =
//     | { status: "idle" }
//     | { status: "loading" }
//     | { status: "success"; data: Film[] }
// 	| { status: "error"; message: string };

export type ApiState =
	| { status: "idle" }
	| { status: "loading" }
	| { status: "success" }
	| { status: "error"; message: string };

	export type View = "all" | "favorites";