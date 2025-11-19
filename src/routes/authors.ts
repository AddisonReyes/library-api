import express, { Response, Request } from "express";
import verifyToken from "../middlewares/auth.js";
import Author from "../models/author.js";
import { Types } from "mongoose";

const router = express.Router();
const url: string = "/authors";

// POST /api/authors -Create an author
router.post(url, verifyToken, async (req: Request, res: Response) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).send(author);
  } catch (error) {
    const errorMessage = (error as unknown as Error).message;
    res.status(400).json({
      message: "Error creating the author",
      error: process.env.NODE_ENV === "dev" ? errorMessage : undefined,
    });
  }
});

// GET /api/authors/:id - Get a specific author
router.get(url + "/:id", verifyToken, async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id!)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    const author = await Author.findById(id);
    res.status(200).send(author);
  } catch (error) {
    const errorMessage = (error as unknown as Error).message;
    res.status(400).json({
      message: "Error finding the author",
      error: process.env.NODE_ENV === "dev" ? errorMessage : undefined,
    });
  }
});

// GET /api/authors - List all the authors
router.get(url, verifyToken, async (req: Request, res: Response) => {
  const authors = await Author.find();
  res.status(200).send(authors);
});

// PUT /api/authors/:id - Update an author
router.put(url + "/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id!)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    await Author.updateOne({ _id: id }, req.body);
    res.status(200).send({ message: "200 - Ok", status: 200 });
  } catch (error) {
    const errorMessage = (error as unknown as Error).message;
    res.status(400).json({
      message: "Error updating the author",
      error: process.env.NODE_ENV === "dev" ? errorMessage : undefined,
    });
  }
});

// DELETE /api/authors/:id - Delete an author
router.delete(
  url + "/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!Types.ObjectId.isValid(id!)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      await Author.deleteOne({ _id: id });
      res.status(204).send();
    } catch (error) {
      const errorMessage = (error as unknown as Error).message;
      res.status(400).json({
        message: "Error deleting the author",
        error: process.env.NODE_ENV === "dev" ? errorMessage : undefined,
      });
    }
  }
);

export default router;
