
import { Router } from "express";

const router = Router();

router.get("/", (req, res): void => {
  res.send("Movies endpoint works");
});

export default router;

// GET /api/movies
//router.get("/", ...);

// GET /api/movies/:id
//router.get("/:id", ...);