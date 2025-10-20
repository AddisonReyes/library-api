import express, { NextFunction, Response, Request } from "express";
import Author from "../models/author.js";

const router = express.Router();
const url: string = "/authors";

// POST /api/authors -Create an author
router.post("/authors", async (req: Request, res: Response) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).send(author);
  } catch (error) {
    res.status(400).json({ message: error, status: 400 });
  }
});

// GET /api/authors/:id - Get a specific author
router.get(url + "/:id", async (req: Request, res: Response) => {
  const author = await Author.findById(req.params.id);
  res.status(200).send(author);
});

// GET /api/authors - List all the authors
router.get(url, async (req: Request, res: Response) => {
  const authors = await Author.find();
  res.status(200).send(authors);
});

// PUT /api/authors/:id - Update an author
router.put(url + "/:id", async (req: Request, res: Response) => {
  try {
    await Author.updateOne({ _id: req.params.id }, req.body);
    res.status(200).send({ message: "200 - Ok", status: 200 });
  } catch (error) {
    res.status(400).json({ message: error, status: 400 });
  }
});

// DELETE /api/authors/:id - Delete an author
router.delete(url + "/:id", async (req: Request, res: Response) => {
  try {
    await Author.deleteOne({ _id: req.params.id });
    res
      .status(204)
      .send({ message: "204 - Deleted successfully", status: 204 });
  } catch (error) {
    res.status(400).json({ message: error, status: 400 });
  }
});

export default router;
