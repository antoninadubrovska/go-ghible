import { z } from 'zod'

export const FilmSchema = z.object({
    id: z.string(),
    title: z.string(),
    image: z.string(),
    description: z.string(),
    director: z.string(),
    release_date: z.string(),
});