import express, { NextFunction, Response, Request } from "express";
import verifyToken from "./middlewares/auth.js";

const pages = express.Router();

pages.get("/login", (req: Request, res: Response) => {
  res.render("pages/login");
});

pages.get("/register", (req: Request, res: Response) => {
  res.render("pages/register");
});

pages.get("/home", verifyToken, (req: Request, res: Response) => {
  res.render("pages/home", { content: "Welcome!" });
});

pages.get("/", verifyToken, (req: Request, res: Response) => {
  res.redirect("/home");
});

pages.get("/books", verifyToken, (req: Request, res: Response) => {
  res.render("pages/home", { content: "Welcome to books!" });
});

pages.get("/authors", verifyToken, (req: Request, res: Response) => {
  res.render("pages/home", { content: "Welcome to authors!" });
});

pages.get("/loans", verifyToken, (req: Request, res: Response) => {
  res.render("pages/home", { content: "Welcome to loans!" });
});

pages.get("/logout", (req: Request, res: Response) => {
  res.clearCookie("token");
  res.redirect("/login");
});

export default pages;
