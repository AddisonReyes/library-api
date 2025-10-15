import dotenv from "dotenv";
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";

import middlewares from "./middlewares/middlewares.js";
import authorRoutes from "./routes/authorRoutes.js";
import mongoose from "mongoose";

dotenv.config();
const app = express();

let port: number = 3000;
if (process.env.PORT) {
  port = +process.env.PORT;
}

// Settings
mongoose.connect("mongodb://localhost:27017/library-db");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Setup routes
app.use("/api", authorRoutes);
app.use("/api", authorRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the server!");
});

app.use(middlewares);

// Listen port
app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
});
