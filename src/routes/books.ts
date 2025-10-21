import express, { Response, Request } from "express";
import Book from "../models/book.js";

const router = express.Router();
const url: string = "/books";

// POST /api/books - Create a book
router.post(url, async (req: Request, res: Response) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    res.status(400).json({ message: error, status: 400 });
  }
});

// GET /api/books/search?title=...&autorId=... - Search for books
router.get(url + "/search", async (req: Request, res: Response) => {
  const { title, authorId } = req.query;

  let book: any = [];
  book = await Book.find({ title: title, authorId: authorId });
  if (title && authorId) {
  } else if (authorId) {
    book = await Book.find({ authorId: authorId });
  } else if (title) {
    book = await Book.find({ title: title });
  }

  res.status(200).send(book);
});

// GET /api/books/:id - Get a specific book
router.get(url + "/:id", async (req: Request, res: Response) => {
  const book = await Book.findById(req.params.id);
  res.status(200).send(book);
});

// GET /api/books - List all books (with pagination)
router.get(url, async (req: Request, res: Response) => {
  const books = await Book.find();
  res.status(200).send(books);
});

// PUT /api/books/:id - Update a book
router.put(url + "/:id", async (req: Request, res: Response) => {
  try {
    await Book.updateOne({ _id: req.params.id }, req.body);
    res.status(200).send({ message: "200 - Ok", status: 200 });
  } catch (error) {
    res.status(400).json({ message: error, status: 400 });
  }
});

// DELETE /api/books/:id - Delete a book
router.delete(url + "/:id", async (req: Request, res: Response) => {
  try {
    await Book.deleteOne({ _id: req.params.id });
    res
      .status(204)
      .send({ message: "204 - Deleted successfully", status: 204 });
  } catch (error) {
    res.status(400).json({ message: error, status: 400 });
  }
});

export default router;
