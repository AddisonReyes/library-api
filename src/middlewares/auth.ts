import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login");
  }

  jwt.verify(token, "secret", (err: any, decoded: any) => {
    if (err) {
      return res.redirect("/login");
    }

    (req as any).user = decoded;
    next();
  });
};

export default verifyToken;
