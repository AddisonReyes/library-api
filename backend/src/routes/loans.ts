import express, { Response, Request } from "express";
import verifyToken from "../middlewares/auth.js";
import Book, { IBook } from "../models/book.js";
import Loan, { ILoan } from "../models/loan.js";
import { Types } from "mongoose";

const env: string = process.env.NODE_ENV || "dev";
const router = express.Router();
const url: string = "/loans";

// PUT /api/loans/:id/return - Register return
router.put(
  url + "/:id/return",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!Types.ObjectId.isValid(id!)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const loan: ILoan | null = await Loan.findById(id);

      if (!loan) {
        return res.status(404).json({
          message: "We can't find this loan, please try again later.",
        });
      }

      const book: IBook | null = await Book.findById(loan.bookId);
      if (!book) {
        return res.status(404).json({
          message:
            "We do not have this book at the moment, please try again later.",
        });
      }

      const today = new Date();
      await Book.updateOne({ _id: book._id }, { quantity: book.quantity + 1 });
      await Loan.updateOne({ _id: id }, { returned: true, returnDate: today });
      res.status(204).send();
    } catch (error) {
      const errorMessage = (error as unknown as Error).message;
      res.status(400).json({
        message: "Error when returning the book",
        error: env === "dev" ? errorMessage : undefined,
      });
    }
  }
);

// POST /api/loans - Register a loan
router.post(url, verifyToken, async (req: Request, res: Response) => {
  try {
    if (!req.body.username || !req.body.loanDate) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const { bookId } = req.body;
    const book: IBook | null = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        message:
          "We don't have this book at the moment, please try again later.",
      });
    }

    let { quantity } = book;
    if (quantity <= 0) {
      return res.status(404).json({
        message:
          "We don't have this book at the moment, please try again later.",
      });
    }

    quantity -= 1;
    await Book.updateOne({ _id: bookId }, { quantity: quantity });
    const loan = new Loan(req.body);
    await loan.save();

    res.status(201).send(loan);
  } catch (error) {
    const errorMessage = (error as unknown as Error).message;
    res.status(400).json({
      message: "Error creating a loan",
      error: env === "dev" ? errorMessage : undefined,
    });
  }
});

// GET /api/loans/active - List active loans
router.get(
  url + "/active",
  verifyToken,
  async (req: Request, res: Response) => {
    const loan = await Loan.find({ returned: false });
    res.status(200).send(loan);
  }
);

export default router;
