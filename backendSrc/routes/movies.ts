import { Router } from "express";
import * as z from "zod";
// TODO
import { movies } from "../data/movies.js";
import { MovieSchema } from "../types.js";
// console.log("MOVIES ROUTER LOADED");

const router = Router();

// test route
// router.get("/", (req, res): void => {
//   res.send("Movies endpoint works");
// });

// GET /api/movies

router.get("/", (req, res): void => {
	res.status(200).send(movies);
});

// GET /api/movies/:id

router.get("/:id", (req, res): void => {
	console.log("GET movie by id route was reached");
	console.log("Requested ID:", req.params.id);

	const idString: string = req.params.id;
	const id: number = Number(idString);

	if (Number.isNaN(id)) {
		res.sendStatus(400);
		return;
	}

	const movie = movies.find((movie) => movie.id === id);
	console.log("Found movie:", movie);

	if (movie === undefined) {
		res.sendStatus(404);
		return;
	}

	res.status(200).send(movie);
});

// POST /api/movies
router.post("/", (req, res): void => {
	try {
		const movie = z.parse(MovieSchema, req.body)
		movies.push(movie)
		res.sendStatus(201)
	} catch(error) {
		res.sendStatus(400)
	}
});

export default router;
