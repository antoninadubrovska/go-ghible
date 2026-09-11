import express, {
	type Express,
	type RequestHandler,
  } from "express";

  import moviesRouter from "./routes/movies.js";

  // ---- Settings ---- //

  const app: Express = express();

  const port: number = 3002;

  // ---- Middleware ---- //

  const logger: RequestHandler = (req, res, next): void => {
	console.log(`${req.method} ${req.path}`, req.body);
	next();
  };

  app.use(logger);

  // Allows Express to read JSON request bodies
  app.use(express.json());

  // Serves the React production files later
  // app.use(express.static("./dist"));

  // ---- Routes ---- //

  app.use("/api/movies", moviesRouter);

  // ---- Start server ---- //

  app.listen(port, (): void => {
	console.log(
	  `Server is listening on port ${port}. Stop it with Ctrl+C.`
	);
  });