import { z } from 'zod'

export const FilmSchema = z.object({
    id: z.string(),
    title: z.string(),
	image: z.string(),
	// // checking Status: error
	// image: z.number(),
    description: z.string(),
    director: z.string(),
    release_date: z.string(),
});

export const FilmsSchema = z.array(FilmSchema);