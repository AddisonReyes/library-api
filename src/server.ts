import express, { NextFunction, Response, Request } from "express";
import middlewares from "./middlewares/middlewares.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authorsRoutes from "./routes/authors.js";
import booksRoutes from "./routes/books.js";
import loansRoutes from "./routes/loans.js";

dotenv.config();
const app = express();

const env: string | undefined = process.env.NODE_ENV || "dev";
let port: string | undefined = process.env.PORT || "3000";

const connectionString: string | undefined =
  env === "prod" ? process.env.MONGO_URL_PROD : process.env.MONGO_URL_DEV;

console.log(env, ": ", connectionString);

// Settings
if (connectionString) {
  mongoose.connect(connectionString);
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Setup routes
app.use("/api", authorsRoutes);
app.use("/api", booksRoutes);
app.use("/api", loansRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the server!");
});

app.use(middlewares);

// Listen port
app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
});
