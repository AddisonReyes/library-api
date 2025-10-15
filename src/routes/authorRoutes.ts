import { error } from "console";
import Author from "../models/author.js";
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";

const authorRoutes = express.Router();
const url: string = "/authors";

authorRoutes.post("/authors", async (req: Request, res: Response) => {
  const lastAuthor = await Author.findOne().sort({ id: -1 }).limit(1);

  let id: number = 1;
  if (lastAuthor) {
    id += lastAuthor.id;
  }
  req.body.id = id;

  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).send(author);
  } catch (error) {
    res.status(400).json({ message: error, status: 400 });
  }
});

authorRoutes.get(url, async (req: Request, res: Response) => {
  const authors = await Author.find();
  res.send(authors);
});

authorRoutes.get(url + ":id", async (req: Request, res: Response) => {
  const authors = await Author.find({ id: req.params.id });
  res.send(authors);
});

authorRoutes.put(url + ":id", async (req: Request, res: Response) => {
  try {
    await Author.updateOne({ id: req.params.id }, req.body);
    res.status(200).send({ message: "200 - Ok", status: 200 });
  } catch (error) {
    res.status(400).json({ message: error, status: 400 });
  }
});

authorRoutes.delete(url + ":id", async (req: Request, res: Response) => {
  try {
    await Author.deleteOne({ id: req.params.id });
    res
      .status(204)
      .send({ message: "204 - Deleted successfully", status: 204 });
  } catch (error) {
    res.status(400).json({ message: error, status: 400 });
  }
});

export default authorRoutes;
