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

// reviews

export const ReviewSchema = z.object({
	id: z.number(),
	movieId: z.number(),
	score: z.number().min(1).max(5),
	reviewerName: z.string().min(1),
	text: z.string().min(1),
});

export type Review = z.infer<typeof ReviewSchema>;

export const ReviewWithoutIdSchema = ReviewSchema.omit({
	id: true,
});

export type ReviewWithoutId = z.infer<typeof ReviewWithoutIdSchema>;