import * as z from "zod";

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  year: z.number(),
  image: z.string(),
});

export type Movie = z.infer<typeof MovieSchema>;

export const MovieWithoutIdSchema = MovieSchema.omit({
	id: true,
});

export type MovieWithoutId = z.infer<typeof MovieWithoutIdSchema>;