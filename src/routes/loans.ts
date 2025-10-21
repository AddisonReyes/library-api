import express, { NextFunction, Response, Request } from "express";
import Book, { IBook } from "../models/book.js";
import Loan, { ILoan } from "../models/loan.js";

const router = express.Router();
const url: string = "/loans";
const today = new Date();

// PUT /api/loans/:id/return - Register return
router.put(url + "/:id/return", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const loan: ILoan | null = await Loan.findById(id);

    if (!loan) {
      res.status(404).json({
        message: "We can't find this loan, please try again later.",
        status: 404,
      });

      return;
    }

    const book: IBook | null = await Book.findById(loan.bookId);

    if (!book) {
      res.status(404).json({
        message:
          "We do not have this book at the moment, please try again later.",
        status: 404,
      });
      return;
    }

    await Loan.updateOne(
      { _id: id },
      { returned: true, returnDate: today, quantity: book.quantity + 1 }
    );
    res.status(200).send({ message: "200 - Ok", status: 200 });
  } catch (error) {
    res.status(400).json({ message: error, status: 400 });
  }
});

// POST /api/loans - Register a loan
router.post(url, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId } = req.body;
    const book: IBook | null = await Book.findById(bookId);

    if (!book) {
      res.status(404).json({
        message:
          "We do not have this book at the moment, please try again later.",
        status: 404,
      });
      return;
    } else {
      let { quantity } = book;
      if (quantity <= 0) {
        res.status(404).json({
          message:
            "We do not have this book at the moment, please try again later.",
          status: 404,
        });
        return;
      }

      quantity -= 1;
      await Book.updateOne({ _id: bookId }, { quantity: quantity });
    }

    const loan = new Loan(req.body);
    await loan.save();

    res.status(201).send(loan);
  } catch (error) {
    res.status(400).json({ message: error, status: 400 });
  }
});

// GET /api/loans/actived - List active loans
router.get(url + "/actived", async (req: Request, res: Response) => {
  const loan = await Loan.find({ returned: false });
  res.status(200).send(loan);
});

export default router;
