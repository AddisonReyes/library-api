import express, { Response, Request } from "express";
import Book from "../models/book.js";
import { Types } from "mongoose";

const router = express.Router();
const url: string = "/books";

// POST /api/books - Create a book
router.post(url, async (req: Request, res: Response) => {
  try {
    const existingBook = await Book.findOne({ isbn: req.body.isbn });
    if (existingBook) {
      return res.status(409).json({ message: "ISBN ya existe" });
    }

    const book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    const errorMessage = (error as unknown as Error).message;
    res.status(400).json({
      message: "Error creating the book",
      error: process.env.NODE_ENV === "dev" ? errorMessage : undefined,
    });
  }
});

// GET /api/books/search?title=...&autorId=... - Search for books
router.get(url + "/search", async (req: Request, res: Response) => {
  const { title, authorId } = req.query;

  const query: any = {};
  if (title) query.title = { $regex: title, $options: "i" };
  if (authorId) query.authorId = authorId;
  const book = await Book.find(query);

  res.status(200).send(book);
});

// GET /api/books/:id - Get a specific book
router.get(url + "/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id!)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    const book = await Book.findById(id);
    res.status(200).send(book);
  } catch (error) {
    const errorMessage = (error as unknown as Error).message;
    res.status(400).json({
      message: "Error finding the book",
      error: process.env.NODE_ENV === "dev" ? errorMessage : undefined,
    });
  }
});

// GET /api/books - List all books (with pagination)
router.get(url, async (req: Request, res: Response) => {
  const books = await Book.find();
  res.status(200).send(books);
});

// PUT /api/books/:id - Update a book
router.put(url + "/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id!)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    await Book.updateOne({ _id: id }, req.body);
    res.status(200).send({ message: "200 - Ok", status: 200 });
  } catch (error) {
    const errorMessage = (error as unknown as Error).message;
    res.status(400).json({
      message: "Error updating the book",
      error: process.env.NODE_ENV === "dev" ? errorMessage : undefined,
    });
  }
});

// DELETE /api/books/:id - Delete a book
router.delete(url + "/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id!)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    await Book.deleteOne({ _id: id });
    res.status(204).send();
  } catch (error) {
    const errorMessage = (error as unknown as Error).message;
    res.status(400).json({
      message: "Error deleting the book",
      error: process.env.NODE_ENV === "dev" ? errorMessage : undefined,
    });
  }
});

export default router;
