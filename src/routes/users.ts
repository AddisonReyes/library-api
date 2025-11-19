import express, { Request, Response } from "express";
import verifyToken from "../middlewares/auth.js";
import User, { IUser } from "../models/user.js";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/auth/login", async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;
    const user: IUser | null = await User.findOne({ name: name });

    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const token = jwt.sign({ name }, "secret", { expiresIn: "1h" });

        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "prod",
          maxAge: 3600000, // 1h
        });

        res.redirect("/home");
      } else {
        res.render("pages/login", {
          error: "Wrong user or password.",
        });
      }
    } else {
      res.render("pages/login", {
        error: "Wrong user or password.",
      });
    }
  } catch (error) {
    res.render("pages/login", {
      error: "An error occurred. Please try again.",
    });
  }
});

router.post("/auth/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user: IUser | null = await User.findOne({ name: name });
    if (user) {
      return res.render("pages/register", {
        error: "This user already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date();
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      createdAt,
    });
    await newUser.save();

    res.render("pages/login", {
      message: "Registered user.",
      status: 200,
    });
  } catch (error) {
    res.render("pages/register", {
      error: "An error occurred during registration. Please try again.",
    });
  }
});

router.get("/users/me", verifyToken, (req: Request, res: Response) => {
  res.status(200).json({ message: "me", status: 200 });
});

export default router;
