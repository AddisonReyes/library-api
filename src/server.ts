import express, { NextFunction, Response, Request } from "express";
import middlewares from "./middlewares/middlewares.js";

import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authorsRoutes from "./routes/authors.js";
import booksRoutes from "./routes/books.js";
import loansRoutes from "./routes/loans.js";
import usersRoutes from "./routes/users.js";

dotenv.config();

const app = express();

const env: string = process.env.NODE_ENV || "dev";
let port: string = process.env.PORT || "3000";

const connectionString: string | undefined =
  env === "prod" ? process.env.MONGO_URL_PROD : process.env.MONGO_URL_DEV;

// Settings
if (connectionString) {
  mongoose.connect(connectionString);
  console.log(" - Database conected");
}

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

// Setup routes and views
app.use("/api", authorsRoutes);
app.use("/api", booksRoutes);
app.use("/api", loansRoutes);
app.use("/", usersRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hi from the server! " });
});

app.use(middlewares);

// Listen port
app.listen(port, () => {
  if (env === "dev") {
    console.log(`Server running in http://localhost:${port}`);
  } else {
    console.log(`Server running`);
  }
});
