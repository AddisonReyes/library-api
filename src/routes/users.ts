import express, { Request, Response } from "express";
import User, { IUser } from "../models/user.js";
import { Types } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/auth/login", async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;
    const user: IUser | null = await User.findOne({ name: name });

    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const token = jwt.sign({ name }, "secret", { expiresIn: "1h" });
        res.json({ token });
      }
    } else {
      res.status(404).json({ message: "Wrong user or password.", status: 404 });
    }
  } catch (error) {
    res.status(400).json({ message: error, status: 400 });
  }
});

router.post("/auth/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const user: IUser | null = await User.findOne({ name: name });
    if (user) {
      res
        .status(400)
        .json({ message: "This user already exists.", status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, hashedPassword, role });
    newUser.save();

    res.status(201).json({ message: "Registered user ", status: 200 });
  } catch (error) {
    res.status(400).json({ message: error, status: 400 });
  }
});

router.get("/users/me", verifyToken, (req: Request, res: Response) => {
  res.status(200).json({ message: "me", status: 200 });
});

export default router;
