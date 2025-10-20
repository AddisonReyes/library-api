import express, { NextFunction, Response, Request } from "express";

const middlewares = express.Router();

// Client errors
middlewares.use((req: Request, res: Response) => {
  res.status(404).json({ message: "404 - Not Found", status: 404 });
});

// Server errors
middlewares.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({ error: err.message, status: 500 });
});

export default middlewares;
