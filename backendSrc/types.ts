import * as z from "zod";

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  year: z.number(),
  image: z.string(),
});

export type Movie = z.infer<typeof MovieSchema>;