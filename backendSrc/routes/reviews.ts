import { Router } from "express";
import * as z from "zod";

import { reviews } from "../data/reviews.js";
import { ReviewSchema } from "../types.js";

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

export default router;