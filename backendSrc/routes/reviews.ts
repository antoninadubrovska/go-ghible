import { Router } from "express";
import * as z from "zod";

import { reviews } from "../data/reviews.js";
import { movies } from "../data/movies.js";
import { ReviewSchema } from "../types.js";
import {
	ReviewWithoutIdSchema,
	type ReviewWithoutId,
} from "../types.js";

const router = Router();

// GET /api/reviews
router.get("/", (req, res): void => {
	res.status(200).send(reviews);
});

// GET /api/reviews/:id
router.get("/:id", (req, res): void => {
	const idString: string = req.params.id;
	const id: number = Number(idString);

	if (Number.isNaN(id)) {
		res.sendStatus(400);
		return;
	}

	const review = reviews.find((review) => review.id === id);

	if (review === undefined) {
		res.sendStatus(404);
		return;
	}

	res.status(200).send(review);
});

// POST /api/reviews
router.post("/", (req, res): void => {
	let review: ReviewWithoutId;

	try {
		review = z.parse(ReviewWithoutIdSchema.strict(), req.body);
	} catch (error) {
		res.status(400).send({
			message: "Felaktigt review-objekt",
		});
		return;
	}

	const movieExists: boolean = movies.some(
		(movie) => movie.id === review.movieId,
	);

	if (!movieExists) {
		res.status(400).send({
			message: "Det finns ingen movie med detta id.",
		});
		return;
	}

	const newId: number =
		reviews.length > 0
			? Math.max(...reviews.map((review) => review.id)) + 1
			: 1;

	reviews.push({
		...review,
		id: newId,
	});

	res.sendStatus(201);
});

export default router;